import React from 'react';

interface ButtonProps {
    text: string;
    disabled: boolean;
    onClick: () => void;
}

export const AgainButton: React.FC<ButtonProps> = ({ text, disabled, onClick }) => {
    return (
        <div className="flex main flex-col w-full mx-auto">
            <button
                className="z-0 bg-[#374CB7] font-light text-white py-4 px-8 rounded-xl w-full disabled:bg-[#9e9e9e]"
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </div>
    );
}
