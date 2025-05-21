
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SuiConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const SuiConnector = ({ onConnect, onDisconnect }: SuiConnectorProps) => {
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
    }
  }, [onConnect]);

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
    
    toast.info('Wallet disconnected');
  };

  if (address) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-sm font-medium truncate max-w-[150px]">
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet} 
      disabled={isConnecting}
      variant="outline"
      className="border-primary"
    >
      {isConnecting ? 'Connecting...' : 'Connect Sui Wallet'}
    </Button>
  );
};

export default SuiConnector;
