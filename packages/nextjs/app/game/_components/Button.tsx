import React from "react";

export const Button = ({ text, onClick, className }: { text: string; onClick: () => void; className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-red-300 px-6 py-3 inline-block cursor-pointer rounded-full bg-pink-light text-center uppercase transition duration-200 ease-in-out hover:scale-110 border border-3 border-white ${className}`}
    >
      {text}
    </button>
  );
};
