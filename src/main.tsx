import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react';
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import SuiProvider from "./providers/SuiProvider.tsx";
import "@mysten/dapp-kit/dist/index.css";

createRoot(document.getElementById("root")!).render(  <StrictMode>
    <ReactQueryProvider>
      <SuiProvider>
          <App />
      </SuiProvider>
    </ReactQueryProvider>
  </StrictMode>);
