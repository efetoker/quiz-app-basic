import React from "react";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router
import questions from "../data/questions"; // Import the questions data
import { useRouter } from "next/router";
import Head from "next/head";
import PageTitle from "@/components/pageTitle";
import { AgainButton } from "@/components/againButton";
import cupPic from '../public/images/cup.png'
import Image from "next/image";

const FinalPage = () => {
  const router = useRouter();
  const { timeUsedPercentage, correctlyAnswered, correctPercentage } = router.query;

  return (
    <main className="flex min-h-screen flex-col items-center py-4 px-6 mx-auto relative overflow-hidden bg-[#FE6A67]">
      <Head>
        <title>Quiz app</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <PageTitle isSmall={true} isWhite={true}></PageTitle>  

      <div className={`flex flex-col main w-full flex-grow flex-1 bg-white rounded-xl px-8 pt-12 pb-4 my-4`}>

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
