import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Box, Heading } from "@chakra-ui/react"

/**
 * The product's first-contact copy of record, set as a single justified line:
 * "Your training Bud" is measured and scaled to the container's exact width,
 * so it sits flush to both edges and is sized by the screen rather than by a
 * token.
 *
 * One line, not the app's three — the app stacks because a phone is narrow.
 * A page is wide, and stacking it here made the type absurdly large.
 *
 * "Your", not "Find your" — the app IS the bud. A human partner is the
 * upgrade, not the entry condition. See Product Purpose in PRODUCT.md.
 */
const LABEL = "Your training Bud"

export function Masthead() {
  const boxRef = useRef(null)
  const lineRef = useRef(null)
  const [size, setSize] = useState(null)

  const fit = useCallback(() => {
    const box = boxRef.current
    const line = lineRef.current
    if (!box || !line) return

    const width = box.clientWidth
    const natural = line.getBoundingClientRect().width
    if (!width || !natural) return

    // Rendered width scales linearly with font size (tracking is em-based), so
    // one measurement gives the size that fills the box exactly.
    const current = parseFloat(getComputedStyle(line).fontSize)
    setSize((width / natural) * current)
  }, [])

  useLayoutEffect(() => {
    fit()
    const box = boxRef.current
    if (!box) return
    const observer = new ResizeObserver(fit)
    observer.observe(box)
    return () => observer.disconnect()
  }, [fit])

  // Webfont metrics differ from the fallback's, so the first measurement is
  // wrong until Bricolage has actually loaded.
  useEffect(() => {
    document.fonts?.ready.then(fit)
  }, [fit])

  return (
    <Box ref={boxRef} w="full">
      <Heading
        as="h1"
        aria-label={LABEL}
        fontFamily="display"
        fontWeight="800"
        lineHeight="0.9"
        letterSpacing="-0.045em"
        m="0"
      >
        <Box
          as="span"
          ref={lineRef}
          className="gb-rise"
          aria-hidden="true"
          display="block"
          width="fit-content"
          whiteSpace="nowrap"
          style={{
            // Pre-measurement fallback, replaced before paint by the layout
            // effect. Deliberately small so a miss under-runs the box rather
            // than overflowing it.
            fontSize: size ? `${size}px` : "clamp(2rem, 7vw, 5rem)",
          }}
        >
          Your training{" "}
          <Box as="span" color="gb.accent" css={{ WebkitTextStroke: "var(--gb-display-stroke)" }}>
            Bud
          </Box>
        </Box>
      </Heading>
    </Box>
  )
}
