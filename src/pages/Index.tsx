
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DeckList from '../components/DeckList';
import SuiConnector from '../components/SuiConnector';
import { Button } from '@/components/ui/button';
import { Deck } from '@/lib/types';
import { BookOpenText } from 'lucide-react';

const Index = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetch
  useEffect(() => {
    const fetchDecks = async () => {
      // In a real app, we'd fetch from Sui blockchain
      // For now, using mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockDecks: Deck[] = [
        {
          id: '1',
          name: 'Sui Development Basics',
          description: 'Learn the fundamentals of developing on the Sui blockchain',
          cardCount: 15,
          lastStudied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          owner: '0x123'
        },
        {
          id: '2',
          name: 'Move Language',
          description: 'Fundamentals of the Move programming language used in Sui',
          cardCount: 20,
          lastStudied: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          owner: '0x123'
        }
      ];
      
      setDecks(mockDecks);
      setIsLoading(false);
    };
    
    fetchDecks();
  }, []);

  const handleConnectWallet = (address: string) => {
    console.log('Connected wallet address:', address);
    setWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Flashcard Decks</h1>
            <p className="text-muted-foreground">Master concepts with spaced repetition on the Sui blockchain</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <SuiConnector 
              onConnect={handleConnectWallet} 
              onDisconnect={handleDisconnectWallet} 
            />
            
            {walletConnected && (
              <Link to="/create">
                <Button>Create New Deck</Button>
              </Link>
            )}
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : !walletConnected ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <BookOpenText className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Connect your Sui wallet</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Connect your wallet to create and study flashcard decks stored on the Sui blockchain
            </p>
          </div>
        ) : (
          <DeckList decks={decks} />
        )}
      </main>
      
      <footer className="bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>FlashSui - Blockchain-powered flashcards on Sui</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
