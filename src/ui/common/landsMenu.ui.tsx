import { ButtonForm } from "../../enums/common.enum";
import Image from "next/image";
import { Metaverses, METAVERSE_LABEL } from "../../enums/metaverses.enum";
import { TypedKeys } from "../../utils/common.util";

interface LandsMenuUIProps {
  metaverse: Metaverses | undefined;
  setMetaverse: (metaverse: Metaverses | undefined) => void;
  form: ButtonForm;
  isBorder: boolean
}

export default function LandsMenuUI({ metaverse, setMetaverse, form, isBorder }: LandsMenuUIProps) {

  function isAll(compare: Metaverses | "All") {
    if (metaverse == undefined && compare === "All") return true;
    return metaverse === compare;
  }

  return (
    <div className={`w-full flex items-center justify-center  py-16 ${isBorder ? "border-b border-nm-remark dark:border-nm-dm-fill" : ""}`}>
      {
        form == ButtonForm.Horizontal ?
          <>
            {TypedKeys(METAVERSE_LABEL).map((iterateMetaverse) =>
              <button
                key={iterateMetaverse}
                type="button"
                className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-xl mx-3 transition ease-in-out duration-300 bg-lm-fill dark:bg-nm-dm-fill  ${isAll(iterateMetaverse) ? "shadow-hollow-8 dark:shadow-dm-hollow-8  text-nm-dm-icons dark:text-nm-fill" : " shadow-relief-12 dark:shadow-dm-relief-12 hover:shadow-relief-32 dark:hover:shadow-dm-relief-32 text-nm-dm-remark dark:text-nm-fill"}`}
                onClick={() => setMetaverse(iterateMetaverse === "All" ? undefined : iterateMetaverse)}
              >
                {iterateMetaverse === Metaverses.SandBox &&
                  <Image src="/images/mgh_logo/mgh_logo.svg" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses.SandBox ? 'grayscale-0' : 'grayscale'}`} />}
                {iterateMetaverse === Metaverses.Decentraland &&
                  <Image src="/images/decentraland-mana-logo.png" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses.Decentraland ? 'grayscale-0' : 'grayscale'}`} />}
                {iterateMetaverse === Metaverses.SomniumSpace &&
                  <Image src="/images/somnium-space-cube-logo.webp" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === Metaverses.SomniumSpace ? 'grayscale-0' : 'grayscale'}`} />}
                {METAVERSE_LABEL[iterateMetaverse].toUpperCase()}
              </button>
            )}
          </>
          :
          <>
            {Object.values(Metaverses).map((iterateMetaverse) =>
              <button
                key={iterateMetaverse}
                type="button"
                className={`flex flex-col items-center justify-center rounded-3xl cursor-pointer w-[240px] h-[320px] mx-10 focus:outline-none transition ease-in-out duration-300 grayscale hover:grayscale-0 shadow-relief-32 hover:shadow-relief-12 dark:shadow-dm-relief-32 dark:hover:shadow-dm-relief-12 ${metaverse === iterateMetaverse ? "grayscale-0" : ""}`}
                onClick={() => setMetaverse(iterateMetaverse)}
              >
                {iterateMetaverse === Metaverses.SandBox &&
                  <Image src="/images/the-sandbox-sand-logo.png" width={100} height={100} alt="sandbox" />}
                {iterateMetaverse === Metaverses.Decentraland &&
                  <Image src="/images/decentraland-mana-logo.png" width={100} height={100} alt="sandbox" />}
                {iterateMetaverse === Metaverses.SomniumSpace &&
                  <Image src="/images/somnium-space-cube-logo.webp" width={100} height={100} alt="sandbox" />}
                <p className="mt-14 text-lg font-semibold text-lm-text dark:text-nm-fill">
                  {METAVERSE_LABEL[iterateMetaverse].toUpperCase()}
                </p>
              </button>
            )}
          </>
      }
    </div>
  )
}