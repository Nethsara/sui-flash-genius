
import { Link } from 'react-router-dom';
import { Deck } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface DeckListProps {
  decks: Deck[];
}

const DeckList = ({ decks }: DeckListProps) => {
  if (decks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground mb-4">No decks found</h3>
        <Link to="/create">
          <Button>Create Your First Deck</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <Card key={deck.id} className="hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle>{deck.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground h-16 overflow-hidden text-ellipsis">{deck.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium">{deck.cardCount} cards</span>
              {deck.lastStudied && (
                <span className="text-xs text-muted-foreground">
                  Last studied: {new Date(deck.lastStudied).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to={`/study/${deck.id}`}>
              <Button>
                Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to={`/edit/${deck.id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DeckList;
