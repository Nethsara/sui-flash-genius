
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateDeck from "./pages/CreateDeck";
import StudyDeck from "./pages/StudyDeck";
import NotFound from "./pages/NotFound";
import { 
  WalletProvider, 
  SuiClientProvider,
  createNetworkConfig,
  mainnet,
  testnet 
} from "@mysten/dapp-kit";

// Configure the network - we'll use mainnet and testnet
const { networkConfig } = createNetworkConfig({
  mainnet: { url: mainnet.fullNode },
  testnet: { url: testnet.fullNode },
});

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create" element={<CreateDeck />} />
              <Route path="/study/:deckId" element={<StudyDeck />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);

export default App;
