import { useEffect, useState } from "react";
import Head from "next/head";
import { Pagination } from "@mui/material";

// Components
import CollectionsChoise from "../components/General/Choicer/CollectionsChoise";
import GeneralSection from "../components/GeneralSection";
import InitChoice from "../components/InitChoice";
import DescriptionContent from "../components/DescriptionContent";
import {
	Content,
	FilterColumn,
	SearcherBar,
	TraitsButton,
} from "../components/nftValuation/index";

// Services
import {
	getDataTraits,
	getNftCollection,
	getNftGlobalData,
} from "../backend/services/nftCollectionInfo";

// Filters
import { typedKeys } from "../lib/utilities";

interface nftCollectionProps {
	num_owners: number;
	market_cap: number;
}

interface nftObject {
	tokenId: string;
	floor_adjusted_predicted_price: number;
	traits: {};
	images: {
		image_small: string;
	};
	name: string | null
	listed_eth_price: number | undefined | null
}

const headerList = [
	{
		name: "Portfolio",
		route: "portfolio",
	},
	{
		name: "Watchlist",
		route: "watchlist",
	},
	{
		name: "Analytics",
		route: "analytics",
	},
];

const collectionsList = [
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	},
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	},
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	},
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	},
	{
		name: "FLUF World",
		logo: "https://i.seadn.io/gcs/files/eae1fd3d26c6558ec5bba12c8aa29bd7.png?auto=format&w=1920",
		creator: "FLUF_World",
		nItems: 10000,
		collection: "fluf",
	},
];

