import { useEffect, useState } from "react";

import { useSuiClient } from "@mysten/dapp-kit";

type SuiMoveObject = {
  dataType: "moveObject";
  type: string;
  fields: Record<string, any>;
};

export interface UserData {
  totalCollectionsCreated: number;
  totalCollectionsOwned: number;
  collectionsTableId: string;
}

const userManager =
"0xb2849a0088c00a1d8f03e255ffec5d4affaa9623e07fac9d7fb972bc3fb0fc11";

export function useUserData(walletAddress: string,refreshKey?: string
) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const suiClient = useSuiClient();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        // 1. get manager object
        const mgr = await suiClient.getObject({
          id: userManager,
          options: { showContent: true },
        });
        const tableId = (mgr.data?.content as SuiMoveObject).fields
          .user_profiles.fields.id.id;

        // 2. lookup dynamic field by address
        const profile = await suiClient.getDynamicFieldObject({
          parentId: tableId,
          name: { type: "address", value: walletAddress },
        });

        if (!profile.data) {
          setUserData(null);
        } else {
          const userDataObj = await suiClient.getDynamicFields({
            parentId: (profile?.data?.content as SuiMoveObject).fields.value,
            cursor: null,
          });
          const content = await suiClient.getObject({
            id: userDataObj.data[0].objectId,
            options: {
              showContent: true,
            },
          });

          setUserData({
            totalCollectionsCreated: +(content.data?.content as SuiMoveObject)
              .fields.value.fields.total_collections_created,
            totalCollectionsOwned: +(content.data?.content as SuiMoveObject)
              .fields.value.fields.total_collections_owned,
            collectionsTableId: (content.data?.content as SuiMoveObject).fields
              .value.fields.collections.fields.id.id,
          });
        }
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    if (walletAddress && userManager) fetchUser();
  }, [walletAddress, userManager, refreshKey]);

  return { userData, isLoading, error };
}
