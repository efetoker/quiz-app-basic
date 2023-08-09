import React from 'react';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import { AgainButton } from '@/components/againButton';
import CupSvg from '@/components/cup-svg';
import Head from 'next/head';
import { Chart } from "react-google-charts";
import "../app/globals.css";

const FinalPage = () => {
  const router = useRouter();
  const totalQuestions = 5;
  const correctlyAnswered = parseInt(router.query.correctlyAnswered as string);
  const incorrectAnswers = totalQuestions - correctlyAnswered;
  const timeUsedPercentage = parseInt(router.query.timeUsedPercentage as string);

  const data = [
    ["Answered", "Percentage"],
    ["Correctly", correctlyAnswered],
    ["Incorrectly", incorrectAnswers],
  ];

  const data2 = [
    ["Time", "Percentage"],
    ["Used", timeUsedPercentage],
    ["Left", 100 - timeUsedPercentage],
  ];

  return (
    <main className="flex min-h-screen flex-col items-center py-4 px-6 mx-auto relative overflow-hidden bg-[#FE6A67] slide-in-bck-center">
      <Head>
        <title>Quiz app</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      
      <PageTitle isSmall isWhite />

      <div className={`flex flex-col main w-full bg-white rounded-xl px-2 mt-4 mb-4 text-[#1B0330]`}>
        <CupSvg></CupSvg>

        <div className="flex flex-col items-center justify-center w-full text-4xl font-semibold mt-6 z-10 text-center">
          Congratulations!
        </div>

        <div className="flex flex-col items-center justify-center w-full text-2xl font-normal mt-2 z-10 text-center">
          You scored
        </div>

        <div className="flex flex-col items-center justify-center w-full text-5xl font-semibold mt-6 z-10 text-center">
          {router.query.correctlyAnswered} / 5
        </div>  

        <div className="flex flex-col items-center justify-center w-full text-lg font-normal mt-2 z-10 text-center">
          correct answers
        </div>

        <div className="flex flex-row items-center justify-start w-full text-lg font-normal mt-2 z-10 text-center">
          <div className="flex flex-col relative flex-1">
            <Chart
              chartType="PieChart"
              data={data2}
              width={"100%"}
              options={{
                legend: "none",
                pieSliceText: "none",
                pieHole: 0.8,
                colors: ["#364db7", "#f1f0f1"],
                pieStartAngle: -90,
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div style={{padding: '0 30%'}} className="flex flex-col items-center justify-center w-full text-xl font-semibold z-10 text-center">
                %{router.query.timeUsedPercentage}
              </div>

              <div style={{padding: '0 30%'}} className="flex flex-col items-center justify-center w-full text-xs font-light z-10 text-center text-gray-500">
                of total time used
              </div>
            </div>
          </div>
          
          <div className="flex flex-col relative flex-1">
            <Chart
              chartType="PieChart"
              data={data}
              width={"100%"}
              options={{
                legend: "none",
                pieSliceText: "none",
                pieHole: 0.8,
                colors: ["#56c591", "#fe5252"],
                pieStartAngle: -90,
              }}
            /> 

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div style={{padding: '0 30%'}} className="flex flex-col items-center justify-center w-full text-xl font-semibold z-10 text-center">
                %{Math.round((correctlyAnswered / totalQuestions) * 100)}
              </div>

              <div style={{padding: '0 30%'}} className="flex flex-col items-center justify-center w-full text-xs font-light z-10 text-center text-gray-500">
                of answers were correct
              </div>
            </div>
          </div>
        </div>

      </div>

      <AgainButton
        text="Try again"
        disabled={false}
        onClick={() => {
          router.push("/quiz-app");
        }}
      ></AgainButton>
    </main>
  );
};

export default FinalPage;
