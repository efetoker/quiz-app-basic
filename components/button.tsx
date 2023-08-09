import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <div className="flex flex-col w-full py-10 px-6 mx-auto absolute left-0 bottom-0">
            <button
                className="z-0 bg-[#FE6A67] font-light text-white py-4 px-8 rounded-xl w-full"
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
