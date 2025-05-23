
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useWallets, ConnectButton } from '@mysten/dapp-kit';

interface SuiConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  onWalletStatusChange?: (address: string | null) => void;
}

const SuiConnector = ({ onConnect, onDisconnect, onWalletStatusChange }: SuiConnectorProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const wallets = useWallets();
  
  useEffect(() => {
    // Get the current wallet if available
    const currentWallet = wallets.find(wallet => wallet.connected);
    
    if (currentWallet) {
      const walletAddress = currentWallet.accounts[0]?.address || null;
      setAddress(walletAddress);
      
      if (walletAddress && onConnect) {
        onConnect(walletAddress);
      }
      
      if (onWalletStatusChange) {
        onWalletStatusChange(walletAddress);
      }
    } else if (onWalletStatusChange) {
      setAddress(null);
      onWalletStatusChange(null);
    }
  }, [wallets, onConnect, onWalletStatusChange]);

  const disconnectWallet = () => {
    // Find the connected wallet
    const currentWallet = wallets.find(wallet => wallet.connected);
    
    if (currentWallet) {
      currentWallet.disconnect();
    }
    
    setAddress(null);
    
    if (onDisconnect) {
      onDisconnect();
    }
    
    if (onWalletStatusChange) {
      onWalletStatusChange(null);
    }
    
    toast.info('Wallet disconnected');
  };

  if (address) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium truncate max-w-[150px] text-white">
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet} 
          className="border-pink-500 text-pink-500 hover:bg-pink-500/20 hover:text-pink-300">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <ConnectButton className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6" />
  );
};

export default SuiConnector;
