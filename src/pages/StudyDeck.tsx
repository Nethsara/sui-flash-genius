
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FlashCard from '../components/FlashCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FlashCard as FlashCardType, Deck } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

const StudyDeck = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<FlashCardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardsStudied, setCardsStudied] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [studyComplete, setStudyComplete] = useState(false);
  
  useEffect(() => {
    const fetchDeckAndCards = async () => {
      // In a real app, we'd fetch from Sui blockchain
      // For now, using mock data
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Mock deck data based on deckId
        const mockDeck: Deck = {
          id: deckId || '1',
          name: deckId === '2' ? 'Move Language' : 'Sui Development Basics',
          description: 'Learn the fundamentals of developing on the Sui blockchain',
          cardCount: 5,
          owner: '0x123'
        };
        
        // Mock flashcards for this deck
        const mockCards: FlashCardType[] = [
          {
            id: `${deckId}-1`,
            question: 'What is Sui?',
            answer: 'Sui is a permissionless Layer 1 blockchain designed to be instant and cost-efficient.',
            deck: deckId || '1'
          },
          {
            id: `${deckId}-2`,
            question: 'What programming language is used in Sui?',
            answer: 'Move is the programming language used to write smart contracts on Sui.',
            deck: deckId || '1'
          },
          {
            id: `${deckId}-3`,
            question: 'What is an object in Sui?',
            answer: 'In Sui, an object is a piece of data stored on-chain that can be owned by an address and transferred between addresses.',
            deck: deckId || '1'
          },
          {
            id: `${deckId}-4`,
            question: 'What is the Sui Move framework?',
            answer: 'The Sui Move framework provides core system libraries that implement key blockchain functionality like coins and NFTs.',
            deck: deckId || '1'
          },
          {
            id: `${deckId}-5`,
            question: 'What is a transaction block in Sui?',
            answer: 'A transaction block in Sui is a collection of commands executed atomically that can modify objects or create new ones.',
            deck: deckId || '1'
          }
        ];
        
        setDeck(mockDeck);
        setCards(mockCards);
      } catch (error) {
        console.error('Error fetching deck:', error);
        toast.error('Failed to load deck. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDeckAndCards();
  }, [deckId]);
  
  const handleCardResult = (id: string, difficulty: 'easy' | 'medium' | 'hard') => {
    // In a real app, we'd update the card's review schedule on Sui
    console.log(`Card ${id} rated as ${difficulty}`);
    
    setCardsStudied(prev => prev + 1);
    
    // Move to next card or finish if we're at the end
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setStudyComplete(true);
      toast.success('Study session complete!');
    }
  };
  
  const restartStudy = () => {
    setCurrentCardIndex(0);
    setCardsStudied(0);
    setStudyComplete(false);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Decks
          </Link>
          
          <h1 className="text-3xl font-bold mt-4">{deck?.name}</h1>
          <div className="flex items-center mt-2">
            <div className="bg-muted h-2 flex-grow rounded-full overflow-hidden">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${(cardsStudied / (cards.length || 1)) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium">
              {cardsStudied}/{cards.length} cards
            </span>
          </div>
        </div>
        
        {studyComplete ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Study Session Complete!</h2>
            <p className="text-muted-foreground mb-8">You've reviewed all cards in this deck</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={restartStudy}>Study Again</Button>
              <Link to="/">
                <Button variant="outline">Return to Decks</Button>
              </Link>
            </div>
          </div>
        ) : cards.length > 0 ? (
          <FlashCard
            card={cards[currentCardIndex]}
            onResult={handleCardResult}
          />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No cards found in this deck</h2>
          </div>
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

export default StudyDeck;
