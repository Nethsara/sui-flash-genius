import React from "react";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";


const SUI_NETWORK = "testnet";
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
});
const SuiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork={SUI_NETWORK}>
        <WalletProvider>{children}</WalletProvider>
    </SuiClientProvider>
  );
};

export default SuiProvider;
