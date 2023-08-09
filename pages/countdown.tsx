import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import Head from 'next/head';

const Countdown = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown < 1) {
      setTimeout(() => {
        router.push('/questions', '/');
      }, 1000);
    }
  }, [countdown]);

  return (
    <main className="flex min-h-screen flex-col items-center py-10 px-6 mx-auto relative overflow-hidden bg-[#FE6A67]">
      <Head>
        <title>Quiz app</title>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap" rel="stylesheet" />
      </Head>
      
      <PageTitle isWhite />

      <div className="mb-20 mt-32 text-white text-bold text-4xl margin-auto text-center">Your quiz starts in</div>

      <div onClick={(e) => {countdown < 1 ? router.push("/questions", '/') : false}} className={`cursor-default width-auto text-white ${countdown < 1 ? 'text-7xl px-16 py-20' : 'px-16 py-8 text-9xl'} font-bold rounded-full border-8 leading-none border-white`}>
        { countdown < 1 ? 'GO' : countdown}
      </div>
    </main>
  );
};

export default Countdown;
