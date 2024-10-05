"use client";

// import { IVerifyResponse } from "@worldcoin/idkit-core";
import { verifyCloudProof } from "@worldcoin/idkit-core/backend";

export async function GET(req: Request) {
  return new Response("Success!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  // return new Response("Success!", {
  //   status: 200,
  // });
  const proof = await req.json();
  // // const app_id = process.env.APP_ID;
  // // const action = process.env.ACTION_ID;
  const verifyRes = await verifyCloudProof(proof, "app_staging_dcca90fc66daec268357344dd2fd8c2a", "register", "");
  // const verifyRes = await fetch("https://developer.worldcoin.org/api/v2/verify/app_staging_dcca90fc66daec268357344dd2fd8c2a", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     nullifier_hash: nullifier_hash,
  //     merkle_root: merkle_root,
  //     proof: proof,
  //     verification_level: "device",
  //     action: "register",
  //     signal_hash: "",
  //   }),
  // });
  // const verifyRes = { success: true };

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    return new Response("Success!", {
      status: 200,
    });
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    return new Response(`${verifyRes}`, {
      status: 400,
    });
  }
}
