"use client";
import Header from "./Header";
import Footer from "./Footer";

import { Flex } from "@chakra-ui/react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      justifyContent="space-between"
      direction="column"
      alignItems="center"
      height="100vh"
    >
      <Header />
      <Flex p="2rem" direction="column" width="100%">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};