export default function NftValuation() {
	// Fetched Data
	const [collectionName, setCollectionName] = useState<string>("");
	const [nftGlobal, setnftGlobal] = useState<nftCollectionProps | null>(null);
	const [nftTraitsFilters, setnftTraitsFilters] = useState<any[]>([]);
	const [nftObject, setnftObject] = useState<any[]>([]);

	// Control Flags
	const [openedTraitsColumn, setOpenedTraitsColumn] = useState<boolean>(false);
	const [loadingGlobalData, setLoadingGlobalData] = useState<boolean>(true);
	const [loadingCollection, setLoadingCollection] = useState<boolean>(true);

	// Pagination Controller
	const [numberOfPages, setNumberOfPages] = useState<number>(0)
	const [pageLenght, setPageLenght] = useState<number>(20);
	const [controlPageIndex, setControlPageIndex] = useState<number>(0);

	// Filter Controller
	const [filteredItems, setfilteredItems] = useState<nftObject[]>(nftObject);
	const [selectedFilters, setSelectedFilters] = useState({}) // array of traits filters selected 
	const [nFiltersSelected, setNFiltersSelected] = useState<number>(0) // number of filters checked
	const [inputValue, setInputValue] = useState<string | undefined>(undefined); // input on search by Id
	const [inputValueMin, setInputValueMin] = useState<number>(0);
	const [inputValueMax, setInputValueMax] = useState<number>(Number.MAX_VALUE);
	const [isFilteredByPrice, setIsFilteredByPrice] = useState<boolean>(false); // flag if is filter by price
	const [ejectSelectFilter, setEjectSelectFilter] = useState<boolean>(false); // flag if is filter by traits
	const [isFilteredByListed, setIsFilteredByListed] = useState<boolean>(false);

	const handleApply = () => {
		setIsFilteredByPrice(inputValueMax !== Number.MAX_VALUE || inputValueMin !== 0)
	}

	const handleTraitFilter = (selectedFilter: nftObject, noFiltersSelected: number) => {
		setSelectedFilters(selectedFilter)
		setNFiltersSelected(noFiltersSelected)
		setEjectSelectFilter(!ejectSelectFilter)
	}

	useEffect(() => {
		console.log(filteredItems.length)
		if (filteredItems.length > 0) {	
			setNumberOfPages(Math.ceil(filteredItems.length / pageLenght));
		} else {
			setNumberOfPages(Math.ceil(nftObject?.length / pageLenght));
		} setControlPageIndex(0);
	}, [filteredItems, nftObject]);

	useEffect(() => {
		if (!nftTraitsFilters) return
		typedKeys(nftTraitsFilters).map((filter) => {
			const auxSelectedFilters: any = selectedFilters
			auxSelectedFilters[filter] = []
			setSelectedFilters(auxSelectedFilters)
		})
	}, [nftTraitsFilters]);

	useEffect(() => {
		const getDataCollection = async () => {
			let response, traits, globalResponse
			if (collectionName) {
				setLoadingCollection(true);
				response = await getNftCollection(collectionName);
				traits = await getDataTraits(collectionName)
				globalResponse = await getNftGlobalData(collectionName);
				setnftObject(response);
				setnftTraitsFilters(traits);
				setnftGlobal(globalResponse.stats);
				setLoadingGlobalData(false);
				setLoadingCollection(false);
			}
		};
		getDataCollection();
	}, [collectionName]);

	useEffect(() => {
		if (inputValue) {
			const results = nftObject.filter((nft: nftObject) => {
				return nft.tokenId == inputValue;
			});
			setfilteredItems(results);
		} else if (nFiltersSelected > 0 || isFilteredByPrice || isFilteredByListed) {
			const results = nftObject.filter((nft: any) => {
				// Traits Filter
				let isReturnItemByTrait = !(nFiltersSelected > 0)
				let noItemsByTraits = 0 // its a counter of filters on the object.
				Object.entries(selectedFilters).forEach(([key, value]: any) => {
					value.map((item: any) => {
						if (nft.traits[key] == item) { noItemsByTraits = noItemsByTraits + 1 }
					})
				});
				if (noItemsByTraits === nFiltersSelected) { isReturnItemByTrait = true }
				// Price filter
				let isReturnItemByPrice = true
				if (inputValueMin !== 0 || inputValueMax !== Number.MAX_VALUE) {
					isReturnItemByPrice = isFilteredByPrice
						&& nft.floor_adjusted_predicted_price >= inputValueMin
						&& nft.floor_adjusted_predicted_price <= inputValueMax
				}
				// Listed Filter
				let isReturnItemByListed = !isFilteredByListed
				if (isFilteredByListed) { isReturnItemByListed = nft.listed_eth_price ? true : false }
				return (isReturnItemByTrait && isReturnItemByPrice && isReturnItemByListed)
			});
			setfilteredItems(results)
		} else { setfilteredItems(nftObject) }
	}, [inputValue, ejectSelectFilter, isFilteredByPrice, isFilteredByListed])

	return (
		<>
			<Head>
				<title>MGH - NFT Valuation</title>
				<meta name="description" content="" />
			</Head>

			{/* Top Padding or Image */}
			<div className={`relative ${collectionName ? "p-0 mb-8 w-full" : "pt-24"}`}>
				<img
					src="/images/nft_valuation_header.svg"
					alt="nft_valuation_header"
					className={`${collectionName ? "object-fill flex w-full" : "hidden"}`}
				/>
			</div>

			{/* General Section Layout */}
			<GeneralSection
				sectionTitle="NFT Valuation"
				optionList={headerList}
				backgroundClass={`${collectionName ? "" : "bg-grey-lightest"}`}
			>
				{collectionName ? (
					<>
						{nftGlobal && (
							<DescriptionContent
								title="FLUF World"
								description="Direct repair of aneurysm, pseudoaneurysm, or excision (partial or total) and graft insertion, with or without patch graft; for ruptured aneurysm, abdominal aorta  Direct repair of aneurysm, pseudoaneurysm, or excision (partial or total) and graft insertion, with or without patch graft; for ruptured aneurysm, abdominal aorta"
								boxInfo={nftGlobal}
								isLoading={loadingGlobalData}
							/>
						)}
						<div className="grid grid-cols-4 gap-5 w-full">
							{
								!loadingCollection && <>
									{/* Searcher Bar */}
									<TraitsButton
										openedTraits={openedTraitsColumn}
										setOpenedTraits={setOpenedTraitsColumn}
									/>
									<div className="col-span-3 ">
										<SearcherBar
											inputValue={inputValue}
											setInputValue={setInputValue}
										/>
									</div>
									{/* Traits Filter Column */}
									{openedTraitsColumn && (
										<FilterColumn
											selectedFilters={selectedFilters}
											nftTraitsFilters={nftTraitsFilters}
											inputValueMax={inputValueMax}
											inputValueMin={inputValueMin}
											setInputValueMax={setInputValueMax}
											setInputValueMin={setInputValueMin}
											handleApply={handleApply}
											handleTraitFilter={handleTraitFilter}
											setIsFilteredByListed={setIsFilteredByListed}
										/>
									)}
								</>
							}
							{/* NFT Collection List */}
							<div className={`${openedTraitsColumn ? "col-span-3" : "col-span-full"} `}>
								<Content
									filteredItems={filteredItems}
									nftObject={nftObject}
									isLoading={loadingCollection}
									controlPageIndex={controlPageIndex}
									pageLenght={pageLenght}
									collectionName={collectionName}
								/>
							</div>
							{/* Pagination of collection list content */}
							<div className="col-span-full flex justify-center p-10">
								{numberOfPages > 1 ? (
									<Pagination
										count={numberOfPages}
										defaultPage={controlPageIndex + 1}
										siblingCount={3} boundaryCount={2}
										shape="rounded"
										size="large"
										onChange={(e, page) => { setControlPageIndex(page - 1) }}
									/>
								) : (<></>)}
							</div>
						</div>
						{/* Footer */}
						<p className="text-grey-icon text-center text-xs p-20">
							The MGH DAO does not provide, personalized investment
							recommendations or advisory services. Any information provided
							through the land evaluation tool and others is not, and should not
							be, considered as advice of any kind and is for information
							purposes only. That land is “valuated” does not mean, that it is
							in any way approved, checked audited, and/or has a real or correct
							value. In no event shall the MGH DAO be liable for any special,
							indirect, or consequential damages, or any other damages of any
							kind, including but not limited to loss of use, loss of profits,
							or loss of data, arising out of or in any way connected with the
							use of or inability to use the Service, including without
							limitation any damages resulting from reliance by you on any
							information obtained from using the Service.
						</p>
					</>
				) : (
					<InitChoice title="Choose a NFT Collection">
						<CollectionsChoise
							options={collectionsList}
							setCollection={setCollectionName}
						/>
					</InitChoice>
				)}
			</GeneralSection>
		</>
	);
}