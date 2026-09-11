import { Box, Flex, Stack, Text } from "@chakra-ui/react"

/**
 * A diagram of the streak rule, not a readout of anyone's training. Weeks run
 * Monday to Sunday (the product's core rhythm), the target comes from the days
 * marked in availability, and the week counts once the target is met — which
 * is why three of these days are deliberately empty and the week still passes.
 *
 * Empty segments use `track`, never `hair`: an unearned segment must still
 * read as a segment.
 */
// Two letters, not one: "T/T" and "S/S" are a guess, and the product does not
// assume vocabulary — least of all on a diagram explaining its core rule.
const DAYS = [
  { day: "Mo", met: true },
  { day: "Tu", met: false },
  { day: "We", met: true },
  { day: "Th", met: false },
  { day: "Fr", met: true },
  { day: "Sa", met: true },
  { day: "Su", met: false },
]

const TARGET = DAYS.filter((d) => d.met).length

export function WeekStrip() {
  return (
    <Stack gap="gb4">
      <Flex gap="gb2" aria-hidden="true">
        {DAYS.map(({ day, met }, i) => (
          <Stack key={i} gap="gb2" flex="1" align="center">
            <Box w="full" h={{ base: "56px", md: "72px" }} borderRadius="gbSm" bg={met ? "gb.accent" : "gb.track"} />
            <Text fontFamily="mono" fontSize="gbLabel" color={met ? "gb.ink" : "gb.muted"} letterSpacing="0.14em">
              {day}
            </Text>
          </Stack>
        ))}
      </Flex>

      <Text fontSize="gbBodySm" color="gb.muted" maxW="60ch">
        {TARGET} sessions, {DAYS.length - TARGET} rest days, target met. An example of the rule,
        not real training.
      </Text>
    </Stack>
  )
}
