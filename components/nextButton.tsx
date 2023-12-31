import React from 'react';

interface ButtonProps {
    text: string;
    disabled: boolean;
    onClick: () => void;
}

export const NextButton: React.FC<ButtonProps> = ({ text, disabled, onClick }) => {
    return (
        <div className="flex select-none flex-col w-full py-4 px-6 mx-auto absolute left-0 bottom-0">
            <button
                className="z-0 bg-[#FE6A67] font-light text-white py-4 px-8 rounded-xl w-full disabled:bg-[#9e9e9e]"
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </div>
    );
}
