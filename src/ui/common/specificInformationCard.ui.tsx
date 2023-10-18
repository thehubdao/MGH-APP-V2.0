import { SingleLandAPIResponse } from "../../types/valuationTypes";
import Tooltip from "@mui/material/Tooltip";
import PriceListUI from "./priceList.ui";
import SpecificPriceListUI from "./specificPriceList.ui";
import ExternalLinkUI from "./externalLink.ui";
import { PriceListForm } from "../../enums/common.enum";
import { CoinValuesType } from "../../utils/itrm/coin-gecko.util";
import { Metaverses } from "../../enums/metaverses.enum";

interface SpecificInformationCardUIProps {
  land: SingleLandAPIResponse;
  prices: CoinValuesType;
  metaverse: Metaverses
}
export default function SpecificInformationCardUI({ land, prices, metaverse }: SpecificInformationCardUIProps) {

  return (
    <div className='h-full px-7 flex flex-col items-center xl:items-start text-center '>
      <div className=' mt-2 xl:mt-5'>
        {/* Asset Name */}
        <Tooltip title={land.name} placement='top' arrow>
          <p className='text-xl xl:text-3xl text-lm-text dark:text-nm-fill font-semibold'>
            {land.name}
          </p>
        </Tooltip>
        <div className="my-3 flex gap-5">
          {
            land.owner &&
            <div className="max-w-[200px]">
              <p className='text-sm text-nm-dm-remark dark:text-nm-fill font-normal'>Owner</p>
              <Tooltip title={land.owner} placement='bottom'>
                <p className="text-base font-bold truncate dark:text-lm-text-gray">{land.owner}</p>
              </Tooltip>
            </div>
          }
          {
            land.tokenId &&
            <div className="max-w-[200px]">
              <p className='text-sm text-nm-dm-remark dark:text-nm-fill font-normal'>Token ID</p>
              <Tooltip title={land.tokenId} placement='bottom'>
                <p className="text-base font-bold truncate dark:text-lm-text-gray">{land.tokenId}</p>
              </Tooltip>
            </div>
          }
          {land.coords && Object.keys(land.coords).length > 0 && (
            <div>
              <p className='text-sm text-nm-dm-remark dark:text-nm-fill font-normal'>Coordinate</p>
              <Tooltip title={`${land.coords?.x}, ${land.coords?.y}`} placement='bottom'>
                <p className="text-base font-bold truncate dark:text-lm-text-gray">{land.coords?.x}, {land.coords?.y}</p>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="xl:mt-4 ml-0 xl:ml-4">
          <p className="text-nm-dm-remark dark:text-nm-fill font-normal text-sm mb-2">
            Estimated Price:
          </p>
          {/* TODO mirar como se esta filtrando prices con getPriceByFilter */}
          <PriceListUI prices={prices} form={PriceListForm.Bold} metaverse={metaverse}/>
        </div>
        <div className="xl:mt-4 ml-6 xl:ml-20">
          <SpecificPriceListUI prices={prices} />
        </div>
      </div>
      <div className="w-[250px] xl:w-[461px] h-[100px] xl:h-[155px] bg-lm-fill dark:bg-nm-dm-fill rounded-xl shadow-relief-12 dark:shadow-dm-relief-12 hidden xl:flex items-center justify-center mt-4">
        <p>historical estimated price</p>
      </div>
      {/* External Links */}
      <div className='flex flex-wrap mt-3'>
        <div>
          <p className="text-base text-nm-dm-remark dark:text-nm-fill font-normal">Find land on:</p>
          <div className="flex flex-wrap  justify-center xl:grid xl:grid-cols-4 items-center xl:my-2">
            <ExternalLinkUI text="Sandbox" icon='/images/somnium-space-logo.png' externalLink={''} />
            <ExternalLinkUI text="OpenSea" icon="/images/icons/markets/opensea.svg" externalLink={land.market_links?.opensea ?? ''} />
            <ExternalLinkUI text="X2y2" icon="/images/icons/markets/x2y2.svg" externalLink={land.market_links?.X2Y2 ?? ''} />
            <ExternalLinkUI text="Looksrare" icon="/images/icons/markets/looksrare.svg" externalLink={land.market_links?.looksrare ?? ''} />
          </div>
        </div>
      </div>
      <div className="w-[234px] h-12 rounded-2xl bg-lm-fill dark:bg-nm-dm-fill flex items-center justify-center xl:mt-3 shadow-relief-12 dark:shadow-dm-relief-12 hover:shadow-relief-32 dark:hover:shadow-dm-relief-32 transition-all duration-300 cursor-pointer mb-4">
        <p className="uppercase text-lm-text dark:text-nm-fill font-bold text-sm">Add to Watchlist</p>
      </div>
    </div>
  )
}