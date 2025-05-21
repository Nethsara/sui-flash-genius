
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpenText className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">FlashSui</span>
            </Link>
          </div>
          
          {isMobile ? (
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary">Home</Link>
                <Link to="/create" className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary">Create Deck</Link>
              </div>
            </div>
          )}
          
          <div className="hidden md:block">
            <Button variant="outline" className="ml-4">Connect Wallet</Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle based on menu state */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary" onClick={toggleMenu}>Home</Link>
            <Link to="/create" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary" onClick={toggleMenu}>Create Deck</Link>
            <div className="pt-4">
              <Button variant="outline" className="w-full">Connect Wallet</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
