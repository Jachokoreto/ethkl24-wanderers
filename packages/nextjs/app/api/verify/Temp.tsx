"use server";

import React from "react";
import { IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit";

export const Temp = async (proof: any) => {
  const verifyRes = (await verifyCloudProof(
    proof,
    "app_71da27adf989e8eca4f373dba8c4b36b",
    "register",
    "signal",
  )) as IVerifyResponse;
  return <div>Temp</div>;
};
