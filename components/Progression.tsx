"use client";
import { contractAddress, abi } from "@/constants";
import { ProgressionProps } from "@/types";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Text, Heading, Progress, Spinner } from "@chakra-ui/react";
import { formatEther } from "viem";

const Progression = ({
  isLoading,
  end,
  goal,
  totalCollected,
}: ProgressionProps) => {
  const { address, isConnected } = useAccount();
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading mb="1rem">Progression</Heading>
          <Text mb=".5rem">
            <Text as="span" fontWeight="bold">
              End date:
            </Text>{" "}
            {end}
          </Text>

          <Progress
            colorScheme={
              (parseInt(totalCollected) / parseInt(goal)) * 100 >= 100
                ? "green"
                : "red"
            }
            height="32px"
            value={(parseInt(totalCollected) / parseInt(goal)) * 100}
            hasStripe
          />
          <Text mt=".5rem">
            <Text as="span" fontWeight="bold">
              Goal:
            </Text>{" "}
            {Number(formatEther(BigInt(goal))).toFixed(2)} ETH
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              Total collected:
            </Text>{" "}
            {Number(formatEther(BigInt(totalCollected))).toFixed(2)} ETH | (
            {((parseInt(totalCollected) / parseInt(goal)) * 100).toFixed(2)} %)
          </Text>
        </>
      )}
    </>
  );
};

export default Progression;
