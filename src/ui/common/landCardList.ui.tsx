
import { Metaverses } from "../../enums/metaverses.enum";

import { LandListAPIResponse } from "../../types/valuationTypes";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";
import ExternalAssetLinkUI from "./externalAssetsLink.ui";
import InformationCardUI from "./informationCard.ui";


interface LandCardListUIProps {
  lands: [Metaverses, LandListAPIResponse][];
  prices: CoinValuesType;
}

export default function LandCardListUI({ lands, prices }: LandCardListUIProps) {

  return (
    <>
      {
        lands.map(([metavese, landsMetaverse]) => {
          return Object.values(landsMetaverse).map((land) => {
            return (
              <div key={land.tokenId}>
                <div className="w-auto md:w-[520px] md:h-[300px] bg-nm-fill dark:bg-nm-dm-fill rounded-xl shadow-relief-16 dark:shadow-dm-relief-32 hover:shadow-relief-12 dark:hover:shadow-dm-relief-12 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 h-[200px] md:h-auto">
                    <ExternalAssetLinkUI land={land} isOpen={false} metaverse={metavese} />
                  </div>
                  <div className="w-full md:w-1/2 pb-3">
                    <InformationCardUI land={land} prices={prices} metaverse={metavese} />
                  </div>
                </div>
              </div>
            );
          });
        })
      }
    </>
  );
}
