import PageTitle from "@/components/pageTitle"
import { Metadata } from "next"
import Head from "next/head"
import "../app/globals.css";
import Image from 'next/image'
import bgPic from '../public/images/bg.png'

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'A quiz app built with Next.js',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col main py-10 px-6 mx-auto relative overflow-hidden">
        <Head>
          <title>Quiz app</title>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap" rel="stylesheet"></link>
        </Head>

        <PageTitle></PageTitle>

        <div className="flex flex-col items-center justify-center w-full text-4xl font-bold mt-20 mb-8 z-10">
          Things to know before you start:
        </div>

        <Image src={bgPic} alt="bg" className="w-full h-full absolute max-w-full h-auto bottom-40 left-8 z-auto" />

    </main>
  )
}