import React from 'react';

const convertSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};

const Question = ({
  question,
  questionIndex,
  timePassed,
  selectedOption,
  setSelectedOption,
  totalTime,
  totalPercentage,
} : {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  questionIndex: number;
  timePassed: number;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  totalTime: number;
  totalPercentage: number;
}) => {
  const setSelectedOptionCustom = (value: string) => () => {
    setSelectedOption(value);
  };

  return question ? (
    <div>
      <div className="border rounded-xl border-silver px-3 py-8 mt-8 mb-2 text-center">
        <div className="font-semibold text-lg mb-4">
          Question {questionIndex + 1} / 5
        </div>
        <div className="flex flex-row justify-start items-center mb-4">
          <div className="flex flex-col mb-2 flex-shrink-1 text-sm text-gray-500 text-center px-2 font-medium">
            {convertSecondsToMinutes(timePassed)}
          </div>

          <div className="flex flex-col mb-2 flex-grow-1 flex-shrink-0 flex-1 overflow-hidden">
            <div className="w-full bg-[#f1f0f1] rounded-full h-2.5">
              <div
                className="bg-[#374CB7] h-2.5 rounded-full"
                style={{ width: `${totalPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col mb-2 flex-shrink-1 text-sm text-gray-500 text-center px-2 font-medium">
            {convertSecondsToMinutes(totalTime)}
          </div>
        </div>

        <div className="font-semibold text-xl mt-8">{question.question}</div>
      </div>

      {question.options.map((option, index) => (
        <div
          key={index}
          className={`border ${
            selectedOption === option
              ? "border-[#374CB7]"
              : " border-silver"
          }  rounded-xl mb-2 text-center select-none`}
          onClick={setSelectedOptionCustom(option)}
        >
          <div
            className={`flex cursor-pointer flex-row justify-start w-100 py-6 px-6 items-center text-xl ${
              selectedOption === option
                ? " font-normal text-[#374CB7]"
                : " font-light"
            }`}
          >
            <input
              type="radio"
              id={`option-${index}`}
              name="option"
              value={option}
              style={{
                marginRight: "1rem",
                transform: "scale(1.5)",
                border:
                  selectedOption === option
                    ? "4px solid #374CB7"
                    : "none",
                cursor: "pointer",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                background: "#f6f6f6",
                borderRadius: "50%",
                width: "1.25rem",
                height: "1.25rem",
                outline: "none",
              }}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default Question;
