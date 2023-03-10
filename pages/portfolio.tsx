import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Image from "next/image";
import { useAccount } from 'wagmi'

import {
	convertETHPrediction,
	fetchLandList,
} from '../lib/valuation/valuationUtils'
import {
	ICoinPrices,
	LandListAPIResponse,
	SingleLandAPIResponse,
} from '../lib/valuation/valuationTypes'
import { PriceList } from '../components/General'
import { IPredictions } from '../lib/types'
import { useRouter } from 'next/router'
import { typedKeys } from '../lib/utilities'
import PortfolioList from '../components/Portfolio/PortfolioList'
import { SocialMediaOptions } from '../lib/socialMediaOptions'
import { ethers } from 'ethers'
import { Chains } from '../lib/chains'
import { Metaverses } from "../lib/enums"
import { getAxieLands, getUserNFTs } from '../lib/nftUtils'
import { getAddress } from 'ethers/lib/utils'
import { Metaverse, metaverseObject } from '../lib/metaverse'
import GeneralSection from '../components/GeneralSection'
import SpecificAssetModal from '../components/General/SpecificAssetModal'
import Footer from '../components/General/Footer'
import ConnectButton from '../components/ConnectButton';
import NoLands from '../components/Portfolio/NoLands';

const headerList = [
	{
		name: "Land Valuation",
		route: "valuation",
	},
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



const PortfolioPage: NextPage<{ prices: ICoinPrices }> = ({ prices }) => {
	const { query, push } = useRouter()

	const initialWorth = {
		ethPrediction: 0,
		usdPrediction: 0,
	}
	const { address } = useAccount()
	/* const { address, chainId } = useAppSelector((state) => state.account) */
	const [copiedText, setCopiedText] = useState(false)
	const [metaverse, setMetaverse] = useState(Metaverses.ALL)

	const [totalWorth, setTotalWorth] = useState<IPredictions>(initialWorth)
	const [totalAssets, setTotalAssets] = useState(0)
	const [alreadyFetched, setAlreadyFetched] = useState(false)
	const [lands, setLands] = useState<Record<Metaverse, LandListAPIResponse>>()
	const [loading, setLoading] = useState(true)

	// Specific Land modal controller
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [specificLandSelected, setSpecificLandSelected] = useState<SingleLandAPIResponse>();

	const socialMedia = SocialMediaOptions(
		undefined,
		undefined,
		undefined,
		address
	)

	const externalWallet = query.wallet
	const isRonin = query.wallet?.toString().startsWith('ronin')

	const copyLink = () => {
		navigator.clipboard.writeText(
			'https://app.metagamehub.io/portfolio?wallet=' + address
		)
		// Display Feedback Text

		setCopiedText(true)
		setTimeout(() => {
			setCopiedText(false)
		}, 1100)
	}

	// Resetting state when Wallet Changes
	const resetState = () => {
		setCopiedText(false)
		setLoading(true)
		setTotalWorth(initialWorth)
		setTotalAssets(0)
		setLands(undefined)
	}

	const formatAddress = (address: string) => {
		// If Ronin Address
		if (address.startsWith('ronin:')) {
			return getAddress(address.substring(address.indexOf(':') + 1))
		}
		if (address.startsWith('0x')) return getAddress(address)
		return getAddress('0x0000000000000000000000000000000000000000')
	}

	const handleSpecificLandData = (
		openModal: boolean,
		landData?: any,
		landId?: string,
		functionMetaverse?: Metaverse) => {
		if (landId && functionMetaverse && lands) {
			let results = lands[functionMetaverse]
			if (results)
				setSpecificLandSelected(results[landId])
		}
		landData && setSpecificLandSelected(landData)
		setIsModalOpen(openModal)
	}

	useEffect(() => {
		if (externalWallet && alreadyFetched) return
		setAlreadyFetched(true)

		const providerEthereum = new ethers.providers.InfuraProvider(
			Chains.ETHEREUM_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		)

		const providerMatic = new ethers.providers.InfuraProvider(
			Chains.MATIC_MAINNET.chainId,
			'03bfd7b76f3749c8bb9f2c91bdba37f3'
		)

		console.log('eth provider', providerEthereum)
		console.log('matic provider', providerMatic)

		// Requesting and Formatting Assets
		const setPortfolioAssets = async () => {
			resetState()
			if (!address && !externalWallet) return setLoading(false)

			// Infura/ Axie Market API Call
			try {
				await Promise.all(
					typedKeys(metaverseObject).map(async (metaverse) => {
						let rawIdsEthereum: string[] | undefined
						let rawIdsMatic: string[] | undefined
						if (/* metaverse === 'axie-infinity' */ false) {
							rawIdsEthereum = await getAxieLands(
								formatAddress(
									(externalWallet as string) ?? address
								)
							)
						} else {
							rawIdsEthereum = await getUserNFTs(
								providerEthereum,
								'Ethereum',
								formatAddress((externalWallet as string) ?? address),
								metaverse
							)

							rawIdsMatic = await getUserNFTs(
								providerMatic,
								'Polygon',
								formatAddress((externalWallet as string) ?? address),
								metaverse
							)

						}
						if ((!rawIdsEthereum || rawIdsEthereum.length <= 0) && (!rawIdsMatic || rawIdsMatic.length <= 0)) return

						// LandList Call
						let metaverseLandsObjectEthereum = {}
						let metaverseLandsObjectMatic = {}

						if (rawIdsEthereum && rawIdsEthereum.length > 0)
							metaverseLandsObjectEthereum = await fetchLandList(metaverse, rawIdsEthereum)

						if (rawIdsMatic && rawIdsMatic.length > 0)
							metaverseLandsObjectMatic = await fetchLandList(metaverse, rawIdsMatic)


						const metaverseLandsObject: any = { ...metaverseLandsObjectEthereum, ...metaverseLandsObjectMatic }

						console.log('lands', metaverseLandsObject)

						// Adding Total Worth
						const totalMvWorth = { usd: 0, eth: 0 }
						typedKeys(metaverseLandsObject).forEach((land) => {
							totalMvWorth.usd += convertETHPrediction(
								prices,
								metaverseLandsObject[land].eth_predicted_price,
								metaverse
							).usdPrediction
							totalMvWorth.eth +=
								metaverseLandsObject[land].eth_predicted_price
						})

						// Setting Lands
						setLands((previous) => {
							return {
								...previous!,
								[metaverse]: metaverseLandsObject,
							}
						})
						// Setting Asset Number
						setTotalAssets(
							(previous) =>
								previous +
								typedKeys(metaverseLandsObject).length
						)

						// Adding the worth of each metaverse into the totalWorth
						setTotalWorth((previousWorth) => ({
							ethPrediction:
								previousWorth.ethPrediction + totalMvWorth.eth,
							usdPrediction:
								previousWorth.usdPrediction + totalMvWorth.usd,
						}))
					})
				)
				setLoading(false)
			} catch (err) {
				console.log(err)
			}
		}

		setPortfolioAssets()
	}, [externalWallet, address])

	return (
		<>
			<Head>
				<title>MGH - Portfolio</title>
				<meta
					name="description"
					content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data."
				/>
			</Head>

			{/* {openModal && <WalletModal onDismiss={() => setOpenModal(false)} />} */}

			{/* Top Padding or Image */}
			<div className={`relative p-0 w-full ${!isModalOpen && 'h-[400px] mb-24'}`}>
				{
					!isModalOpen && (
						<Image
							src="/images/land_header.webp"
							objectFit={'cover'}
							alt='land header'
							layout="fill"
						/>
					)
				}
			</div>

			{/* General Section Layout */}
			{
				isModalOpen ? (
					<SpecificAssetModal
						collectionName={metaverse}
						specificAssetSelected={specificLandSelected}
						handleSpecificAssetData={handleSpecificLandData}
						hiddenSearchBar={true}
						hiddenOwner={true}
						isFullHeight={true}
					/>
				) : (
					<GeneralSection
						sectionTitle="Portfolio"
						optionList={headerList}
						backgroundClass={``}
					>

						<div className="flex items-center justify-between p-8 space-x-20">
							<div className="flex flex-col space-y-3 max-w-lg">
								<p className="text-2xl font-semibold">Description</p>
								<p className="text-sm">The MGH LAND price estimator uses AI to calculate the fair value of LANDs and help you find undervalued ones.  Leverage our heatmap to quickly get an overview of the Sandbox Map and get insights about current price trends. The valuations are updated at a daily basis.</p>
							</div>
							<div className="flex space-x-8 w-full items-stretch justify-end max-w-2xl min-w-max">
								<div className="flex flex-col space-y-5 items-center justify-end nm-flat-hard py-3 px-7 rounded-3xl bg-grey-bone">
									<p className=" font-black text-3xl">{totalAssets}</p>
									<p className="text-sm">Total LANDs owned</p>
								</div>

								<div className="flex flex-col space-y-2 items-center nm-flat-hard py-3 px-10 rounded-3xl  bg-grey-bone">
									<div className=" font-black text-2xl"><PriceList predictions={totalWorth} /></div>
									<p className="text-sm">Total Value worth</p>
								</div>

							</div>
						</div>

						<div className='mx-16 mb-24'>
							<div className='w-full flex items-center justify-center space-x-5 py-16 border-b border-grey-panel'>
								{(Object.keys(Metaverses) as Array<keyof typeof Metaverses>).map((key) => (
									<button
										type="button"
										className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-3xl font-plus transition ease-in-out duration-300 bg-grey-bone ${metaverse === Metaverses[key] ? "nm-inset-medium text-grey-content" : "nm-flat-medium hover:nm-flat-soft border border-white text-grey-icon"}`}
										onClick={() => setMetaverse(Metaverses[key])}
										key={key}
									>
										{Metaverses[key] === Metaverses.SANDBOX && <img src="/images/the-sandbox-sand-logo.png" className='h-6 w-6 mr-4' />}
										{Metaverses[key] === Metaverses.DECENTRALAND && <img src="/images/decentraland-mana-logo.png" className='h-6 w-6 mr-4' />}
										{/* {Metaverses[key] === Metaverses.AXIE && <img src="/images/axie-infinity-axs-logo.png" className='h-6 w-6 mr-4' />} */}
										{Metaverses[key] === Metaverses.SOMNIUM && <img src="/images/somnium-space-cube-logo.webp" className='h-6 w-6 mr-4' />}

										{Metaverses[key].toUpperCase()}
									</button>
								))}
							</div>
						</div>

						{/* Lands Grid */}
						{lands && metaverse === Metaverses.ALL &&
							typedKeys(metaverseObject).map(
								(metaverse, index) =>
									lands[metaverse] &&
									typedKeys(lands[metaverse]).length > 0 && (
										<div key={metaverse} className="mb-8 sm:mb-12">
											<PortfolioList
												metaverse={metaverse}
												lands={lands[metaverse]}
												prices={prices}
												handleSpecificLandData={handleSpecificLandData}
											/>
										</div>
									)
							)}

						{lands && metaverse === Metaverses.SANDBOX && (
							lands["sandbox"]
								? (
									<div key={metaverse} className="mb-8 sm:mb-12">
										<PortfolioList
											metaverse={"sandbox"}
											lands={lands["sandbox"]}
											prices={prices}
											handleSpecificLandData={handleSpecificLandData}
										/>
									</div>
								) : (
									<NoLands />
								)
						)}

						{lands && metaverse === Metaverses.DECENTRALAND && (
							lands["decentraland"]
								? (
									<div key={metaverse} className="mb-8 sm:mb-12">
										<PortfolioList
											metaverse={"decentraland"}
											lands={lands["decentraland"]}
											prices={prices}
											handleSpecificLandData={handleSpecificLandData}
										/>
									</div>
								) : (
									<NoLands />
								)
						)}

						{lands && metaverse === Metaverses.SOMNIUM && (
							lands["somnium-space"]
								? (
									<div key={metaverse} className="mb-8 sm:mb-12">
										<PortfolioList
											metaverse={"somnium-space"}
											lands={lands["somnium-space"]}
											prices={prices}
											handleSpecificLandData={handleSpecificLandData}
										/>
									</div>

								) : (
									<NoLands />
								)
						)}

						{!address && (
							<div className="flex flex-col justify-center items-center mt-28">
								{/* Auth Button */}
								<Image
									src="/images//mgh_logo/mgh_logo.svg"
									width={136}
									height={131}
									loading='lazy'
									objectFit='cover'
								/>
								<p className='text-grey-icon font-light text-2xl pt-6'>Please log in to show your portfolio</p>
								<ConnectButton />
							</div>
						)}

						<div className='mt-60'>
							<Footer
								label='The MGH DAO does not provide, personalized investment recommendations or advisory services. Any information provided through the land evaluation tool and others is not, and should not be, considered as advice of any kind and is for information purposes only. That land is “valuated” does not mean, that it is in any way approved, checked audited, and/or has a real or correct value. In no event shall the MGH DAO be liable for any special, indirect, or consequential damages, or any other damages of any kind, including but not limited to loss of use, loss of profits, or loss of data, arising out of or in any way connected with the use of or inability to use the Service, including without limitation any damages resulting from reliance by you on any information obtained from using the Service.'
							/>
						</div>

						{/* 
            <section className="w-full xs:w-[22rem] sm:w-[26rem] md:w-[48rem] lg:w-full max-w-7xl pt-12 bg-grey-lightest rounded-lg p-8">
            
                <hgroup className="text-gray-200 flex flex-col">
   
                    <div className='mb-8 sm:mb-12'>
                        {externalWallet ? (
                            <>
                                <h1 className="md:text-5xl lg:text-6xl text-4xl green-text-gradient">
                                    Portfolio
                                </h1>
                                <ExternalLink
                                    className="m-auto text-center sm:text-lg md:text-xl"
                                    text={ellipseAddress(
                                        externalWallet as string
                                    )}
                                    href={
                                        isRonin
                                            ? `https://marketplace.axieinfinity.com/profile/${externalWallet}/land/`
                                            : `https://opensea.io/${externalWallet}`
                                    }
                                />
                            </>
                        ) : (
                            <div className="border-t border-l border-white/10 rounded-xl p-5 w-full bg-opacity-30; flex flex-col lg:flex-row justify-between items-center mb-8 bg-grey-dark">
                                <h1 className='md:text-5xl lg:text-6xl text-4xl font-plus text-grey-content'>
                                    Your Portfolio
                                </h1>
                            </div>
                        )}
                    </div>
                    {!externalWallet && !address ? (
                        <div className="w-full flex justify-center">
                            <WalletButton
                                onClick={() => setOpenModal(true)}
                                disconnectWallet={disconnectWallet}
                            />
                        </div>
                    ) : (
                        // Total Lands and Total Worth Container
                        <div className="flex flex-col md:flex-row gap-4 lg:gap-12 md:gap-6 mb-0 sm:mb-12">
                  
                            <div className="flex flex-col w-1/2 justify-between gap-4 text-center transition-all gray-box relative shadowNormal">
                                <h3 className="text-xl md:text-3xl xl:text-4xl font-plus text-grey-content">
                                    Total LANDS Owned
                                </h3>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <p className="text-5xl animate-fade-in-slow text-grey-content mb-2 font-medium">
                                            {totalAssets}
                                        </p>
                                        {externalWallet && (
                                            <div
                                                onClick={seeOwnPortfolio}
                                                className="hover:scale-105 cursor-pointer max-w-max self-center font-medium text-white px-5 py-3 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-green-500/30 transition-all duration-300"
                                            >
                                                <span className="pt-1 text-xl">
                                                    My Portfolio
                                                </span>
                                            </div>
                                        )}
                             
                                        {!externalWallet && address && (
                                            <div className="flex gap-5 justify-end">
                                    
                                                <button
                                                    onClick={copyLink}
                                                    className="relative"
                                                >
                                                    <FiCopy className="w-9 h-9 text-gray-400 relative hover:text-grey-content" />
                                                    {copiedText && (
                                                        <Fade
                                                            direction="bottom-right"
                                                            duration={500}
                                                        >
                                                            <span className="font-medium min-w-max absolute w-fit p-3 pt-4 bg-black/50 backdrop-blur-xl rounded-xl -top-1/2">
                                                                Link Copied!
                                                            </span>
                                                        </Fade>
                                                    )}
                                                </button>
                                         
                                                <button
                                                    onClick={() =>
                                                        window.open(
                                                            socialMedia.twitter
                                                                .portfolioLink
                                                        )
                                                    }
                                                    className=""
                                                >
                                                    <BsTwitter className="text-gray-400 w-9 h-9 hover:text-blue-400" />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                       
                            <div className="flex flex-col w-1/2  transition-all justify-between text-center mb-8 sm:mb-0 gray-box shadowNormal">
                                <h3 className="text-xl md:text-3xl xl:text-4xl mb-4 whitespace-nowrap font-plus text-grey-content">
                                    Total Value Worth
                                </h3>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    totalWorth && (
                                        <PriceList predictions={totalWorth} />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </hgroup>
            </section> */}
					</GeneralSection>
				)
			}
		</>
	)
}

export async function getServerSideProps() {
	const coin = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox%2Cdecentraland%2Caxie-infinity%2Csomnium-space-cubes&vs_currencies=usd'
	)
	const prices: ICoinPrices = await coin.json()

	return {
		props: {
			prices,
		},
	}
}

export default PortfolioPage
