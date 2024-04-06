"use client";
import { RefundProps } from "@/types";
import { Flex, Heading, Button, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { contractAddress, abi } from "@/constants";
import { parseEther } from "viem";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { parse } from "path";

const Refund = ({ getDatas, end, goal, totalCollected }: RefundProps) => {
  const toast = useToast();
  const refund = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi,
        functionName: "refund",
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash: hash });
      getDatas();
      toast({
        title: "OK !",
        description: "Your have been refunded",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: `An error occured: ${(e as Error).message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Heading mt="2rem">Refund</Heading>
      <Flex mt="1rem">
        {totalCollected < goal &&
        Math.floor(Date.now() / 1000) > parseInt(end) ? (
          <Button
            colorScheme="red"
            size="lg"
            width="100%"
            onClick={() => refund()}
          >
            Refund
          </Button>
        ) : (
          <Text color="red">Refund is not available</Text>
        )}
      </Flex>
    </>
  );
};

export default Refund;
