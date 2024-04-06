"use client";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { readContract, watchContractEvent } from "@wagmi/core";
import { contractAddress, abi } from "@/constants";
import { Contributor } from "@/types/";
import { parseAbiItem, Log } from "viem";
import Contribute from "./Contribute";
import Progression from "./Progression";
import Contributors from "./Contributors";
import Refund from "./Refund";

const Pool = () => {
  const client = usePublicClient();
  const { address, isConnected } = useAccount();
  const [end, setEnd] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [totalCollected, setTotalCollected] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Contributor[]>([]);

  const getDatas = async () => {
    if (isConnected) {
      setIsLoading(true);
      let data: any = await readContract({
        address: contractAddress,
        abi,
        functionName: "end",
      });
      // date
      let date = new Date(parseInt(data as string) * 1000);
      let day = date.getDate();
      let month = date.getMonth() + 1; // Because January is 0!
      let year = date.getFullYear();
      let endDate: string = day + "/" + month + "/" + year;
      setEnd(endDate);
      //goal
      data = await readContract({
        address: contractAddress,
        abi,
        functionName: "goal",
      });
      setGoal(data.toString());
      //totalCollected
      data = await readContract({
        address: contractAddress,
        abi,
        functionName: "totalCollected",
      });
      setTotalCollected(data.toString());
      //events
      const ContributeLogs = await client.getLogs({
        address: contractAddress,
        event: parseAbiItem(
          "event Contribute(address indexed contributor, uint256 amount)"
        ),
        fromBlock: 0n,
        toBlock: "latest",
      });
      setEvents(
        ContributeLogs.map((log) => ({
          contributor: log.args.contributor as string,
          amount: (log.args.amount as bigint).toString(),
        }))
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDatas();
  }, [address]);
  return (
    <>
      {isConnected ? (
        <>
          <Progression
            isLoading={isLoading}
            end={end}
            goal={goal}
            totalCollected={totalCollected}
          />
          <Contribute getDatas={getDatas} />
          <Refund
            getDatas={getDatas}
            end={end}
            goal={goal}
            totalCollected={totalCollected}
          />
          <Contributors events={events} />
        </>
      ) : (
        <>
          <Alert status="warning">
            <AlertIcon />
            Please connect your wallet
          </Alert>
        </>
      )}
    </>
  );
};

export default Pool;
