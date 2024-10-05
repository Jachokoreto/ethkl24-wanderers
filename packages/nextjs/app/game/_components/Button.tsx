import React from "react";

export const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="inline-block cursor-pointer rounded-full bg-gradient-to-tr from-red-300 to-red-200 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:scale-110 border border-3 border-white"
    >
      {text}
    </button>
  );
};
