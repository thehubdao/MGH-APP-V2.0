import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import CartButtonUI from "./cartButton.ui";
import Link from "next/link";
import { HotDealsCard } from "../../../interfaces/heatmap.interface";
import { Metaverses } from "../../../enums/metaverses.enum";
import { METAVERSE_LABEL } from "../../../constants/common.constant";

interface HotDealsCardUIProps {
  cardData: HotDealsCard;
  name?: string;
  metaverseSelected: Metaverses;
}

export default function HotDealsCardUI({ cardData, name, metaverseSelected }: HotDealsCardUIProps) {
  
  const metaverseImage = (getMetaverseImg());

  function getMetaverseImg() {
    if (metaverseSelected == Metaverses.SandBox) return '/images/the-sandbox-sand-logo.png';
    if (metaverseSelected == Metaverses.Decentraland) return '/images/decentraland-mana-logo.png';
    if (metaverseSelected == Metaverses.SomniumSpace) return '/images/somnium-space-cube-logo.webp';
    return '';
  }

  return (
    <div className="bg-lm-fill dark:bg-nm-dm-fill rounded-xl flex w-[180px] h-full">
      <div className="w-full">
        <Image height={100} width={180} src={cardData.images?.image_url} className="rounded-t-xl" alt="hot deals land image" />
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-center relative -top-4">
            <Tooltip title={`${(cardData.gap.toFixed(2))} % Underpriced`} placement="bottom">
              <p className="w-3/4 font-normal text-sm truncate bg-green-400 text-nm-highlight rounded-sm px-2 py-1">{`${(cardData.gap.toFixed(2))} % Underpriced`}</p>
            </Tooltip>
          </div>
          <div className="flex justify-center">
            <Tooltip title={name || ''} placement="bottom">
              <p className="font-semibold text-lm-text text-sm truncate max-w-[160px]">
                {name}
              </p>
            </Tooltip>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xs font-normal text-lm-text-gray dark:text-nm-highlight">Listed Price: </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-bold text-xs  truncate">{`${cardData.current_price_eth?.toFixed(2)} ETH`}</p>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xs font-normal text-lm-text-gray dark:text-nm-highlight">Estimated Price: </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-bold text-xs  truncate">{`${cardData.eth_predicted_price?.toFixed(2)} ETH`}</p>
          </div>
          <div className="flex items-center justify-center mt-3">
            <CartButtonUI />
          </div>
          <div className="flex justify-center my-3 font-bold text-lm-text dark:text-nm-fill px-4">
            <Link href={cardData.external_link} target={'_blank'} className="flex items-center w-1/2">
              <Image height={12} width={10} src={metaverseImage} className="rounded-full" alt={`${METAVERSE_LABEL[metaverseSelected]} logo`} />
              <p className="text-[10px] pl-1 truncate">{metaverseSelected}</p>
            </Link>
            <Link href={cardData.market_links.opensea} target={'_blank'} className="flex items-center w-1/2">
              <Image height={12} width={10} src="/images/icons/markets/opensea.svg" className="rounded-full" alt="Opensea icon" />
              <p className="text-[10px] pl-1 truncate">OpenSea</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}