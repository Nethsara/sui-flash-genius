
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useWallets } from '@mysten/dapp-kit';

interface SuiConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  onWalletStatusChange?: (address: string | null) => void;
}

const SuiConnector = ({ onConnect, onDisconnect, onWalletStatusChange }: SuiConnectorProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { wallets, currentWallet } = useWallets();
  
  const isConnected = !!currentWallet?.accounts[0];
  const currentAccount = currentWallet?.accounts[0];

  useEffect(() => {
    // Report wallet status to parent components when connection status changes
    if (isConnected && currentAccount) {
      if (onConnect) {
        onConnect(currentAccount.address);
      }
      if (onWalletStatusChange) {
        onWalletStatusChange(currentAccount.address);
      }
    } else if (onWalletStatusChange) {
      onWalletStatusChange(null);
    }
  }, [isConnected, currentAccount, onConnect, onWalletStatusChange]);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Use the first available wallet adapter
      if (wallets.length > 0) {
        await wallets[0].connect();
        toast.success('Wallet connected successfully!');
      } else {
        toast.error('No wallet adapters available');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (currentWallet) {
      try {
        await currentWallet.disconnect();
        toast.info('Wallet disconnected');
        
        if (onDisconnect) {
          onDisconnect();
        }
        
        if (onWalletStatusChange) {
          onWalletStatusChange(null);
        }
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
        toast.error('Failed to disconnect wallet. Please try again.');
      }
    }
  };

  if (isConnected && currentAccount) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium truncate max-w-[150px] text-white">
          {currentAccount.address.substring(0, 6)}...{currentAccount.address.substring(currentAccount.address.length - 4)}
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet} 
          className="border-pink-500 text-pink-500 hover:bg-pink-500/20 hover:text-pink-300">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet} 
      disabled={isConnecting}
      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};

export default SuiConnector;
