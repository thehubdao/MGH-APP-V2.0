import axios from "axios";
import { AnyObject } from "immer/dist/internal";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GiFluffySwirl } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import NftCard from "../components/nftValuation/NftCard";
import Pagination from "../components/Pagination";

const Home: NextPage = () => {
	const [nftFlufObject, setnftFlufObject] = useState([]);
	const [nftFlufGlobal, setnftFlufGlobal] = useState<AnyObject>({});
	const [searchId, setSearchById] = useState(nftFlufObject);
	const [nftId, setnftId] = useState("");

	const [loading, setLoading] = useState(true);
	const [pageLenght, setPageLenght] = useState(0);
	const [pageSearcher, setPageSearcher] = useState<number>();
	const [controlPageIndex, setControlPageIndex] = useState<number>(0);

	const styleContent =
		"text-xxs xs:text-xxs xl:text-xs font-plus font-bold text-grey-content pt-0 sm:pt-5 flex justify-between";

	const formatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 4,
	});

	const filtered = (e: any) => {
		const keyWord = e.target.value;
		const results = nftFlufObject.filter((fluf: any) => {
			return fluf.tokenId == keyWord;
		});
		setSearchById(results);
		setnftId(keyWord);
	};

	const getnftFluf = async () => {
		setLoading(true);
		const dataArray: any = [];
		let responseCondition = {},
			from = 0;

		do {
			await axios
				.get(
					process.env.ITRM_SERVICE + `/fluf/collection?from=${from}&size=2000`
				)
				.then((response) => {
					responseCondition = response.data;
					Object.entries(response.data).forEach(([key, value]) => {
						dataArray.push(value);
					});
					from = from + 2000;
				})
				.catch((error) => {
					console.log(error);
				});
		} while (Object.keys(responseCondition).length > 0);

		return dataArray;
	};

	useEffect(() => {
		getnftFluf()
			.then((dataArray) => {
				setnftFlufObject(dataArray);
				setPageLenght(Math.trunc(dataArray.length / 10));
				setLoading(false);
				setControlPageIndex(0);
			})
			.catch((e) => console.log(e));
	}, []);

	useEffect(() => {
		const getnftFlufGlobal = async () => {
			setnftFlufGlobal(
				(await axios.get(process.env.ITRM_SERVICE + "/fluf/globalData")).data
			);
		};
		getnftFlufGlobal();
	}, []);

	const dataFluf = () => {
		const flufs: any = [];
		for (
			let index: number = controlPageIndex * 10;
			index < controlPageIndex * 10 + 20;
			index++
		) {
			if (!nftFlufObject[index]) return flufs;
			flufs.push(
				<NftCard
					image={nftFlufObject[index]["images"]["image_small"]}
					text="Estimated Price: "
					value={formatter.format(
						nftFlufObject[index]["floor_adjusted_predicted_price"]
					)}
				/>
			);
		}
		return flufs;
	};
	return (
		<>
			<Head>
				<title>MGH - NFT Valuation</title>
				<meta
					name="description"
					content="Swap your MGH, become a liquidity provider by staking your tokens and access our data ecosytem."
				/>
			</Head>
			<div className="bg-grey-lightest rounded-lg p-8">
				<div className="w-full flex flex-col space-y-10 mt-8 xl:mt-0">
					<span>
						<img src="/images/imagenft.svg" alt="IMG" className="w-full" />
					</span>
					<div className="flex border-t border-l border-white/10 rounded-3xl shadowDiv p-5 bg-opacity-30 justify-between bg-grey-bone">
						<div className="pr-5 w-3/4">
							<h2 className="text-grey-content font-plus font-normal rounded-2xl lg:text-5xl text-3xl mb-0 sm:mb-2">
								Description
								<br />
							</h2>
							<p
								className={`text-sm xs:text-base xl:text-lg font-plus font-normal text-grey-content`}
							>
								Direct repair of aneurysm, pseudoaneurysm, or excision (partial
								or total) and graft insertion, with or without patch graft; for
								ruptured aneurysm, abdominal aorta Direct repair of aneurysm,
								pseudoaneurysm, or excision (partial or total) and graft
								insertion, with or without patch graft; for ruptured aneurysm,
								abdominal aorta
							</p>
						</div>
						<div className="flex border-t border-l border-white/10 shadow-blck rounded-xl p-3 bg-[#D4D7DD] bg-opacity-30 w-1/4  justify-between pt-5 pb-5">
							<div className="flex flex-col ">
								<p className={styleContent}>FLOOR :</p>
								<p className={styleContent}>TRADING VOLUME :</p>
								<p className={styleContent}>MCAP :</p>
								<p className={styleContent}>OWNERS :</p>
							</div>
							<div className="items-end">
								<p className={styleContent}>
									{formatter.format(nftFlufGlobal.stats?.floor_price)}
								</p>
								<p className={styleContent}>
									{formatter.format(nftFlufGlobal.stats?.total_volume)}
								</p>
								<p className={styleContent}>
									{formatter.format(nftFlufGlobal.stats?.market_cap)}
								</p>
								<p className={styleContent}>
									{nftFlufGlobal.stats?.num_owners}
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-4 space-x-12  w-full">
						<div className="w-full relative shadowDiv rounded-full">
							<i className="absolute flex h-full items-center right-10 z-0">
								<svg
									className="w-4 h-4 pointer-events-none"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 412 232"
								>
									<path
										d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
										fill="#54575C"
									/>
								</svg>
							</i>
							<select
								name="traits"
								className="px-10 py-5 font-bold font-plus focus:outline-none w-full appearance-none bg-transparent z-10"
							>
								<option
									value="traits1"
									className="shadowDiv rounded-full py-5 font-bold font-plus"
								>
									TRAITS
								</option>
								<option
									value="traits2"
									className="shadowDiv rounded-full py-5 font-bold font-plus"
								>
									HEAD
								</option>
								<option
									value="traits3"
									className="shadowDiv rounded-full py-5 font-bold font-plus"
								>
									FUR
								</option>
							</select>
						</div>
						<div className="relative searchBy rounded-full col-span-3 flex">
							<input
								type="number"
								onChange={filtered}
								value={nftId}
								placeholder="Search by ID"
								className="font-bold font-plus justify-center text-grey-content focus:outline-none placeholder-gray-300 p-3 searchBy rounded-full w-3/4"
							/>
							<button
								type="submit"
								className="absolute block right-4 top-6 text-grey-content text-xl"
							>
								<FiSearch />
							</button>
						</div>
					</div>
					{searchId && searchId.length > 0 ? (
						<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 xs:gap-2 sm:gap-5 w-full">
							{searchId.map((fluf: any, key: number) => {
								return (
									<NftCard
										key={key}
										image={fluf.images.image_small}
										text="Estimated Price: "
										value={formatter.format(
											fluf.floor_adjusted_predicted_price
										)}
									/>
								);
							})}
						</div>
					) : (
						<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 xs:gap-2 sm:gap-5 w-full">
							{dataFluf()}
						</div>
					)}
					{!nftId && (
						<Pagination
							pageLenght={pageLenght}
							controlPageIndex={controlPageIndex + 1}
							setControlPageIndex={setControlPageIndex}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
