// components/IDKitWidgetComponent.tsx
"use client";

// Ensure this is a client-side component
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// components/IDKitWidgetComponent.tsx

// TODO: Calls your implemented server route
const verifyProof = async (proof: any) => {
  throw new Error("TODO: verify proof server route");
};

// TODO: Functionality after verifying
const onSuccess = () => {
  console.log("Success");
};

const IDKitWidgetComponent = () => {
  return (
    <IDKitWidget
      app_id="app_aa8b6c72e9610fe5ceb2309ae21a7dfb"
      action="testing-action"
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
};

export default IDKitWidgetComponent;
