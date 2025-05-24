import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Transaction } from "@mysten/sui/transactions";
import {
  ConnectButton,
  useAccounts,
  useCurrentAccount,
  useDisconnectWallet,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { buildMoveCall, mapTransactionArgs } from "@/lib/sui-helper";
import { UserData, useUserData } from "@/hooks/use-userdata";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [digest, setDigest] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);

  const { mutate: disconnect } = useDisconnectWallet();
  const accounts = useAccounts();
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  // Check for stored wallet connection on component mount
  useEffect(() => {
    console.log(accounts);
    if (accounts?.length) {
      setWalletAddress(accounts[0].address);
    } else {
      setWalletAddress(null);
    }
  }, [accounts]);

  const {
    userData,
    isLoading: userLoading,
    error: userError,
  } = useUserData(walletAddress ?? "");

  // const handleWalletStatusChange = (address: string | null) => {
  //   setWalletAddress(address);
  //   // Dispatch a custom event that other components can listen for
  //   const event = new CustomEvent("walletStatusChanged", {
  //     detail: { address },
  //   });
  //   window.dispatchEvent(event);
  // };

  const handleSignAndExecuteTransaction = () => {
    // const tx = new Transaction();

    // const args = mapTransactionArgs(
    //   ["0xb2849a0088c00a1d8f03e255ffec5d4affaa9623e07fac9d7fb972bc3fb0fc11"],
    //   tx
    // );

    // const packageId =
    //   "0x27e1a6fc0dcc22a454cf206cdd1f650b8aa2dc287b8d9d551657f304d6db08cb";

    // tx.moveCall({
    //   target: `${packageId}::profile::register_user`,
    //   arguments: args,
    // });

    // signAndExecuteTransaction(
    //   {
    //     transaction: tx,
    //     chain: "sui:testnet",
    //   },
    //   {
    //     onSuccess: (result) => {
    //       console.log("executed transaction", result);
    //       setDigest(result.digest);
    //     },
    //   }
    // );
  };

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/d6807d4f-7852-4fa1-b05d-dbffa327fdff.png"
                alt="SuiFlash Logo"
                className="h-14 w-14"
              />
              <span className="ml-2 text-xl font-bold text-white">
                SUI FLASH
              </span>
            </Link>
          </div>

          <div>
            <div className="sui-connect-button">
              <ConnectButton />
            </div>{" "}
            {/* {currentAccount && (
				<>
					<div>
						<button
							onClick={handleSignAndExecuteTransaction}
						>
							Sign and execute transaction
						</button>
					</div>
					<div>Digest: {digest}</div>
				</>
			)} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
