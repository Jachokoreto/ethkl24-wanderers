// pages/page.tsx
import dynamic from "next/dynamic";

// Dynamically import the client-side component
const IDKitWidgetComponent = dynamic(() => import("./IDKitWidgetComponent"), { ssr: false });

const Page = () => {
  return (
    <div>
      <h1>Welcome to the Verification Page</h1>
      <IDKitWidgetComponent />
    </div>
  );
};

export default Page;
