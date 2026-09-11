import { Flex, Stack, Text } from "@chakra-ui/react"

/**
 * The whole product in three moves, placed last so the closing call is made to
 * someone who already knows what they are signing up to.
 *
 * Deliberately undecorated — no accent fills. The colour arc has already run
 * lime ("you") to coral ("your bud") by this point, and a recap that re-fired
 * either one would restart an argument the page has finished making.
 *
 * Numerals are mono, the same label treatment the day strip uses.
 */
const STEPS = [
  {
    n: "01",
    title: "Mark when you're free",
    body: "The days you mark become your weekly target. Nobody else sets the number.",
  },
  {
    n: "02",
    title: "Log what you did",
    body: "33 activities, from lifting to padel. Your streak, rank and perks are all built from this one list.",
  },
  {
    n: "03",
    title: "Bud up when you want to",
    body: "Train alone as long as you like. A person is the upgrade, never the entry fee.",
  },
]

export function Steps() {
  return (
    <Stack gap="gb8">
      {STEPS.map(({ n, title, body }) => (
        <Flex key={n} gap={{ base: "gb4", md: "gb6" }} align="baseline">
          <Text
            flex="0 0 auto"
            fontFamily="mono"
            fontSize="gbLabel"
            fontWeight="500"
            letterSpacing="0.14em"
            color="gb.muted"
            w="3ch"
          >
            {n}
          </Text>
          <Stack gap="gb1" maxW="46ch">
            <Text fontFamily="display" fontWeight="700" fontSize="gbDisplaySm" lineHeight="1.2" letterSpacing="-0.01em">
              {title}
            </Text>
            <Text fontSize="gbBody" color="gb.muted">
              {body}
            </Text>
          </Stack>
        </Flex>
      ))}
    </Stack>
  )
}
