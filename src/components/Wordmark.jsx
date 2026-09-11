import { Text } from "@chakra-ui/react"

/**
 * The small "GYMBUD" mark — the app's own screen-header treatment
 * (`SignInScreen` in the app's `src/screens/screens.jsx`): display face,
 * 800, 22 px, -0.02em. Set in ink, not accent; the lime belongs to the
 * "Bud" of the headline.
 */
export function Wordmark() {
  return (
    <Text
      as="span"
      fontFamily="display"
      fontWeight="800"
      fontSize="22px"
      letterSpacing="-0.02em"
      css={{ fontVariationSettings: '"opsz" 32' }}
    >
      GYMBUD
    </Text>
  )
}
