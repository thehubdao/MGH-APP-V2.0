import { Metaverses } from "../../enums/enums";
import Image from "next/image";

interface LandsMenuUIProps {
  metaverse: Metaverses,
  setMetaverse: React.Dispatch<React.SetStateAction<Metaverses>>,
  isWatchlist: boolean,
}

export default function LandsMenuUI({ metaverse, setMetaverse, isWatchlist }: LandsMenuUIProps) {

  return (
    <div className={`w-full flex items-center justify-center  py-16 ${!isWatchlist ? "border-b border-nm-remark" : ""}`}>
      {
        !isWatchlist ?
          <>
            {(Object.keys(Metaverses) as Array<keyof typeof Metaverses>).map((key) => (
              <button
                key={key}
                type="button"
                className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-3xl mx-3 transition ease-in-out duration-300  ${metaverse === Metaverses[key] ? "shadow-inset  text-nm-dm-icons" : "hover:shadow-relief-12 text-nm-dm-remark"}`}
                onClick={() => setMetaverse(Metaverses[key])}
              >
                {Metaverses[key] === Metaverses.SANDBOX && <Image src="/images/mgh_logo/mgh_logo.svg" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses[key] ? 'grayscale-0': 'grayscale'}`} />}
                {Metaverses[key] === Metaverses.DECENTRALAND && <Image src="/images/decentraland-mana-logo.png" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses[key] ? 'grayscale-0': 'grayscale'}`} />}
                {/* {Metaverses[key] === Metaverses.AXIE && <Image src="/images/axie-infinity-axs-logo.png" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses[key] ? 'grayscale-0': 'grayscale'}`}/>} */}
                {Metaverses[key] === Metaverses.SOMNIUM && <Image src="/images/somnium-space-cube-logo.webp" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses[key] ? 'grayscale-0': 'grayscale'}`} />}
                {Metaverses[key].toUpperCase()}
              </button>
            ))}
          </>
          :
          <>
            {(Object.keys(Metaverses) as Array<keyof typeof Metaverses>).map((key) => {
              if (Metaverses[key] === Metaverses.ALL) {
                return null;
              }
              return (
                <button
                  key={key}
                  type="button"
                  className={`flex flex-col items-center justify-center rounded-3xl cursor-pointer w-[240px] h-[320px] mx-10 focus:outline-none shadow-relief-32 hover:shadow-relief-12 transition ease-in-out duration-300 grayscale hover:grayscale-0 ${metaverse === Metaverses[key] ? "grayscale-0" : ""}`}
                  onClick={() => setMetaverse(Metaverses[key])}
                >
                  {Metaverses[key] === Metaverses.SANDBOX && <Image src="/images/the-sandbox-sand-logo.png" width={100} height={100} alt="sandbox"/>}
                  {Metaverses[key] === Metaverses.DECENTRALAND && <Image src="/images/decentraland-mana-logo.png" width={100} height={100} alt="sandbox"/>}
                  {/* {Metaverses[key] === Metaverses.AXIE && <Image src="/images/axie-infinity-axs-logo.png" width={100} height={100} alt="sandbox"/>} */}
                  {Metaverses[key] === Metaverses.SOMNIUM && <Image src="/images/somnium-space-cube-logo.webp" width={100} height={100} alt="sandbox"/>}
                  <p className="mt-14 text-lg font-semibold text-nm-dm-icons">
                    {Metaverses[key].toUpperCase()}
                  </p>
                </button>
              );
            })}
          </>

      }
    </div>
  )
}