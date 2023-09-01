"use client"

import { useAppSelector } from "../../state/hooks";
import IsLoginUI from "../../ui/common/isLogin.ui";
import PortfolioUI from "../../ui/portfolio/portfolio.ui";

export default function PortfolioComponent() {
  const isConnected = useAppSelector(state => state.login.connected);
  const portfolio = useAppSelector(state=> state.portfolio);
  
  return (
    <>
      {!isConnected ?
        <IsLoginUI message="Please log in to show your portfolio" />
        :
        <>
        {
          portfolio.list !== undefined ? <PortfolioUI allLands={portfolio.list} landsOwned={portfolio.length ?? 0}/> 
          :
          <p>Loading...</p>
        }
        </>
      }
    </>
  )
}