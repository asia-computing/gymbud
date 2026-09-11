import { Box, Flex, Stack, Text } from "@chakra-ui/react"

/**
 * The real matching weights, out of 100 (see Positioning in PRODUCT.md).
 * Published rather than described: a competitor can copy "we match you on
 * your schedule", but the specific ordering is the claim.
 *
 * Coral throughout — this is the "your bud" half of the page.
 * Numerals are mono: this is measurement, the one thing mono is for.
 */
const WEIGHTS = [
  { label: "Shared activities", value: 32 },
  { label: "Overlapping availability", value: 28 },
  { label: "Same gym", value: 14 },
  { label: "Fitness level", value: 12 },
  { label: "Spoken language", value: 8 },
  { label: "What you're after", value: 6 },
]

const MAX = Math.max(...WEIGHTS.map((w) => w.value))

export function MatchWeights() {
  return (
    <Stack gap="gb3">
      {WEIGHTS.map(({ label, value }) => (
        <Flex key={label} align="center" gap="gb4">
          <Text flex="0 0 auto" w={{ base: "128px", sm: "180px" }} fontSize="gbBodySm">
            {label}
          </Text>
          <Box flex="1" h="10px" borderRadius="gbPill" bg="gb.track" overflow="hidden">
            <Box h="full" w={`${(value / MAX) * 100}%`} borderRadius="gbPill" bg="gb.accent2" />
          </Box>
          <Text flex="0 0 auto" fontFamily="mono" fontSize="gbBodySm" color="gb.accent2Text" w="3ch" textAlign="right">
            {value}
          </Text>
        </Flex>
      ))}
    </Stack>
  )
}
