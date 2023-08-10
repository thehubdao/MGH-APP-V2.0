import { Metaverses } from "../../enums/enums";
import { LandProps } from "../../types/valuationTypes";
import SearchByCoordsUI from "./searchByCoords.ui";
import SearchByIdUI from "./searchById.ui";

interface SearchLandFormUIProps {
  metaverse: Metaverses;
  land?: LandProps;
}

export default function SearhLandFormUI({ metaverse, land }: SearchLandFormUIProps) {
  return (
    <div className="bg-lm-fill rounded-xl flex flex-wrap w-[1125px] h-52 items-center ">
      <div className="flex w-full justify-around items-center">
        <p className="text-lm-text">Add by Token ID</p>
        <SearchByIdUI metaverse={metaverse} land={land} />
      </div>
      <div className="flex w-full justify-around items-center">
        <p className="text-lm-text">Add by Coordinates</p>
        <SearchByCoordsUI metaverse={metaverse} land={land} />
      </div>
    </div>
  )
}