import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import { useRouter } from "next/router";

export default function Questions() {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [givenAnswers, setGivenAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [startTime, setStartTime] = useState(Date.now()); // Record start time

  const handleOptionSelect = (option: any) => {
      setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if(answeredQuestions === 5) {
      return;
    }

    const correctAnswer = questions[questionIndex].answer;
    setAnsweredQuestions((prevAnswered) => prevAnswered + 1);

    setQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption("");
    setTimeLeft(60);

    const userAnswer = { question: questions[questionIndex].question, answer: selectedOption };
    setGivenAnswers((prevAnswers) => [...prevAnswers, userAnswer]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        handleSubmitAnswer();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (answeredQuestions === 5) {
      
    const totalQuestions = 5; // Total number of questions
    const totalQuestionTime = 60; // seconds per question
    const totalMaxTime = totalQuestionTime * totalQuestions; // Total allowed time for all questions

    const endTime = Date.now(); // Record end time
    const timeUsedInSeconds = Math.floor((endTime - startTime) / 1000);
    const timeUsedPercentage = (timeUsedInSeconds / totalMaxTime) * 100;

    const correctlyAnswered = givenAnswers.filter((answer: any) => answer.answer === questions[givenAnswers.indexOf(answer)].answer).length;
    const correctPercentage = (correctlyAnswered / totalQuestions) * 100;

    console.log("Time Used Percentage:", timeUsedPercentage.toFixed(0));
    console.log("Correctly Answered:", correctlyAnswered);
    console.log("Correct Percentage:", correctPercentage.toFixed(0));

    router.push({
      pathname: "/final",
      query: {
        timeUsedPercentage: timeUsedPercentage.toFixed(0),
        correctlyAnswered,
        correctPercentage: correctPercentage.toFixed(0),
      },
    }, "/", { shallow: true });

    } else if (questionIndex < questions.length) {
      setTimeLeft(60);
    }
  }, [answeredQuestions, givenAnswers, startTime]);

  return (
    <div>
        {answeredQuestions === 5 ? (
          <div></div>
        ) : (
        <div>
          <p>{questions[questionIndex].question}</p>
          <ul>
            {questions[questionIndex].options.map((option, index) => (
              <li key={index} onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
          <p>Time left: {timeLeft} seconds</p>
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
        )}
    </div>
  );
};