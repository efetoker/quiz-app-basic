import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import { AgainButton } from '@/components/againButton';
import CupSvg from '@/components/cup-svg';
import Head from 'next/head';

const FinalPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center py-4 px-6 mx-auto relative overflow-hidden bg-[#FE6A67]">
      <Head>
        <title>Quiz app</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      
      <PageTitle isSmall isWhite />

      <div className={`flex flex-col main w-full flex-grow flex-1 bg-white rounded-xl px-8 pt-16 pb-4 my-4 text-[#1B0330]`}>
        <CupSvg></CupSvg>

        <div className="flex flex-col items-center justify-center w-full text-4xl font-semibold mt-8 z-10 text-center">
          Congratulations!
        </div>

        <div className="flex flex-col items-center justify-center w-full text-2xl font-normal mt-2 z-10 text-center">
          You scored
        </div>

        <div className="flex flex-col items-center justify-center w-full text-5xl font-semibold mt-8 z-10 text-center">
          {router.query.correctlyAnswered} / 5
        </div>  

        <div className="flex flex-col items-center justify-center w-full text-lg font-normal mt-2 mb-8 z-10 text-center">
          correct answers
        </div>
      </div>

      <AgainButton
        text="Try again"
        disabled={false}
        onClick={() => {
          router.push("/");
        }}
      ></AgainButton>
    </main>
  );
};

export default FinalPage;
