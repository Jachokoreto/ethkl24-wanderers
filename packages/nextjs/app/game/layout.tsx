import React from "react";
import { Jost } from "next/font/google";
import { Provider } from "./_components/Provider";
import "@rainbow-me/rainbowkit/styles.css";
import "~~/styles/globals.css";


const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export const jost = Jost({
  display: "swap",
  variable: "--font-jost",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <div
            className={`flex items-center flex-col flex-grow pt-10 gap-y-4 bg-red-50 h-screen ${jost.variable} font-sans bg-gray-700`}
          >
            {/* <div className="bg-white/80  rounded-full pt-4 pb-3 px-10">
            <h1>💋 De Dating Sims 🎮</h1>
          </div> */}
            {/* <ThemeProvider enableSystem> */}

            {children}
            {/* </ThemeProvider> */}
          </div>
        </Provider>
      </body>
    </html>
  );
}
