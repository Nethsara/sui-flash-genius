
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useWalletKit } from '@mysten/dapp-kit';

interface SuiConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  onWalletStatusChange?: (address: string | null) => void;
}

const SuiConnector = ({ onConnect, onDisconnect, onWalletStatusChange }: SuiConnectorProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { isConnected, currentAccount, connect, disconnect } = useWalletKit();

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
      await connect();
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    
    if (onDisconnect) {
      onDisconnect();
    }
    
    if (onWalletStatusChange) {
      onWalletStatusChange(null);
    }
    
    toast.info('Wallet disconnected');
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
