import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const url = new URL(req?.url);

  const searchParams = new URLSearchParams(url.searchParams);
  try {
    let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=mainnet-beta&address=${searchParams.get(
      "wallet"
    )}`;

    const response = await axios.get(nftUrl, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SHYFT_API_KEY,
      },
    });
    return NextResponse.json(response?.data?.result || [], { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
