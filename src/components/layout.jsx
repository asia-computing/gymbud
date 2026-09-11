import { Box, Flex, Grid, Heading } from "@chakra-ui/react"

/**
 * Page frame primitives.
 *
 * Every band is full-bleed — backgrounds and hairlines run edge to edge —
 * while its contents sit on one shared measure. That relationship is what
 * separates a page from a phone screen centred in a void, so it lives in one
 * place rather than being re-specified per section.
 */
const PAGE_X = { base: "gb5", md: "gb8", xl: "gb12" }
const MEASURE = "1240px"

export function Bleed({ children, edge, inner, ...rest }) {
  const line = { top: "borderTopWidth", bottom: "borderBottomWidth" }[edge]

  return (
    <Box w="full" borderColor="gb.hair" {...(line ? { [line]: "1px" } : {})} px={PAGE_X} {...rest}>
      <Box w="full" maxW={MEASURE} mx="auto" {...inner}>
        {children}
      </Box>
    </Box>
  )
}

/** Nav and footer: a single horizontal row on the shared measure. */
export function Bar({ children, ...rest }) {
  return (
    <Bleed inner={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "gb5" }} {...rest}>
      {children}
    </Bleed>
  )
}

/**
 * A content band: heading in the left column, argument in the right.
 * Editorial two-column, not a grid of equal cards — the sections are not
 * equivalent to each other and should not be framed as if they were.
 */
export function Section({ title, id, children, ...rest }) {
  return (
    <Bleed as="section" id={id} edge="top" py={{ base: "gb16", md: "gb20", lg: "gb24" }} {...rest}>
      <Grid
        templateColumns={{ base: "1fr", lg: "minmax(0, 0.85fr) minmax(0, 1.15fr)" }}
        gap={{ base: "gb8", lg: "gb16" }}
      >
        <Heading
          as="h2"
          fontFamily="display"
          fontWeight="700"
          fontSize={{ base: "gbDisplayMd", md: "gbDisplayLg" }}
          lineHeight="1.05"
          letterSpacing="-0.025em"
          m="0"
          maxW="14ch"
        >
          {title}
        </Heading>
        <Box>{children}</Box>
      </Grid>
    </Bleed>
  )
}
