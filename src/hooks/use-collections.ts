import { useEffect, useState } from "react";
import { useSuiClient } from "@mysten/dapp-kit";
import { Deck } from "@/lib/types";

type SuiMoveObject = {
  dataType: "moveObject";
  type: string;
  fields: Record<string, any>;
};

interface Collection {
  id: string;
  name: string;
  totalFlashCards: number;
}

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

export function useCollections(collectionsTableId : string) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const suiClient = useSuiClient();
  
    useEffect(() => {
      async function fetchCollections() {
        setLoading(true);
        try {
          const { data: entries } = await suiClient.getDynamicFields({ parentId: collectionsTableId, limit: 100 });
console.log({entriesfromuseCollections: entries});

          const results = await Promise.all(
            entries.map(async (entry, i) => {
              const obj = await suiClient.getObject({ id: entries[i].objectId, options: { showContent: true } });
              console.log({objfromuseCollections: obj});
              const fields = (obj.data?.content as SuiMoveObject).fields.name;
              const flashCards = await suiClient.getObject({ id: fields, options: { showContent: true } });
              console.log({flashCardsfromuseCollections: flashCards});
              return {
                id: (flashCards.data?.content as SuiMoveObject).fields.flashCards.fields.id.id,
                name: (obj.data?.content as SuiMoveObject).fields.value,
                totalFlashCards: +(flashCards.data?.content as SuiMoveObject).fields.total_flash_cards
              };
            })
          );
          setCollections(results);
        } catch (e) {
          setError(e as Error);
        } finally {
          setLoading(false);
        }
      }
      if (collectionsTableId) 
        fetchCollections();
    }, [collectionsTableId]);
  
    return { collections: mockDecks, isLoading, error };
  }