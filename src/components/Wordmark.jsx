import { Flex, Text } from "@chakra-ui/react"

/**
 * "Gym·Bud" lockup. The coral half carries the "your bud" half of the accent
 * contract, so it keeps its own colour rather than inheriting the heading's.
 */
export function Wordmark({ size = "xxl" }) {
  const fontSize = size === "xxl" ? "gbDisplayXxl" : "gbDisplayXl"

  return (
    <Flex as="h1" align="baseline" gap="0.08em" lineHeight="0.86">
      <Text
        as="span"
        fontFamily="display"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing="-0.04em"
        css={{ fontVariationSettings: '"opsz" 96' }}
      >
        Gym
      </Text>
      <Text
        as="span"
        fontFamily="display"
        fontWeight="700"
        fontSize={fontSize}
        color="gb.accent2"
        letterSpacing="-0.04em"
        css={{ fontVariationSettings: '"opsz" 96' }}
      >
        Bud
      </Text>
    </Flex>
  )
}
