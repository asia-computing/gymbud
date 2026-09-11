import { Box, Flex, Stack, Text } from "@chakra-ui/react"

/**
 * A diagram of how a perk unlocks, not a catalogue of perks.
 *
 * The app's perk cards are earned state: `standing/perkStatus` reads the
 * session log and a locked card says what is still to do ("1 more session").
 * That rule is the claim worth making here, so the cards below carry the
 * requirement and nothing else — no partner names, no offers. There are no
 * partner agreements yet (see Evidence on Hand in PRODUCT.md), and a teaser
 * that pictured one would be inventing it.
 *
 * Lime, not coral: this is the "you" half of the page.
 */
const PERKS = [
  { req: "3 sessions logged", state: "Unlocked", unlocked: true },
  { req: "4-week streak", state: "1 more week", unlocked: false },
]

export function PerkStrip() {
  return (
    <Stack gap="gb4">
      <Flex gap="gb3" direction={{ base: "column", sm: "row" }} aria-hidden="true">
        {PERKS.map(({ req, state, unlocked }) => (
          <Stack
            key={req}
            flex="1"
            gap="gb3"
            px="gb5"
            py="gb4"
            borderRadius="gbLg"
            bg={unlocked ? "gb.accent" : "transparent"}
            color={unlocked ? "gb.accentInk" : "gb.ink"}
            // A locked card must still read as a card, so it carries the
            // track weight rather than a hairline.
            boxShadow={unlocked ? "none" : "inset 0 0 0 1px var(--gb-track)"}
          >
            <Text
              fontFamily="mono"
              fontSize="gbLabel"
              fontWeight="500"
              letterSpacing="0.14em"
              textTransform="uppercase"
              opacity={unlocked ? 0.7 : 1}
              color={unlocked ? "inherit" : "gb.muted"}
            >
              {state}
            </Text>
            <Text fontFamily="display" fontWeight="700" fontSize="gbBodyLg" letterSpacing="-0.01em">
              {req}
            </Text>
          </Stack>
        ))}
      </Flex>

      <Text fontSize="gbBodySm" color="gb.muted" maxW="60ch">
        What a locked perk looks like. It names what is left to do, because the count behind it is
        real.
      </Text>
    </Stack>
  )
}
