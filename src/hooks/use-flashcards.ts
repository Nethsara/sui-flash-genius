import { useState } from "react";
import { useEffect } from "react";

import { useSuiClient } from "@mysten/dapp-kit";

type SuiMoveObject = {
  dataType: "moveObject";
  type: string;
  fields: Record<string, any>;
};

interface FlashCard {
  id: string;
  front: string;
  back: string;
}
export function useFlashCards(flashCardsTableId: string) {
  console.log("flashCardsTable hook");

  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const suiClient = useSuiClient();

  console.log({ flashCardsTableId });

  useEffect(() => {
    console.log("useEffect");
    async function fetchCards() {
      setLoading(true);
      try {
        console.log("fetching cards");
        const { data: entries } = await suiClient.getDynamicFields({
          parentId: flashCardsTableId,
          cursor: null,
        });
        console.log({ entriesfromuseFlashCards: entries });

        const cards = await Promise.all(
          entries.map(async (entry) => {
            const obj = await suiClient.getObject({
              id: entry.objectId,
              options: { showContent: true },
            });
            console.log({ objfromuseFlashCards: obj });
            const fields = (obj.data?.content as SuiMoveObject).fields;
            return {
              id: entry.objectId,
              front: fields.value.fields.front,
              back: fields.value.fields.back,
            };
          })
        );
        setFlashCards(cards);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    if (flashCardsTableId) fetchCards();
  }, [flashCardsTableId]);

  return { flashCards, isLoading, error };
}
