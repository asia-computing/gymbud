import { Flex, Stack, Text } from "@chakra-ui/react"
import { SignupForm } from "./components/SignupForm"
import { Wordmark } from "./components/Wordmark"

export default function App() {
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      minH="100dvh"
      px={{ base: "gb6", md: "gb12" }}
      py={{ base: "gb10", md: "gb12" }}
    >
      <Stack as="header" align="center" gap="gb8" mt="5vh">
        <Wordmark />
        <Text
          as="h2"
          fontFamily="mono"
          fontSize="gbLabelXl"
          fontWeight="500"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="gb.muted"
        >
          Training · Paired
        </Text>
      </Stack>

      <Stack align="center" gap="gb8" mt="auto" pt="gb12" w="full">
        <Text
          fontFamily="display"
          fontWeight="700"
          fontSize="gbDisplayLg"
          letterSpacing="-0.025em"
          textAlign="center"
        >
          Coming soon
        </Text>
        <SignupForm />
      </Stack>

      <Text fontSize="gbBodySm" color="gb.muted" mt="auto" pt="gb10">
        © {new Date().getFullYear()} GYMBUD
      </Text>
    </Flex>
  )
}
