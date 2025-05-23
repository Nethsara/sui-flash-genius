
import { Link } from 'react-router-dom';
import SuiConnector from './SuiConnector';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/a862e2f2-ee81-44c6-9310-30e9a38e13d5.png" 
                alt="FlashSui Logo" 
                className="h-8 w-8" 
              />
              <span className="ml-2 text-xl font-bold text-white">FlashSui</span>
            </Link>
          </div>
          
          <div>
            <SuiConnector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
