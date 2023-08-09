import React, { useState, useEffect } from 'react';
import questions from '../data/questions';
import { useRouter } from 'next/router';
import PageTitle from '@/components/pageTitle';
import Question from '@/components/question';
import { NextButton } from '@/components/nextButton';
import Head from 'next/head';

const totalQuestionTime = 60;
const totalQuestions = questions.length;
const totalMaxTime = totalQuestionTime * totalQuestions;

const Questions = () => {
  
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [givenAnswers, setGivenAnswers] = useState<
    { question: string; answer: string }[]
  >([]);

  const [totalUsedTime, setTotalUsedTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalQuestionTime);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleSubmitAnswer = () => {
    if (answeredQuestions === totalQuestions) {
      return;
    }

    const correctAnswer = questions[questionIndex].answer;
    setAnsweredQuestions((prevAnswered) => prevAnswered + 1);

    const userAnswer = {
      question: questions[questionIndex].question,
      answer: selectedOption,
    };
    setGivenAnswers((prevAnswers) => [...prevAnswers, userAnswer]);

    const timeUsedForThisQuestion = totalQuestionTime - timeLeft;
    setTotalUsedTime((prevTotalUsedTime) => prevTotalUsedTime + timeUsedForThisQuestion);

    setQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption("");
    setTimeLeft(totalQuestionTime);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
        setTotalUsedTime((prevTotalUsedTime) => prevTotalUsedTime + 1);
      } else {
        handleSubmitAnswer();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (answeredQuestions === totalQuestions) {
      const timeUsedPercentage = (totalUsedTime / totalMaxTime) * 100;

      const correctlyAnswered = givenAnswers.filter(
        (answer) => answer.answer === questions[givenAnswers.indexOf(answer)].answer
      ).length;
      const correctPercentage = (correctlyAnswered / totalQuestions) * 100;

      router.push(
        {
          pathname: "/final",
          query: {
            timeUsedPercentage: timeUsedPercentage.toFixed(0),
            correctlyAnswered,
            correctPercentage: correctPercentage.toFixed(0),
          },
        },
        "/",
        { shallow: true }
      );
    } else if (questionIndex < questions.length) {
      setTimeLeft(totalQuestionTime);
    }
  }, [answeredQuestions, givenAnswers, totalUsedTime]);

  return (
    <div>
      {answeredQuestions === totalQuestions ? (
        <div></div>
      ) : (
        <main className="flex min-h-screen flex-col main py-4 px-6 mx-auto relative overflow-hidden">
          <Head>
            <title>Quiz app</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap"
              rel="stylesheet"
            ></link>
          </Head>

          <PageTitle isSmall={true}></PageTitle>

          <Question
            selectedOption={selectedOption}
            setSelectedOption={handleOptionSelect}
            totalPercentage={(totalUsedTime / totalMaxTime) * 100}
            timePassed={totalUsedTime}
            totalTime={totalMaxTime}
            question={questions[questionIndex]}
            questionIndex={questionIndex}
          />

          <NextButton text="Next" disabled={selectedOption === undefined || selectedOption === null || selectedOption === ''} onClick={handleSubmitAnswer}></NextButton>
        </main>
      )}
    </div>
  );
};

export default Questions;
