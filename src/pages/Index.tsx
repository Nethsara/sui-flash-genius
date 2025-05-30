
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
import { useFlashCards } from '@/hooks/use-flashcards';
import { useCollections } from '@/hooks/use-collections';

const Index = () => {
  const accounts = useAccounts();
  const currentAccount = useCurrentAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { registerUser, digest: registerDigest, loading: registerLoading, error: registerError } = useRegisterUser();
  const {
    userData,
    isLoading: userLoading,
    error: userError,
  } = useUserData(currentAccount?.address || "", registerDigest);

  console.log({userData});

  const {
    collections,
    isLoading: collectionsLoading,
    error: collectionsError,
  } = useCollections(userData?.collectionsTableId || "");


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


  useEffect(() => {
    const fetchDecks = async () => {
      setDecks(collections);
      setIsLoading(false);
    };
    
    if (walletConnected && userData) {
      fetchDecks();
    } else {
      setIsLoading(false);
    }
  }, [walletConnected, registerDigest, userData]);



  console.log({collections});

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
        }

        {walletConnected && userData && (
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
