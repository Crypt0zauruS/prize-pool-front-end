"use client";
import { Flex, Heading, Card, CardBody, Text } from "@chakra-ui/react";
import { ContributorsProps } from "@/types";
import { formatEther, parseEther } from "viem";

const Contributors = ({ events }: ContributorsProps) => {
  return (
    <>
      <Heading mt="2rem">Contributors</Heading>
      <Flex mt="1rem" direction="column">
        {events.map((event) => {
          return (
            <Card mb=".5rem" key={crypto.randomUUID()}>
              <CardBody>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>{event.contributor}</Text>
                  <Text ml="1rem">
                    {Number(formatEther(BigInt(event.amount))).toFixed(2)} ETH
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </Flex>
    </>
  );
};

export default Contributors;
