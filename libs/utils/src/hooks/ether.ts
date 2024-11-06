import { contractAddress } from "../contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  RecycleChain,
  RecycleChain__factory,
} from "../generated/typechain-types";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export const useAccount = () => {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [contract, setContract] = useState<RecycleChain | null>(null);

  const addPolygonAmoyNetwork = async () => {
    if (!window.ethereum) {
      alert("Ethereum object not found. Please install MetaMask.");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13882",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://amoy.polygonscan.com/"],
            rpcUrls: ["https://rpc-amoy.polygon.technology/"],
          },
        ],
      });
    } catch {
      console.error("Failed to add Polygon Amoy Testnet to MetaMask.");
    }
  };

  const connectToWallet = async () => {
    if (!window.ethereum) {
      alert("Ethereum object not found. Please install MetaMask.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = RecycleChain__factory.connect(contractAddress, signer);
      setContract(contract);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
        const isOwner = await contract.owner();
        setIsOwner(isOwner.toLowerCase() === accounts[0].toLowerCase());
      } else {
        alert("Failed to get account.");
        return;
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  useEffect(() => {
    addPolygonAmoyNetwork();
    connectToWallet();
  }, []);

  return { account, balance, isOwner, contract };
};
