import axios from "axios";

export const getNftsOwned = async (
  public_key: string,
  page: number = 1,
  size: number = 18
) => {
  try {
    let url = `https://jetpack-web3-wallet-backend.onrender.com/wallet/get-sol-nfts`;

    const response = await axios.get(url, { params: { public_key } });
    return response;
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
};
