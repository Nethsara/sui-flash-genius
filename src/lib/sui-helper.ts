import { Transaction, TransactionArgument } from "@mysten/sui/transactions";

export function mapTransactionArgs(
    args: (string | number | boolean)[],
    transaction: Transaction,
  ): TransactionArgument[] {
    const mappedArgs = [];
    for (const arg of args) {
      if (typeof arg === 'string') {
        if (arg.indexOf('0x') === 0) {
          // If starting with 0x, treat as an objectId
          mappedArgs.push(transaction.object(arg));
        } else {
          mappedArgs.push(transaction.pure.string(arg));
        }
      } else if (typeof arg === 'number') {
        mappedArgs.push(transaction.pure.u64(arg));
      } else if (typeof arg === 'boolean') {
        mappedArgs.push(transaction.pure.bool(arg));
      }
    }
    return mappedArgs;
  }

  /**
   * Build a move call
   * @param args - Transaction arguments
   * @param transaction - Transaction
   * @param target - Target
   * @returns Transaction
   */
  export function buildMoveCall(
    args: TransactionArgument[],
    transaction: Transaction,
    target: string,
  ): Transaction {
    transaction.moveCall({
      target: target,
      arguments: args,
    });
    return transaction;
  }