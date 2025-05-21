
export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  lastReviewed?: Date;
  nextReview?: Date;
  difficulty?: 'easy' | 'medium' | 'hard';
  deck: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  lastStudied?: Date;
  owner: string;
}

export interface SuiWallet {
  address: string;
  isConnected: boolean;
}
