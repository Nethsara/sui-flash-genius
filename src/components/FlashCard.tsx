
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlashCard as FlashCardType } from '@/lib/types';
import { Check, X } from 'lucide-react';

interface FlashCardProps {
  card: FlashCardType;
  onResult?: (id: string, difficulty: 'easy' | 'medium' | 'hard') => void;
}

const FlashCard = ({ card, onResult }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowButtons(true);
    }
  };

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (onResult) {
      onResult(card.id, difficulty);
    }
    setIsFlipped(false);
    setShowButtons(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div 
        className={`card-flip ${isFlipped ? 'flipped' : ''} h-64 w-full relative cursor-pointer`}
        onClick={handleFlip}
      >
        <Card className="card-front h-full flex items-center justify-center p-6 border-2 border-primary/20">
          <CardContent className="text-center p-4 w-full">
            <p className="text-xl font-medium">{card.question}</p>
            <p className="text-sm text-muted-foreground mt-4">Click to flip</p>
          </CardContent>
        </Card>
        
        <Card className="card-back h-full flex flex-col items-center justify-center p-6 border-2 border-secondary/20">
          <CardContent className="text-center p-4 w-full">
            <p className="text-xl font-medium">{card.answer}</p>
          </CardContent>
        </Card>
      </div>

      {showButtons && isFlipped && onResult && (
        <div className="mt-6 flex justify-center space-x-4">
          <Button 
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-500/10"
            onClick={(e) => {
              e.stopPropagation();
              handleDifficulty('hard');
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Hard
          </Button>
          <Button 
            variant="outline" 
            className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
            onClick={(e) => {
              e.stopPropagation();
              handleDifficulty('medium');
            }}
          >
            Medium
          </Button>
          <Button 
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500/10"
            onClick={(e) => {
              e.stopPropagation();
              handleDifficulty('easy');
            }}
          >
            <Check className="mr-2 h-4 w-4" />
            Easy
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
