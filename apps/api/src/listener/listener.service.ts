import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { ethers } from 'ethers';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { contractAddress } from 'src/common/util';
import {
  RecycleChain,
  RecycleChain__factory,
} from '../../../../standalone/recycle-chain-contract/typechain-types';

const statusMapping = [
  ProductStatus.MANUFACTURED,
  ProductStatus.SOLD,
  ProductStatus.RETURNED,
  ProductStatus.RECYCLED,
];

@Injectable()
export class ListenerService implements OnModuleInit, OnModuleDestroy {
  private wss: ethers.WebSocketProvider;
  private contract: RecycleChain;

  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    this.initializeWebSocket();
    this.listen();
  }

  async onModuleDestroy() {
    this.wss.removeAllListeners();
  }

  initializeWebSocket() {
    this.wss = new ethers.WebSocketProvider(
      `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
    );
    this.contract = RecycleChain__factory.connect(contractAddress, this.wss);
  }

  listen() {
    try {
      this.contract.on(
        this.contract.filters.ManufacturerRegistered,
        async (manufacturer, name, location, contact, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber;
          const timestamp = await this.getBlockTimestamp(blockNumber);
          await this.createManufacturer(
            manufacturer,
            name,
            location,
            contact,
            timestamp,
          );
        },
      );
      console.log('Listening to ManufacturerRegistered event');
    } catch (error) {
      console.error('Error listening to ManufacturerRegistered event', error);
    }

    try {
      this.contract.on(
        this.contract.filters.ProductCreated,
        async (productId, name, manufacturer, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber;
          const timestamp = await this.getBlockTimestamp(blockNumber);
          await this.createProduct(
            productId.toString(),
            name,
            manufacturer,
            timestamp,
          );
        },
      );
      console.log('Listening to ProductCreated event');
    } catch (error) {
      console.error('Error listening to ProductCreated event', error);
    }

    try {
      this.contract.on(
        this.contract.filters.ProductItemsAdded,
        async (productItemIds, productId, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber;
          const timestamp = await this.getBlockTimestamp(blockNumber);
          await this.createProductItems(
            productId.toString(),
            productItemIds,
            timestamp,
          );
        },
      );
      console.log('Listening to ProductItemsAdded event');
    } catch (error) {
      console.error('Error listening to ProductItemsAdded event', error);
    }

    try {
      this.contract.on(
        this.contract.filters.ProductItemsStatusChanged,
        async (productItemIds, status, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber;
          const timestamp = await this.getBlockTimestamp(blockNumber);
          await this.updateProductItemStatus(
            productItemIds,
            +status.toString(),
            timestamp,
          );
        },
      );
      console.log('Listening to ProductItemsStatusChanged event');
    } catch (error) {
      console.error(
        'Error listening to ProductItemsStatusChanged event',
        error,
      );
    }

    try {
      this.contract.on(
        this.contract.filters.ToxicItemCreated,
        async (productId, name, weight, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber;
          const timestamp = await this.getBlockTimestamp(blockNumber);
          await this.createToxicItem(
            productId.toString(),
            name,
            +weight.toString(),
            timestamp,
          );
        },
      );
      console.log('Listening to ToxicItemCreated event');
    } catch (error) {
      console.error('Error listening to ToxicItemCreated event', error);
    }
  }

  async getBlockTimestamp(blockNumber: number) {
    const block = await this.wss.getBlock(blockNumber);
    return new Date(block.timestamp * 1000);
  }

  private async createManufacturer(
    manufacturer: string,
    name: string,
    location: string,
    contact: string,
    timestamp: Date,
  ) {
    await this.prismaService.manufacturer.create({
      data: {
        id: manufacturer,
        name,
        location,
        contact,
        timestamp,
      },
    });
  }

  private async createProduct(
    productId: string,
    name: string,
    manufacturerId: string,
    timestamp: Date,
  ) {
    await this.prismaService.product.create({
      data: {
        id: productId,
        name,
        manufacturer: {
          connect: {
            id: manufacturerId,
          },
        },
        timestamp,
      },
    });
  }

  private async createProductItems(
    productId: string,
    productItemIds: string[],
    timestamp: Date,
  ) {
    const transactions = productItemIds.map((productItemId) => {
      return this.prismaService.transaction.create({
        data: {
          status: ProductStatus.MANUFACTURED,
          productItemId,
          timestamp,
        },
      });
    });
    const productItem = this.prismaService.productItem.createMany({
      data: productItemIds.map((productItemId) => ({
        id: productItemId,
        status: ProductStatus.MANUFACTURED,
        productId,
        timestamp,
      })),
    });
    return this.prismaService.$transaction([productItem, ...transactions]);
  }

  private async updateProductItemStatus(
    productItemIds: string[],
    statusIndex: number,
    timestamp: Date,
  ) {
    const status = statusMapping[+statusIndex.toString()] as ProductStatus;
    const transactions = productItemIds.map((productItemId) => {
      return this.prismaService.transaction.create({
        data: {
          status,
          productItemId,
          timestamp,
        },
      });
    });
    const productItem = this.prismaService.productItem.updateMany({
      data: {
        status,
        timestamp,
      },
      where: {
        id: {
          in: productItemIds,
        },
      },
    });
    return this.prismaService.$transaction([productItem, ...transactions]);
  }

  private async createToxicItem(
    productId: string,
    name: string,
    weight: number,
    timestamp: Date,
  ) {
    const maxRetries = 5;
    let retryCount = 0;
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    while (retryCount < maxRetries) {
      try {
        const product = await this.prismaService.product.findUnique({
          where: {
            id: productId,
          },
        });
        if (product) {
          await this.prismaService.toxicItem.create({
            data: {
              productId,
              name,
              weight,
              timestamp,
            },
          });
        }
      } catch (error) {
        retryCount++;
        await delay(1000);
        console.log(`Retrying to create toxic item: ${retryCount}`);
      }
    }
  }

  async resyncBlockchainData() {
    if (!this.wss) {
      throw new Error('WebSocket not initialized');
    }
    const fromBlock = 0;
    const toBlock = 'latest';
    const manufacturerRegisteredEvents = await this.contract.queryFilter(
      this.contract.filters.ManufacturerRegistered,
      fromBlock,
      toBlock,
    );
    for (const event of manufacturerRegisteredEvents) {
      const timestamp = await this.getBlockTimestamp(event.blockNumber);
      await this.createManufacturer(
        event.args.manufacturer,
        event.args.name,
        event.args.location,
        event.args.contact,
        timestamp,
      );
    }
    const productCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductCreated,
      fromBlock,
      toBlock,
    );
    for (const event of productCreatedEvents) {
      const timestamp = await this.getBlockTimestamp(event.blockNumber);
      await this.createProduct(
        event.args.productId.toString(),
        event.args.name,
        event.args.manufacturer,
        timestamp,
      );
    }
    const productItemsAddedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductItemsAdded,
      fromBlock,
      toBlock,
    );
    for (const event of productItemsAddedEvents) {
      const timestamp = await this.getBlockTimestamp(event.blockNumber);
      await this.createProductItems(
        event.args.productId.toString(),
        event.args.itemIds,
        timestamp,
      );
    }
    const productItemsStatusChangedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductItemsStatusChanged,
      fromBlock,
      toBlock,
    );
    for (const event of productItemsStatusChangedEvents) {
      const timestamp = await this.getBlockTimestamp(event.blockNumber);
      await this.updateProductItemStatus(
        event.args.itemIds,
        +event.args.status.toString(),
        timestamp,
      );
    }
    const toxicItemCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ToxicItemCreated,
      fromBlock,
      toBlock,
    );
    for (const event of toxicItemCreatedEvents) {
      const timestamp = await this.getBlockTimestamp(event.blockNumber);
      await this.createToxicItem(
        event.args.productId.toString(),
        event.args.name,
        +event.args.weight.toString(),
        timestamp,
      );
    }
  }
}
