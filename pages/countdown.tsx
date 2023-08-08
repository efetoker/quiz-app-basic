import { useEffect, useState } from "react";

const CountdownPage = () => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const [questionIndex, setQuestionIndex] = useState(0); // Index to track the current question

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Decrease countdown by 1 second every second

    // When the countdown reaches 0, move to the next question
    if (countdown === 0) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setCountdown(60); // Reset countdown to 60 seconds for the next question
    }

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div>
      <h1>Countdown Screen</h1>
      <p>Time left: {countdown} seconds</p>
    </div>
  );
};

export default CountdownPage;
