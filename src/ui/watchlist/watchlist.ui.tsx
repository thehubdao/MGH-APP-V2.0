"use client"

import { useState } from "react";
import { ICoinPrices, LandProps } from "../../types/valuationTypes";
import IsLoginUI from "../common/isLogin.ui";
import LandCardListUI from "../common/landCardList.ui";
import LandsMenuUI from "../portfolio/landsMenu.ui";
import SearhLandFormUI from "./serchLandForm.ui";
import { Metaverses } from "../../enums/enums";

const ilands: LandProps[] = [
  {
    metaverse: "The Sandbox",
    tokenId: '45',
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
      image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
      image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
      image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
    },
    opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
    external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
    token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
    predicted_price: 2.1985602407860347,
    eth_predicted_price: 2.363476837696573,
    floor_adjusted_predicted_price: 2.363476837696573,
    coords: {
      x: -159,
      y: -204
    },
    land_type: "Premium",
    history: [
      {
        timestamp: 1641616142000,
        time: "2022-01-08 04:29:02",
        hash: "5.25671023620356e+76",
        action: "Bought",
        price: 0.25,
        eth_price: 0.25,
        symbol: "ETH",
        owner: "1.966961568107039e+47",
        market: "OpenSea",
        chain: "ethereum"
      }
    ],
    variation_last_week: 0,
    variation_last_four_weeks: 0,
    variation_last_six_months: 0
  },
  {
    metaverse: "Decentraland",
    tokenId: '46',
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
      image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
      image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
      image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
    },
    opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
    external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
    token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
    predicted_price: 2.1985602407860347,
    eth_predicted_price: 2.363476837696573,
    floor_adjusted_predicted_price: 2.363476837696573,
    coords: {
      x: -159,
      y: -204
    },
    land_type: "Premium",
    history: [
      {
        timestamp: 1641616142000,
        time: "2022-01-08 04:29:02",
        hash: "5.25671023620356e+76",
        action: "Bought",
        price: 0.25,
        eth_price: 0.25,
        symbol: "ETH",
        owner: "1.966961568107039e+47",
        market: "OpenSea",
        chain: "ethereum"
      }
    ],
    variation_last_week: 0,
    variation_last_four_weeks: 0,
    variation_last_six_months: 0
  },
  {
    metaverse: "Somnium Space",
    tokenId: '47',
    name: "Extra Large #974 (XL) parcel in somnium space",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
      image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
      image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
      image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
    },
    opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
    external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
    token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
    predicted_price: 2.1985602407860347,
    eth_predicted_price: 2.363476837696573,
    floor_adjusted_predicted_price: 2.363476837696573,
    coords: {
      x: -159,
      y: -204
    },
    land_type: "Premium",
    history: [
      {
        timestamp: 1641616142000,
        time: "2022-01-08 04:29:02",
        hash: "5.25671023620356e+76",
        action: "Bought",
        price: 0.25,
        eth_price: 0.25,
        symbol: "ETH",
        owner: "1.966961568107039e+47",
        market: "OpenSea",
        chain: "ethereum"
      }
    ],
    variation_last_week: 0,
    variation_last_four_weeks: 0,
    variation_last_six_months: 0
  },
  {
    metaverse: "Somnium Space",
    tokenId: '48',
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
      image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
      image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
      image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
    },
    opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
    external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
    token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
    predicted_price: 2.1985602407860347,
    eth_predicted_price: 2.363476837696573,
    floor_adjusted_predicted_price: 2.363476837696573,
    coords: {
      x: -159,
      y: -204
    },
    land_type: "Premium",
    history: [
      {
        timestamp: 1641616142000,
        time: "2022-01-08 04:29:02",
        hash: "5.25671023620356e+76",
        action: "Bought",
        price: 0.25,
        eth_price: 0.25,
        symbol: "ETH",
        owner: "1.966961568107039e+47",
        market: "OpenSea",
        chain: "ethereum"
      }
    ],
    variation_last_week: 0,
    variation_last_four_weeks: 0,
    variation_last_six_months: 0
  },
  {
    metaverse: "Somnium Space",
    tokenId: '49',
    name: "LAND (0,-1)",
    images: {
      image_url: "/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2FnJ-WwoTE-M-yBAUowoFEQvAGJNcL7WGhwA36nAqgSMXRdYQ2X-Zu6xXGEI6C3d6IiLqFSLkZR4YBCnx_wldNAx9JTu9tBg7r1cFW&w=3840&q=75",
      image_thumbnail_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=250&w=250&auto=format",
      image_original_url: "https://img.seadn.io/files/d53cc5cfa5702c7d347fa9f19503e7d6.jpg?h=128&w=128&auto=format",
      image_preview_url: "https://api.sandbox.game/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/v2/preview-500px-x-500px.jpg"
    },
    opensea_link: "https://opensea.io/assets/ethereum/0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38/45",
    external_link: "https://www.sandbox.game/en/lands/afc9cb8b-c281-46ad-b1ba-ebfd1cce3de0/",
    token_metadata: "https://api.sandbox.game/lands/45/metadata.json",
    predicted_price: 2.1985602407860347,
    eth_predicted_price: 2.363476837696573,
    floor_adjusted_predicted_price: 2.363476837696573,
    coords: {
      x: -159,
      y: -204
    },
    land_type: "Premium",
    history: [
      {
        timestamp: 1641616142000,
        time: "2022-01-08 04:29:02",
        hash: "5.25671023620356e+76",
        action: "Bought",
        price: 0.25,
        eth_price: 0.25,
        symbol: "ETH",
        owner: "1.966961568107039e+47",
        market: "OpenSea",
        chain: "ethereum"
      }
    ],
    variation_last_week: 0,
    variation_last_four_weeks: 0,
    variation_last_six_months: 0
  }

]

const coinPrices: ICoinPrices = {
  decentraland: 0.0456,
  ethereum: 2897.65,
  'the-sandbox': 12.34,
  'axie-infinity': 67.89,
  'somnium-space-cubes': 0.9876
};

export default function WatchlistUI() {
  const isConnected = true; //TODO: connect variable from redux login state 
  const lands = ilands;
  const [filteredLands, setFilteredLands] = useState<LandProps[]>(ilands);
  const [metaverseSelected, setMetaverseSelected] = useState(Metaverses.ALL);

  const filterLands = (metaverse: Metaverses) => {
    setMetaverseSelected(metaverse);
    if (metaverse !== Metaverses.ALL) {
      setFilteredLands(lands.filter((land) => land.metaverse === metaverse));
    }
  }

  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your watchlist" />
        :
        <>
          <div className='mr-16 ml-8 mb-24 mt-10 rounded-2xl bg-lm-fill'>
            <LandsMenuUI metaverse={metaverseSelected} setMetaverse={(metaverse: Metaverses) => filterLands(metaverse)} isWatchlist={true} />
            <div className="w-full flex items-center justify-center gap-x-32 pb-16">
              <SearhLandFormUI metaverse={metaverseSelected} />
            </div>
            <div className=" px-6 pb-20 flex flex-wrap w-full justify-between">
              {
                metaverseSelected !== "All Lands" ?
                  <LandCardListUI lands={filteredLands} prices={coinPrices} />
                  :
                  <></>
              }
            </div>
          </div>
        </>
      }
    </>
  )
}