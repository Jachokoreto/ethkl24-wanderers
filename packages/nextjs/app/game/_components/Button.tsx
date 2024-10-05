import React from "react";

export const Button = ({ text, onClick, className }: { text: string; onClick: () => void; className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-red-300 px-10 py-3 inline-block cursor-pointer rounded-full bg-pink-light text-center text-lg font-serif uppercase transition duration-200 ease-in-out hover:scale-110 border border-3 border-white ${className}`}
    >
      {text}
    </button>
  );
};
