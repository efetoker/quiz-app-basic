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

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const Questions = () => {
  const router = useRouter();

  const [randomizedQuestions, setRandomizedQuestions] = useState(questions);
  const [selectedOption, setSelectedOption] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const [givenAnswers, setGivenAnswers] = useState<{ question: string; answer: string }[]>([]);

  const [totalUsedTime, setTotalUsedTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(totalQuestionTime);

  const handleOptionSelect = (value: any) => {
    setSelectedOption(value);
  };

  const handleSubmitAnswer = () => {
    const userAnswer = {
      question: randomizedQuestions[questionIndex].question,
      answer: selectedOption,
    };

    setAnsweredQuestions((prevAnswered) => prevAnswered + 1);
    setGivenAnswers((prevAnswers) => [...prevAnswers, userAnswer]);

    const timeUsedForThisQuestion = totalQuestionTime - timeLeft;
    setTotalUsedTime((prevTotalUsedTime) => prevTotalUsedTime + timeUsedForThisQuestion);

    setQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption("");
    setTimeLeft(totalQuestionTime);
  };

  const handleTimerTick = () => {
    if (timeLeft > 0) {
      setTimeLeft((prevTime) => prevTime - 1);
      setTotalUsedTime((prevTotalUsedTime) => prevTotalUsedTime + 1);
    } else {
      if (selectedOption !== "") {
        handleSubmitAnswer();
      } else {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(totalQuestionTime);
      }
    }
  };

  useEffect(() => {
    if (answeredQuestions === totalQuestions) {
      const timeUsedPercentage = (totalUsedTime / totalMaxTime) * 100;
      let correctlyAnswered = 0;
      givenAnswers.forEach((answer) => {
        const question: any = randomizedQuestions.find((question) => question.question === answer.question);
        if (question.answer === answer.answer) {
          correctlyAnswered++;
        }
      });

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
    } else if (questionIndex < totalQuestions) {
      setTimeLeft(totalQuestionTime);
    }
  }, [answeredQuestions, questionIndex, givenAnswers, totalUsedTime]);

  useEffect(() => {
    const timer = setInterval(handleTimerTick, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, questionIndex]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...questions]);
    setQuestionIndex(0);
    setSelectedOption("");
    setAnsweredQuestions(0);
    setGivenAnswers([]);
    setTotalUsedTime(0);
    setTimeLeft(totalQuestionTime);
    
    setRandomizedQuestions(shuffledQuestions);
  }, []);

  const currentQuestion = randomizedQuestions[questionIndex];

  return (
    <main className="flex min-h-screen flex-col main py-4 px-6 mx-auto relative overflow-hidden slide-in-bck-center">
      {questionIndex < totalQuestions && (
        <div>
          <Head>
            <title>Quiz app</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500;700&display=swap"
              rel="stylesheet"
            />
          </Head>

          <PageTitle isSmall={true} />

          <Question
            selectedOption={selectedOption}
            setSelectedOption={handleOptionSelect}
            totalPercentage={(totalUsedTime / totalMaxTime) * 100}
            timePassed={totalUsedTime}
            totalTime={totalMaxTime}
            question={currentQuestion}
            questionIndex={questionIndex}
          />

          <NextButton
            text="Next"
            disabled={!selectedOption}
            onClick={handleSubmitAnswer}
          />
        </div>
      )}
    </main>
  );
};

export default Questions;
