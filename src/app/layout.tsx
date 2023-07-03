"use client"

import './global.css';
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Plus_Jakarta_Sans } from 'next/font/google';
import NavbarUI from '../ui/navbar/navbar.ui';
import FontIcons from 'next/font/local';
import ConnectButtonUI from '../ui/connectButton.ui';
import SubHeader from '../ui/subHeader/subHeader.ui';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'block', variable: '--jakarta-font'});
const fontIcons = FontIcons({src: '../../public/fonts/fonts-icons/iconSet01.ttf', display: 'block', variable: '--icons-font'})
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const list = [
	{
		url: "/metaverseexplorer",
		label: "Metaverse explorer",
		icon: "b",
    isExternal: false,
	},
	{
		url: "/stake",
		label: "Stake MGH",
		icon: "d",
    isExternal: false,
	},
	{
		url: "https://snapshot.org/#/metagamehub.eth",
		label: "Governance",
		icon: "a",
    isExternal: true,
	},
];

const subHeaderList = [
  {
    name: "Heatmap",
    route: "metaverseexplorer",
  },
  {
    name: "Portfolio",
    route: "metaverseexplorer/portfolio",
  },
  {
    name: "Watchlist",
    route: "metaverseexplorer/watchlist",
  },
  {
    name: "Analytics",
    route: "metaverseexplorer/analytics",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [banner, setBanner] = useState<boolean>(false);
  const pathname = usePathname()
  const isConnected = false;
  
  useEffect(()=>{
    if(isConnected){
      if(pathname !== '/metaverseexplorer/watchlist' && pathname !==  '/metaverseexplorer/analytics'){
        setBanner(true);
      }else{
        setBanner(false)
      }
    }
  },[pathname, isConnected])

  return (
    <html lang="en" className={`${plusJakarta.variable} ${fontIcons.variable}`}>
      <body className="font-plus text-nm-dm-highlight bg-nm-highlight">
        <div className={`w-full h-screen grid grid-cols-[137px_1fr] ${banner ? 'grid-rows-[300px_1fr]': 'grid-rows-[70px_1fr]'} `}>
          <nav className="bg-nm-gray row-span-2">
            <NavbarUI list={list} route={pathname}/>
          </nav>
          <header className={`${banner ? "bg-[url('/images/land_header.png')]" : ""} mr-12`} >
            <ConnectButtonUI />
          </header>
          <main>
          {pathname !== '/stake' ? <SubHeader optionList={subHeaderList}/> : ""}
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}