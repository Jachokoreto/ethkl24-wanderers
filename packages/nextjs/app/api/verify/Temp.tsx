"use server";

import React from "react";
import { IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit";

export const Temp = async (proof: any) => {
  const verifyRes = (await verifyCloudProof(
    proof,
    "app_staging_dcca90fc66daec268357344dd2fd8c2a",
    "register",
    "signal",
  )) as IVerifyResponse;
  return <div>Temp</div>;
};
