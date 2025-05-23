
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SuiConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  onWalletStatusChange?: (address: string | null) => void;
}

const SuiConnector = ({ onConnect, onDisconnect, onWalletStatusChange }: SuiConnectorProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for stored wallet connection
    const storedAddress = localStorage.getItem('suiWalletAddress');
    if (storedAddress) {
      setAddress(storedAddress);
      if (onConnect) {
        onConnect(storedAddress);
      }
      if (onWalletStatusChange) {
        onWalletStatusChange(storedAddress);
      }
    } else if (onWalletStatusChange) {
      onWalletStatusChange(null);
    }
  }, [onConnect, onWalletStatusChange]);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // In a real app, we'd integrate with the Sui wallet
      // This is a placeholder that simulates a connection
      console.log('Connecting to Sui wallet...');
      
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful connection
      const mockAddress = '0x' + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      setAddress(mockAddress);
      localStorage.setItem('suiWalletAddress', mockAddress);
      
      toast.success('Wallet connected successfully!');
      
      if (onConnect) {
        onConnect(mockAddress);
      }
      
      if (onWalletStatusChange) {
        onWalletStatusChange(mockAddress);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    localStorage.removeItem('suiWalletAddress');
    
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
