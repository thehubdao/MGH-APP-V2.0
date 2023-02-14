import React from 'react'
import { Metaverse } from '../../lib/metaverse'
import { formatName, typedKeys } from '../../lib/utilities'
import { OptimizedImage } from '../General'

interface Props {
  setAllMetaverse: React.Dispatch<React.SetStateAction<Metaverse>>
  allMetaverse: any
}

const AnalyticsMvChoice = ({ allMetaverse, setAllMetaverse }: Props) => {
  const mvOptions = {
    sandbox: { logo: '/images/the-sandbox-sand-logo.png' },
    decentraland: { logo: '/images/decentraland-mana-logo.png' },
    /* 'axie-infinity': { logo: '/images/axie-infinity-axs-logo.png' }, */
    'somnium-space': { logo: '/images/somnium-space-cube-logo.webp'}
  }
  return (
    <div className='w-full h-full p-2'>
      {/* Metaverse Buttons */}
      <div className='nm-insert-hard flex justify-center gap-5 sm:gap-8'>
        {typedKeys(mvOptions).map((landKey: Metaverse) => (
          <button
            key={landKey}
            onClick={() =>{
              let state: boolean;
              allMetaverse[landKey].active ? state=false : state=true 
              setAllMetaverse((prevState: any) => ({
              ...prevState,
                [landKey]: {
                  ...prevState[landKey],
                  active: state
                },
              })
            )}}
            className={`flex flex-col items-center justify-center space-y-2 rounded-xl cursor-pointer p-2 px-3 pt-4 md:w-40 md:h-[12rem] w-30 h-32 group focus:outline-none ${
              allMetaverse[landKey].active
                ? 'border-opacity-20 nm-inset-medium'
                : 'nm-flat-medium border-opacity-20 hover:border-opacity-100'
            } border border-gray-400 transition duration-300 ease-in-out`}
          >
            <OptimizedImage
              src={mvOptions[landKey].logo}
              height={60}
              width={60}
              objectFit='contain'
              className={`w-10 ${
                allMetaverse[landKey].active ? 'grayscale-0' : 'grayscale'
              } group-hover:grayscale-0 transition duration-300 ease-in-out`}
            />
            <p className='font-medium text-xs md:text-sm pt-1'>
              {formatName(landKey)}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsMvChoice
