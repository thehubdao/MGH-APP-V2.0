import { NextPage } from "next"
import Head from "next/head"
import { Loader } from "../components";

const Test: NextPage = () => {
  return (
    <>
      <Head>
        <title>Test View</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-full flex justify-center items-center pt-24">
        <p className="font-light">Texto de prueba</p>
      </div>
    </>
  )
}

export default Test