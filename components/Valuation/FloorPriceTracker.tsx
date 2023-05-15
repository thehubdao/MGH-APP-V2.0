import React, { useEffect, useState } from 'react'
import { getCollectionData } from '../../backend/services/openSeaDataManager'
import { Metaverse } from '../../lib/metaverse'
import { IPredictions } from '../../lib/types'
import { formatName } from '../../lib/utilities'
import { ICoinPrices } from '../../lib/valuation/valuationTypes'
import {
  getAxieFloorPrice,
  getFloorPriceByItrm,
  getSomniumSpaceFloorPrice
} from '../../lib/valuation/valuationUtils'
import { PriceList } from '../General'
import { Tooltip } from '@mui/material'
import { AiFillQuestionCircle } from 'react-icons/ai'

interface Props {
  metaverse: Metaverse
  coinPrices: ICoinPrices
}

const FloorPriceTracker = ({ coinPrices, metaverse }: Props) => {
  const [predictions, setPredictions] = useState<IPredictions>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setData = async () => {
      setLoading(true)
      // Fetch Data from OpenSea
      const stats = await getCollectionData(metaverse)
      /*       if (metaverse === 'axie-infinity') {
              // Fetch Data from Axie Market
              try {
                const floorPrice = Number(await getAxieFloorPrice())
                stats.floor_price = floorPrice
              } catch (error) { }
            } */

      /* if (metaverse === 'somnium-space') {
        // Fetch Data from Somnium Space floor price ITRM service
        try {
          const floorPrice = Number(await getSomniumSpaceFloorPrice())
          stats.floor_price = floorPrice
        } catch (error) { }
      } */

      /* if (metaverse === 'somnium-space') {
        const floorPrice = Number(await getFloorPriceByItrm(metaverse))
        stats.floor_price = floorPrice
      } */

      const formattedMetaverse =
        metaverse === 'sandbox'
          ? 'the-sandbox'
          : metaverse === 'somnium-space'
            ? 'somnium-space-cubes'
            : metaverse

      const metaversePrediction =
        (stats.floor_price * coinPrices.ethereum?.usd) /
        coinPrices[formattedMetaverse].usd

      const predictions = {
        ethPrediction: stats.floor_price,
        usdPrediction: stats.floor_price * coinPrices.ethereum?.usd,
        metaversePrediction: metaversePrediction,
      }
      setPredictions(predictions)
      setLoading(false)
    }
    setData()
  }, [metaverse])

  return !predictions ? (
    <>
      <div className='flex flex-col items-start border-t border-l border-white/10 rounded-xl p-5 w-full bg-grey-panel h-full'>
        <p className={`text-lg font-medium text-grey-content font-plus h-full`}>
          We couldn't obtain floor price for the {formatName(metaverse)} lands
          collection. Check{' '}
          <a
            href='https://opensea.io/collection'
            target='_blank'
            className='hover:underline text-grey-content'
          >
            Open Sea Market
          </a>{' '}
          for more information.
        </p>
      </div>
    </>
  ) : (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex items-center gap-x-2 mb-4'>
          <p className={`text-lg font-semibold text-grey-content font-plus`}>
          Floor Price:
          </p>
        </div>
        <div className='flex flex-col justify-center items-start border-t border-l border-white/10 rounded-xl p-5 w-full bg-grey-panel h-full'>
          <div
            className={
              (loading ? 'opacity-0' : 'opacity-100') +
              ' transition-all duration-300'
            }
          >
            <PriceList predictions={predictions} metaverse={metaverse} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FloorPriceTracker
