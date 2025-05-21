
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface CreateCardFormProps {
  deckId: string;
  onCardCreated?: () => void;
}

const CreateCardForm = ({ deckId, onCardCreated }: CreateCardFormProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim()) {
      toast.error('Please fill in both question and answer fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Here we'd connect to Sui for storing the flashcard
    // For now, we'll just simulate a successful creation
    setTimeout(() => {
      toast.success('Card created successfully!');
      setQuestion('');
      setAnswer('');
      setIsSubmitting(false);
      
      if (onCardCreated) {
        onCardCreated();
      }
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              Question
            </label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium">
              Answer
            </label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Card'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateCardForm;
