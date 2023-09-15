import { MetaverseOptionsKey } from "../../enums/metaverses.enum";
import { SingleLandAPIResponse } from "../../types/valuationTypes";
import SearchByCoordsUI from "./searchByCoords.ui";
import SearchByIdUI from "./searchById.ui";

interface SearchLandFormUIProps {
  metaverse?: MetaverseOptionsKey;
  land?: SingleLandAPIResponse;
}

export default function SearchLandFormUI({ metaverse, land }: SearchLandFormUIProps) {
  return (
    <div className="bg-lm-fill dark:bg-nm-dm-fill dark:shadow-dm-relief-12 rounded-xl flex flex-wrap w-full h-52 items-center px-20">
      <div className="flex w-full justify-between items-center">
        <p className="text-lm-text dark:text-nm-fill">Add by Token ID:</p>
        <SearchByIdUI metaverse={metaverse} land={land} />
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="text-lm-text dark:text-nm-fill">Add by Coordinates:</p>
        <SearchByCoordsUI metaverse={metaverse} land={land} />
      </div>
    </div>
  )
}