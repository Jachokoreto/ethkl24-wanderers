import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white/70 w-full max-w-xl">{children}</div>;
};
