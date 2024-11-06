// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/utils/Strings.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract RecycleChain {
    uint256 public productCounter;
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
        productCounter = 0;
    }

    enum ProductStatus {
        MANUFACTURED,
        SOLD,
        RETURNED,
        RECYCLED
    }

    struct Product {
        uint256 id;
        string name;
        uint256 quantity;
        address manufacturer;
        ToxicItem[] toxicItems;
    }

    struct ToxicItem {
        string name;
        uint256 weight;
    }

    struct ProductItem {
        string id;
        uint256 productId;
        ProductStatus status;
    }

    struct Manufacturer {
        string name;
        string location;
        string contact;
    }

    mapping(uint256 => Product) public products;
    mapping(string => ProductItem) public productItems;
    mapping(address => string[]) public inventory;
    mapping(address => Manufacturer) public manufacturers;

    event ProductCreated(uint256 productId, string name, address manufacturer);
    event ToxicItemCreated(uint256 productId, string name, uint256 weight);
    event ProductItemsAdded(string[] itemIds, uint256 productId);
    event ProductItemsStatusChanged(string[] itemIds, ProductStatus status);
    event ManufacturerRegistered(
        address manufacturer,
        string name,
        string location,
        string contact
    );

    function registerManufacturer(
        string memory name,
        string memory location,
        string memory contact
    ) public {
        require(bytes(name).length > 0, "Manufacturer name cannot be empty");
        require(
            bytes(manufacturers[msg.sender].name).length == 0,
            "Manufacturer already registered"
        );
        Manufacturer memory manufacturer = Manufacturer({
            name: name,
            location: location,
            contact: contact
        });
        manufacturers[msg.sender] = manufacturer;
        emit ManufacturerRegistered(msg.sender, name, location, contact);
    }

    function addProduct(
        string memory name,
        string[] memory toxicNames,
        uint256[] memory toxicWeights
    ) public {
        require(bytes(name).length > 0, "Product name cannot be empty");
        require(toxicNames.length > 0, "At least one toxic item is required");
        require(
            toxicNames.length == toxicWeights.length,
            "Toxic item names and weights must have the same length"
        );
        require(
            bytes(manufacturers[msg.sender].name).length > 0,
            "Manufacturer not registered"
        );

        uint256 productId = productCounter++;
        Product storage product = products[productId];
        product.id = productId;
        product.name = name;
        product.quantity = 0;
        product.manufacturer = msg.sender;

        emit ProductCreated(productId, name, msg.sender);

        for (uint256 i = 0; i < toxicNames.length; i++) {
            ToxicItem memory toxicItem = ToxicItem({
                name: toxicNames[i],
                weight: toxicWeights[i]
            });
            products[productId].toxicItems.push(toxicItem);
            emit ToxicItemCreated(productId, toxicNames[i], toxicWeights[i]);
        }
    }

    function addProductItems(uint256 productId, uint256 quantity) public {
        require(quantity <= 10, "Quantity must be less than or equal to 10");
        require(
            msg.sender == products[productId].manufacturer,
            "Only manufacturer can add product items"
        );
        require(products[productId].id == productId, "Product not found");

        string[] memory itemIds = new string[](quantity);
        for (uint256 i = 0; i < quantity; i++) {
            string memory itemId = string(
                abi.encodePacked(
                    Strings.toString(productId),
                    "-",
                    Strings.toString(products[productId].quantity + i + 1)
                )
            );
            itemIds[i] = itemId;
            inventory[msg.sender].push(itemId);
            ProductItem memory productItem = ProductItem({
                id: itemId,
                productId: productId,
                status: ProductStatus.MANUFACTURED
            });
            productItems[itemId] = productItem;
        }
        products[productId].quantity += quantity;
        emit ProductItemsAdded(itemIds, productId);
    }

    function sellProductItem(string[] memory itemIds) public {
        for (uint256 i = 0; i < itemIds.length; i++) {
            string memory itemId = itemIds[i];
            uint256 productId = productItems[itemId].productId;
            require(productItems[itemId].productId != 0, "Item not found");
            require(
                msg.sender == products[productId].manufacturer,
                "Only manufacturer can sell product items"
            );
            require(
                productItems[itemId].status == ProductStatus.MANUFACTURED,
                "Item not manufactured"
            );
            productItems[itemId].status = ProductStatus.SOLD;
        }
        emit ProductItemsStatusChanged(itemIds, ProductStatus.SOLD);
    }

    function returnProductItems(string[] memory itemIds) public {
        for (uint256 i = 0; i < itemIds.length; i++) {
            string memory itemId = itemIds[i];
            uint256 productId = productItems[itemId].productId;
            require(productItems[itemId].productId != 0, "Item not found");
            require(
                msg.sender == products[productId].manufacturer,
                "Only manufacturer can return product items"
            );
            require(
                productItems[itemId].status == ProductStatus.SOLD,
                "Item not sold"
            );
            productItems[itemId].status = ProductStatus.RETURNED;
        }
        emit ProductItemsStatusChanged(itemIds, ProductStatus.RETURNED);
    }

    function recycleProductItems(string[] memory itemIds) public {
        for (uint256 i = 0; i < itemIds.length; i++) {
            string memory itemId = itemIds[i];
            uint256 productId = productItems[itemId].productId;
            require(productItems[itemId].productId != 0, "Item not found");
            require(
                msg.sender == products[productId].manufacturer,
                "Only manufacturer can recycle product items"
            );
            require(
                productItems[itemId].status == ProductStatus.RETURNED,
                "Item not returned"
            );
            productItems[itemId].status = ProductStatus.RECYCLED;
        }
        emit ProductItemsStatusChanged(itemIds, ProductStatus.RECYCLED);
    }
}
