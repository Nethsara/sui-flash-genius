import { useState, useCallback } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { mapTransactionArgs } from "@/lib/sui-helper";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"; 
import { PACKAGE_ID, PROFILE_MANAGER } from "@/constants";

export function useRegisterUser() {
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const [digest, setDigest] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Build transaction
      const tx = new Transaction();

      const parsedArgs = mapTransactionArgs([PROFILE_MANAGER], tx);
      console.log({parsedArgs});

      tx.moveCall({
        target: `${PACKAGE_ID}::profile::register_user`,
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
            console.error("register_user failed", err);
          },
        },
      );
      console.log({result});
      // 3. Store digest
      setDigest(result?.digest || null);
    } catch (err: unknown) {
      console.error("register_user failed", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [signAndExecuteTransaction, PACKAGE_ID]);

  return {
    registerUser: register,
    digest,
    loading,
    error,
  };
}
