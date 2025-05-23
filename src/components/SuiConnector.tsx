
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useWallet } from '@suiet/wallet-kit';

interface SuiConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  onWalletStatusChange?: (address: string | null) => void;
}

const SuiConnector = ({ onConnect, onDisconnect, onWalletStatusChange }: SuiConnectorProps) => {
  const wallet = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Notify about connection status changes
    if (wallet.address && onConnect) {
      onConnect(wallet.address);
    }
    
    if (onWalletStatusChange) {
      onWalletStatusChange(wallet.address || null);
    }
  }, [wallet.address, onConnect, onWalletStatusChange]);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      if (wallet.status !== 'connected') {
        // Don't specify a wallet name to show the wallet selector UI
        await wallet.select();
        toast.success('Wallet connected successfully!');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    wallet.disconnect();
    
    if (onDisconnect) {
      onDisconnect();
    }
    
    if (onWalletStatusChange) {
      onWalletStatusChange(null);
    }
    
    toast.info('Wallet disconnected');
  };

  if (wallet.connected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium truncate max-w-[150px] text-white">
          {wallet.address && `${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`}
        </div>
        <Button variant="outline" size="sm" onClick={handleDisconnect} 
          className="border-pink-500 text-pink-500 hover:bg-pink-500/20 hover:text-pink-300">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleConnect} 
      disabled={isConnecting}
      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};

export default SuiConnector;
