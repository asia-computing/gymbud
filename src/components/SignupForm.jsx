import { useId, useState } from "react"
import { Box, Button, Field, Flex, Input, Stack, Text } from "@chakra-ui/react"
import { isValidEmail, submitSignup } from "../services/signup"

const IDLE = "idle"
const SUBMITTING = "submitting"
const DONE = "done"

/**
 * Email capture for the teaser page.
 *
 * Owns only presentation and validation state — where the address ends up is
 * the signup service's business (see `services/signup.js`).
 */
export function SignupForm({ source = "teaser" }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(IDLE)
  const [error, setError] = useState("")
  const fieldId = useId()

  const invalid = Boolean(error)

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (!isValidEmail(email)) {
      setError(
        email.trim() ? "That email doesn't look right." : "We'll need an email address.",
      )
      return
    }

    setStatus(SUBMITTING)
    try {
      await submitSignup({ email, source })
      setStatus(DONE)
    } catch (err) {
      setStatus(IDLE)
      setError(err.message)
    }
  }

  if (status === DONE) {
    return (
      <Stack
        gap="gb2"
        align="center"
        textAlign="center"
        bg="gb.accentSoft"
        borderRadius="gbLg"
        px="gb6"
        py="gb5"
        maxW="480px"
        w="full"
        role="status"
      >
        <Text
          fontFamily="mono"
          fontSize="gbLabel"
          fontWeight="500"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="gb.muted"
        >
          You're on the list
        </Text>
        <Text fontFamily="display" fontWeight="700" fontSize="gbDisplaySm" letterSpacing="-0.01em">
          See you at the gym.
        </Text>
        <Text fontSize="gbBodySm" color="gb.muted">
          We'll email {email.trim().toLowerCase()} the moment GYMBUD opens up.
        </Text>
      </Stack>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="480px" noValidate>
      <Field.Root invalid={invalid} gap="gb2">
        <Field.Label
          htmlFor={fieldId}
          fontFamily="mono"
          fontSize="gbLabel"
          fontWeight="500"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="gb.muted"
        >
          Get early access
        </Field.Label>

        <Flex
          gap="gb2"
          w="full"
          direction={{ base: "column", sm: "row" }}
          align={{ base: "stretch", sm: "center" }}
        >
          <Input
            id={fieldId}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="email@domain.com"
            value={email}
            // Only grow on the row layout — `flex: 1` in a column would set
            // flex-basis on the height and collapse the 56 px input.
            flex={{ base: "0 0 auto", sm: "1" }}
            w="full"
            onChange={(event) => {
              setEmail(event.target.value)
              if (error) setError("")
            }}
          />
          <Button
            type="submit"
            variant="accent"
            flexShrink="0"
            loading={status === SUBMITTING}
          >
            Bud up
          </Button>
        </Flex>

        {invalid ? (
          <Field.ErrorText fontSize="gbBodySm" color="gb.danger">
            {error}
          </Field.ErrorText>
        ) : (
          <Field.HelperText fontSize="gbBodySm" color="gb.muted">
            One email at launch. No spam, no sharing.
          </Field.HelperText>
        )}
      </Field.Root>
    </Box>
  )
}
