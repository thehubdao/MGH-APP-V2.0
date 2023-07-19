import { useRouter } from 'next/router'
import { useAccount, useConnect } from 'wagmi'

import Button from "./Button"

const Greeting = (props: any) => {
  const { connect, connectors } = useConnect()
  const { address } = useAccount()
  const router = useRouter()

  const handleNextStep = () => {
    if (address) props.actionProvider.EjectPlanExplanation(address)
  }

  const handleLogin = async () => { connect({ connector: connectors[0] }) }

  const handleSetupWallet = () => {
    window.open('https://metamask.io/', '_blank')
  }

  const handleGoBack = () => {
    confirm('Sure?') ? router.push("/valuation") : ''
  }

  return (
    <div className="text-center mt-4">
      <p className="font-bold text-2xl">Welcome to the MGH DAO valuation services API</p>
      <p className="text-sm">This API allows you to access all the endpoints related to our valuation services</p>
      <p className="text-sm py-3 mt-40 rounded-xl border border-grey-content">To continue please connect your web3 wallet</p>
      <div className="flex w-full justify-center gap-2 mt-4">
        {
          address ? (
            <Button label={`You Are connected with ${address}`} onClick={handleNextStep} />
          ) : (
            <>
              <Button label={'Login'} icon={'/images/icons/chatbot/clarity-wallet-solid.svg'} onClick={handleLogin} />
              <Button label={'Setup Wallet'} icon={'/images/icons/chatbot/gear-fill.svg'} onClick={handleSetupWallet} />
            </>
          )
        }
        <Button label={'Go back'} icon={'/images/icons/chatbot/arrow-back.svg'} onClick={handleGoBack} />
      </div>
    </div>
  )
}

export default Greeting