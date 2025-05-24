import { useState, useCallback } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { mapTransactionArgs } from "@/lib/sui-helper";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { PACKAGE_ID, PROFILE_MANAGER } from "@/constants";

export function useCreateCollection() {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest, setDigest] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCollection = useCallback(
    async (args: string[]) => {
      setLoading(true);
      setError(null);

      try {
        // 1. Build transaction
        const tx = new Transaction();

        const parsedArgs = mapTransactionArgs([PROFILE_MANAGER, ...args], tx);
        console.log({ parsedArgs });

        tx.moveCall({
          target: `${PACKAGE_ID}::profile::create_new_collection`,
          arguments: parsedArgs,
        });

        // 2. Sign & execute
        const result = await signAndExecuteTransaction(
          {
            transaction: tx,
            chain: "sui:testnet",
          },
          {
            onSuccess: (res) => {
              console.log("executed transaction", res);
            },
            onError: (err) => {
              console.error("create_new_collection failed", err);
            },
          }
        );
        console.log({ result });
        // 3. Store digest
        setDigest(result?.digest || null);
      } catch (err: unknown) {
        console.error("create_new_collection failed", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [signAndExecuteTransaction, PACKAGE_ID]
  );

  return {
    createCollection,
    digest,
    loading,
    error,
  };
}
