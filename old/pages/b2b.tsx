import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Chatbot from 'react-chatbot-kit'

// Chatbot initials
import { configB2b } from '../lib/chatbot/config-chatbot'
import { ActionProviderB2b } from '../lib/chatbot/ActionProvider'
import MessageParser from '../lib/chatbot/MessageParser'
import web3authService from '../backend/services/Web3authService'
import { useEffect, useState } from 'react'

const B2B: NextPage = () => {
    const [isInit, setIsInit] = useState(false)
    useEffect(() => { console.log(web3authService.getB2Broles) })
    useEffect(() => {
        console.log(isInit, 'IS INIT')
    }, [isInit])
    useEffect(() => {
        console.log(web3authService.getToken, "TOKEN")
        if (!web3authService.getToken) return
        setIsInit(true)
        console.log(web3authService.getB2Broles)
    }, [web3authService.getToken])

    return (
        <>
            <Head>
                <title>Test View</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-screen w-full flex justify-center items-center pt-24">
                <div className="grid grid-cols-2 max-w-7xl min-h-[650px]">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/cyberspace-3.svg"
                            loading="lazy"
                            layout="fill"
                        />
                    </div>
                    <div className="h-full w-full flex flex-col justify-center items-center text-black">
                        <h2 className="text-4xl text-center font-bold">
                            Metaverse Analytics API powered by THE HUB DAO AI
                        </h2>
                        {
                            <div className="py-3 px-14 my-3 nm-flat-soft rounded-2xl mb-10">
                                <p>
                                    Suscription Status:
                                    <span className="font-bold">
                                        {' '}
                                        Active until xx.xx.xxxx
                                    </span>
                                </p>
                            </div>
                        }
                        <Chatbot
                            actionProvider={ActionProviderB2b}
                            messageParser={MessageParser}
                            config={configB2b as any}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default B2B
