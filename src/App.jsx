import { Box, Grid, Link, Stack, Text } from "@chakra-ui/react"
import { Masthead } from "./components/Masthead"
import { Bar, Bleed, Section } from "./components/layout"
import { MatchWeights } from "./components/MatchWeights"
import { SignupForm } from "./components/SignupForm"
import { WeekStrip } from "./components/WeekStrip"
import { Wordmark } from "./components/Wordmark"

/**
 * Landing page.
 *
 * The argument is the product's own accountability ladder, in order: the app
 * holds you to your week alone, the week is the unit that makes that humane,
 * a human bud is the upgrade, and none of the numbers are invented. The page
 * follows the same colour arc — lime ("you") until pairing enters, then coral
 * ("your bud") — so the palette carries the positioning rather than decorating
 * it.
 *
 * Every claim below is sourced from PRODUCT.md. There are no users, partners,
 * usage figures or testimonials yet, and this page invents none.
 */
// 54ch, not the 65-75ch the measure rule names: `ch` is the width of "0",
// which in Inter is much wider than its average glyph, so 62ch was rendering
// ~81 real characters per line. Measured, not assumed.
const Body = (props) => <Text fontSize="gbBodyLg" lineHeight="1.55" maxW="54ch" {...props} />
const Aside = (props) => <Text fontSize="gbBody" color="gb.muted" maxW="54ch" {...props} />

export default function App() {
  return (
    <Box>
      <Bar as="header" edge="bottom" py="gb4" position="sticky" top="0" bg="gb.bg" zIndex="1">
        <Wordmark />
        <Link
          href="#early-access"
          fontFamily="mono"
          fontSize="gbLabel"
          fontWeight="500"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="gb.muted"
          _hover={{ color: "gb.ink" }}
        >
          Early access
        </Link>
      </Bar>

      <Bleed as="main" py={{ base: "gb12", md: "gb16" }}>
        {/* The masthead is justified to the full measure, so it owns its own
            row. Signup lives at the foot of the page, not here: the argument
            earns the address rather than asking before it has made one. */}
        <Masthead />

        <Stack gap="gb3" mt={{ base: "gb8", md: "gb10" }} maxW="52ch">
          {/* One of exactly three places the product speaks as "we". See
              Brand Commitments in PRODUCT.md. */}
          <Text
            fontFamily="display"
            fontWeight="700"
            fontSize="gbDisplaySm"
            lineHeight="1.15"
            letterSpacing="-0.01em"
          >
            You train. We hold you accountable
          </Text>
          {/* The manifest's marketing line of record. */}
          <Text fontSize="gbBody" color="gb.muted">
            Hit your weekly target and meet people who show up with you.
          </Text>
          <Link
            href="#early-access"
            mt="gb3"
            w="fit-content"
            fontSize="gbBody"
            fontWeight="600"
            color="gb.accent"
            textDecoration="underline"
            textUnderlineOffset="0.28em"
            textDecorationThickness="2px"
            _hover={{ textDecorationThickness: "3px" }}
          >
            Get on the list
          </Link>
        </Stack>
      </Bleed>

      <Section title="Knowing what to do was never the problem.">
        <Stack gap="gb5">
          <Body>
            The plan was never the hard bit. Tuesday at 7pm is. Nobody notices whether you go.
            GYMBUD does.
          </Body>
          <Aside>
            Starts at "Just starting". No jargon, no assumed reps, nobody making you feel behind.
          </Aside>
        </Stack>
      </Section>

      <Section title="Miss Tuesday. Keep the streak.">
        <Stack gap="gb8">
          <Body>
            Most apps kill your streak the day you rest. Yours counts weeks. Hit your number by
            Sunday and the week is yours.
          </Body>
          <WeekStrip />
          <Aside>
            You set the number, from the days you say you're free.
          </Aside>
        </Stack>
      </Section>

      {/* Signup interrupts here rather than waiting for the foot of the page:
          the streak rule above is the moment the argument actually lands, and
          the closing band is a long way down from it. Deliberately compact, so
          it reads as an aside between sections and does not compete with the
          closing call. */}
      <Bleed as="section" edge="top" py={{ base: "gb10", md: "gb12" }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) minmax(0, 1fr)" }}
          gap={{ base: "gb6", lg: "gb12" }}
          alignItems="start"
        >
          <Text
            fontFamily="display"
            fontWeight="700"
            fontSize="gbDisplaySm"
            lineHeight="1.15"
            letterSpacing="-0.01em"
            maxW="20ch"
          >
            Want your week to work like that?
          </Text>
          <SignupForm source="mid" />
        </Grid>
      </Bleed>

      <Section title="A bud you'll actually meet.">
        <Stack gap="gb8">
          <Body>
            Every match scores out of 100. Sixty of it is what you train and when you're free.
            Anyone who can't make your gym time is just a notification.
          </Body>
          <MatchWeights />
          <Aside>
            Overlap once a week and you'll never meet. GYMBUD shows you nobody instead.
          </Aside>
        </Stack>
      </Section>

      <Section title="No made-up numbers.">
        <Stack gap="gb5">
          <Body>
            Your streak, your rank, your progress: all of it comes from sessions you logged.
            Nothing for just opening the app.
          </Body>
          <Aside>
            Every figure is worked out from your log. It can't drift from what you did.
          </Aside>
        </Stack>
      </Section>

      <Bleed
        as="section"
        id="early-access"
        edge="top"
        py={{ base: "gb16", md: "gb24" }}
        scrollMarginTop="72px"
      >
        <Stack gap="gb8" maxW="560px">
          <Text
            as="h2"
            fontFamily="display"
            fontWeight="700"
            fontSize={{ base: "gbDisplayMd", md: "gbDisplayLg" }}
            lineHeight="1.05"
            letterSpacing="-0.025em"
          >
            Be in for week one.
          </Text>
          <SignupForm source="footer" />
        </Stack>
      </Bleed>

      <Bar as="footer" edge="top" py="gb6">
        <Text fontSize="gbBodySm" color="gb.muted">
          © {new Date().getFullYear()} GYMBUD
        </Text>
        <Text
          fontFamily="mono"
          fontSize="gbLabel"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="gb.muted"
        >
          Coming soon
        </Text>
      </Bar>
    </Box>
  )
}
