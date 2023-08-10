import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import bgPic from '../public/images/bg.png';
import PageTitle from '@/components/pageTitle';
import { Button } from '@/components/button';
import Tick from '@/components/tick';
import Head from 'next/head';
import "../app/globals.css";

const Home = () => {
  const router = useRouter();

  return (
    
    <main className="flex min-h-screen flex-col main py-10 px-6 mx-auto relative overflow-hidden slide-in-bck-center">
      <Image src={bgPic} alt="bg" className="absolute max-w-full h-auto bottom-16 left-8 z-auto" />

      <Head>
        <title>Quiz app</title>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap" rel="stylesheet" />
      </Head>

      <PageTitle />

      <div className="flex flex-col items-center justify-center w-full text-3xl font-bold mt-12 mb-8 z-10">
          Things to know before you start:
        </div>

        <div className="flex flex-col items-start justify-center w-full text-xl font-normal mb-8 z-10">
          <div className="flex flex-row justify-start items-start mb-4">
            <Tick></Tick>
            <div className="ml-3 text-gray-600 font-light leading-tight text-base">In each quiz, you are required to answer 5 questions.</div>
          </div>

          <div className="flex flex-row justify-start items-start mt-3">
            <Tick></Tick>
            <div className="ml-3 text-gray-600 font-light leading-tight text-base">You will have 3 minutes for each question. If you fail to compete a question in given time, your answer will be considered incorrect.</div>
          </div>
        </div>

      <Button text="Let's Get Started" onClick={() => router.push('/countdown', "/")} />
    </main>
  );
}

export default Home;
