import { useState, useCallback } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { mapTransactionArgs } from "@/lib/sui-helper";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"; 

const PACKAGE_ID = "0x27e1a6fc0dcc22a454cf206cdd1f650b8aa2dc287b8d9d551657f304d6db08cb";
const profileManager = "0xb2849a0088c00a1d8f03e255ffec5d4affaa9623e07fac9d7fb972bc3fb0fc11";
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

      const parsedArgs = mapTransactionArgs([profileManager], tx);
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
