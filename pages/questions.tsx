import { useState } from "react";
import questions from "../data/questions";

const QuestionsPage = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Track the user's selected option
  const [questionIndex, setQuestionIndex] = useState(0); // Index of the current question

  const handleOptionSelect = (option:any) => {
    if (selectedOption === "") {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = questions[questionIndex].answer; // Correct answer for the current question

    if (selectedOption === correctAnswer) {
      // If the answer is correct, move to the next question
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(""); // Clear selected option for the next question
    } else {
      // If the answer is incorrect, stay on the same question
      setSelectedOption(""); // Clear selected option for the same question
    }
  };

  return (
    <div>
      <h1>Question Screen</h1>
      <p>{questions[questionIndex].question}</p>
      <ul>
        {questions[questionIndex].options.map((option, index) => (
          <li key={index} onClick={() => handleOptionSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmitAnswer}>Submit Answer</button>
    </div>
  );
};

export default QuestionsPage;
