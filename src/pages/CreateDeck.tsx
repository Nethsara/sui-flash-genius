
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CreateCardForm from '../components/CreateCardForm';
import SuiConnector from '../components/SuiConnector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FlashCard } from '@/lib/types';

const CreateDeck = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConnectWallet = (address: string) => {
    setWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setWalletConnected(false);
  };

  const handleCardCreated = () => {
    // In a real app, we'd fetch the newly created card from Sui
    // For now, just creating a mock card
    const newCard: FlashCard = {
      id: `card-${Date.now()}`,
      question: `Sample Question ${cards.length + 1}`,
      answer: `Sample Answer ${cards.length + 1}`,
      deck: 'temp-deck-id',
    };
    
    setCards([...cards, newCard]);
  };

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deckName.trim()) {
      toast.error('Please enter a deck name');
      return;
    }
    
    setIsSubmitting(true);
    
    // Here we'd connect to Sui for storing the deck
    // For now, we'll just simulate a successful creation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Deck created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating deck:', error);
      toast.error('Failed to create deck. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Create New Deck</h1>
            <p className="text-muted-foreground">Create your flashcard deck on the Sui blockchain</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <SuiConnector 
              onConnect={handleConnectWallet} 
              onDisconnect={handleDisconnectWallet} 
            />
          </div>
        </div>
        
        {!walletConnected ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">Connect your Sui wallet</h2>
            <p className="mt-2 text-muted-foreground">
              You need to connect your wallet to create a deck
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Deck Information</CardTitle>
                </CardHeader>
                <form onSubmit={handleCreateDeck}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Deck Name
                      </label>
                      <Input
                        id="name"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        placeholder="Enter deck name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        placeholder="Enter deck description"
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || cards.length === 0} 
                        className="w-full"
                      >
                        {isSubmitting ? 'Creating...' : 'Create Deck'}
                      </Button>
                      
                      {cards.length === 0 && (
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          Add at least one card to create a deck
                        </p>
                      )}
                    </div>
                  </CardContent>
                </form>
              </Card>
              
              {cards.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Cards in this Deck ({cards.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cards.map((card, index) => (
                        <li key={card.id} className="p-3 border rounded-md bg-muted/30">
                          <p className="font-medium">Q: {card.question}</p>
                          <p className="text-sm text-muted-foreground mt-1">A: {card.answer}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <CreateCardForm deckId="temp-deck-id" onCardCreated={handleCardCreated} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-muted/30 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>FlashSui - Blockchain-powered flashcards on Sui</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateDeck;
