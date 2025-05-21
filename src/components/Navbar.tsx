
import { Link } from 'react-router-dom';
import { BookOpenText } from "lucide-react";
import SuiConnector from './SuiConnector';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpenText className="h-8 w-8 text-pink-500" />
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
