
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SuiConnector from './SuiConnector';

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check for stored wallet connection on component mount
  useEffect(() => {
    const storedAddress = localStorage.getItem('suiWalletAddress');
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
  }, []);

  const handleWalletStatusChange = (address: string | null) => {
    setWalletAddress(address);
    // Dispatch a custom event that other components can listen for
    const event = new CustomEvent('walletStatusChanged', { 
      detail: { address } 
    });
    window.dispatchEvent(event);
  };

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/d6807d4f-7852-4fa1-b05d-dbffa327fdff.png" 
                alt="FlashSui Logo" 
                className="h-10 w-10" 
              />
              <span className="ml-2 text-xl font-bold text-white">FlashSui</span>
            </Link>
          </div>
          
          <div>
            <SuiConnector onWalletStatusChange={handleWalletStatusChange} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
