"use client";
import { Flex, Text, Input, Button, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { contractAddress, abi } from "@/constants";
import { ContributeProps } from "@/types";
import { parseEther } from "viem";
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";

const Contribute = ({ getDatas }: ContributeProps) => {
  const [amount, setAmount] = useState<string>("");
  const toast = useToast();

  const contribute = async () => {
    try {
      let money = parseEther(amount);
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi,
        functionName: "contribute",
        value: money,
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash: hash });
      getDatas();
      toast({
        title: "Congratulations !",
        description: "Your Contribution has been added to the pool",
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
    } finally {
      setAmount("");
    }
  };
  return (
    <>
      <Heading mt="2rem">Contribute</Heading>
      <Flex mt="1rem">
        <Input
          placeholder="Your amount in ETH"
          size="lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button colorScheme="purple" size="lg" onClick={() => contribute()}>
          Contribute
        </Button>
      </Flex>
    </>
  );
};

export default Contribute;
