import "animate.css";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Components
const ConnectButton = dynamic(() => import('../components/ConnectButton'), { ssr: false })
import ScrollBar from "../components/ScrollBar";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
	children: React.ReactNode;
}

const list = [
	{
		url: "/valuation",
		label: "LAND Valuation",
		icon: "b",
	},
	{
		url: "/nftValuation",
		label: "NFT Valuation",
		icon: "c",
	},
	{
		url: "/swap",
		label: "Buy MGH",
		icon: "h",
	},
	{
		url: "/liquidity",
		label: "Provide Liquidity",
		icon: "f",
	},
	{
		url: "/stake",
		label: "Stake MGH",
		icon: "d",
	},
	{
		url: "https://snapshot.org/#/metagamehub.eth",
		label: "Governance",
		icon: "a",
	},
	{
		url: "/mlm",
		label: "Metaverse Loyalty System",
		icon: "i",
	},
	{
		/* url: "https://avatar-generator-metagamehub.vercel.app/?campaign=decentraland", */
		url: '/avatar',
		label: "Avatar Generator",
		icon: "g",
	},
];

export default function Layout({ children }: LayoutProps) {
	// Scrollbar Controller
	const parentRef = useRef<HTMLDivElement>(null)
	const [parentDom, setParentDom] = useState<HTMLDivElement | null>(null)

	useEffect(() => {
		setParentDom(parentRef.current)
		//console.log(parentRef)
	}, [parentRef.current])

	return (
		<div className="font-plus text-grey-content w-full h-screen overflow-y-scroll hidescroll" ref={parentRef}>
			<head><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta></head>
			
			{/* Page wrapper */}
			<main className="w-full min-h-screen pl-32 relative">
				<div className="absolute top-0 right-0 z-50">
					<ConnectButton />
				</div>
				<div >
					{children}
				</div>
			</main>

			{/* Sidebar wrapper */}
			<div className="fixed inset-0 w-32 overflow-hidden">
				<Sidebar list={list} />
			</div>
			{parentDom && <ScrollBar parentDom={parentDom} />}
		</div>
	);
}
