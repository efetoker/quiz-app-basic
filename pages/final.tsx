import React from "react";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router
import questions from "../data/questions"; // Import the questions data
import { useRouter } from "next/router";

const FinalPage = () => {
  const router = useRouter();
  const { timeUsedPercentage, correctlyAnswered, correctPercentage } = router.query;

  return (
    <main className="flex min-h-screen flex-col items-center py-2 px-4 mx-auto relative overflow-hidden bg-[#FE6A67]">
      <div className="mb-8 mt-32 text-white text-bold text-2xl margin-auto text-center">Your quiz is finished!</div>

      <div className="mb-8 text-white text-bold text-2xl margin-auto text-center">You answered {correctlyAnswered} out of 5 questions correctly.</div>

      <div className="mb-8 text-white text-bold text-2xl margin-auto text-center">You used {timeUsedPercentage}% of the total time.</div>

      <div className="mb-8 text-white text-bold text-2xl margin-auto text-center">You scored {correctPercentage}%.</div>

      <div className="mb-8 text-white text-bold text-2xl margin-auto text-center">The correct answers were:</div>

      <div className="mb-8 text-white text-bold text-2xl margin-auto text-center">
        {questions.map((question, index) => (
          <div key={index}>
            {question.question} - {question.answer}
          </div>
        ))}
      </div>

      <div className="mb-8 text-white text-bold text-2xl margin-auto text-center">Thanks for playing!</div>
    </main>
  );
};

export default FinalPage;
