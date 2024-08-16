"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NftLoader from "@/components/NftLoader";
import Image from "next/image";
import { useMemo, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SpiralGalleryView } from "@/components/SpiralGalleryView";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [view_3d, setView3D] = useState(false);
  const [wallet, setWallet] = useState("");
  const [nft_list, setNftList] = useState([]);
  //AP2jT5sV4k3oQ9d7CVsHBJgc5c53bvYQF2iZ9YgEFssC
  //3mmRhnnopopvxwdtshM5JG75zByqmrt36LPXv91J1uM9
  //A83m96AktczTNaHbDDTLcWEpbo3dtgy6pwHcMqMrEaEJ

  const onSubmitClick = async () => {
    setLoading(true);
    const res = await fetch(`/api/fetch-nfts?wallet=${wallet}`);
    const response = await res?.json();
    if (response && response?.length) {
      setNftList(response || []);
    }
    setLoading(false);
  };

  const image_urls = useMemo(() => {
    let result = [];
    nft_list?.forEach((nft) => {
      if (nft?.image_uri) {
        result.push(nft?.image_uri);
      }
    });
    return result;
  }, [nft_list]);

  const renderNormalPage = () => {
    return (
      <>
        <p className="text-4xl font-extrabold mb-4">Solana NFT Viewer</p>
        <div className="w-full">
          <form className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter solana wallet address"
              className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={wallet}
              onChange={(e) => setWallet(e?.target?.value)}
              disabled={loading}
            />
            <Button
              type="button"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onSubmitClick}
              disabled={loading}
            >
              Submit
            </Button>
            {/* <Button
              type="button"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setView3D}
              disabled={loading}
            >
              Show In 3D
            </Button> */}
          </form>
        </div>
        <div className="py-4 nft-container">
          {loading ? <NftLoader /> : null}

          {nft_list?.length && !loading ? (
            <>
              {nft_list?.map((nft) => {
                if (!nft?.image_uri) return null;
                return (
                  <TooltipProvider>
                    <Tooltip delayDuration={300} asChild>
                      <TooltipTrigger asChild>
                        <Image
                          src={nft?.image_uri}
                          alt=""
                          width={300}
                          height={300}
                          className="rounded-md object-cover w-full max-h-[300px] min-h-[300px]"
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div>
                          <p className="text-sm">{nft?.name}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </>
          ) : null}
          {/* {nft_list?.length && !loading ? (
          <>
            {nft_list?.map((nft) => {
              if (!nft?.image_uri) return null;
              return (
                <Image
                  src={nft?.image_uri}
                  alt=""
                  width={300}
                  height={300}
                  className="rounded-md object-cover w-full max-h-[300px] min-h-[300px]"
                />
              );
            })}
          </>
        ) : null} */}
        </div>
      </>
    );
  };

  const render3Dgallery = () => {
    return <SpiralGalleryView imageData={image_urls}></SpiralGalleryView>;
  };

  return (
    <>
      {view_3d && false ? (
        <div className="gallery-view-container">{render3Dgallery()}</div>
      ) : (
        <main className="flex min-h-screen flex-col items-center max-w-6xl p-24 mx-auto">
          {renderNormalPage()}
        </main>
      )}
    </>
  );
}
