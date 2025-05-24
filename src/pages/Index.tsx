
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DeckList from '../components/DeckList';
import { Button } from '@/components/ui/button';
import { Deck } from '@/lib/types';
import { BookOpenText } from 'lucide-react';
import { useAccounts, useCurrentAccount } from '@mysten/dapp-kit';
import { useUserData } from '@/hooks/use-userdata';
import { useRegisterUser } from '@/hooks/use-register-user';

const Index = () => {
  const accounts = useAccounts();
  console.log(accounts);
  const currentAccount = useCurrentAccount();
  console.log(currentAccount);
  const [walletConnected, setWalletConnected] = useState(false);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { registerUser, digest: registerDigest, loading: registerLoading, error: registerError } = useRegisterUser();

  // Check if wallet is connected on component mount
  useEffect(() => {
    setWalletConnected(!!currentAccount);
    console.log(walletConnected);

    // Listen for wallet status changes
    const handleWalletStatusChange = (event: CustomEvent) => {
      setWalletConnected(!!currentAccount);
    };

    window.addEventListener('walletStatusChanged', handleWalletStatusChange as EventListener);

    return () => {
      window.removeEventListener('walletStatusChanged', handleWalletStatusChange as EventListener);
    };
  }, [currentAccount]);

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
          cardCount: 5,
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
    
    if (walletConnected) {
      fetchDecks();
    } else {
      setIsLoading(false);
    }
  }, [walletConnected, registerDigest]);

  const {
    userData,
    isLoading: userLoading,
    error: userError,
  } = useUserData(currentAccount?.address || "", registerDigest);

  const handleCreateProfile = () => {
   if(!currentAccount?.address){
    return;
   }

    registerUser();
    
    console.log("Create Profile");

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
          
          <div className="mt-4 md:mt-0">
            {walletConnected && userData && (
              <Link to="/create">
                <Button>Create New Deck</Button>
              </Link>
            )}
            {walletConnected && !userData && (
                <Button onClick={handleCreateProfile}>Create Profile</Button>
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
        ) : walletConnected && !userData && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <BookOpenText className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Let's create your profile</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              <Button className="btn-create-profile" onClick={handleCreateProfile}>Create Profile</Button>
            </p>
          </div>
        ) 
        // : walletConnected && userData && (
        //   <DeckList decks={decks} />
        // )
        }
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
