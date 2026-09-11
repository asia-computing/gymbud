/**
 * Signup transport.
 *
 * The site is a static GitHub Pages deploy, so there is no server of our own.
 * Emails currently land in a Google Sheet via an Apps Script Web App — see
 * `scripts/gymbud-signups.gs` for the script and the deploy steps.
 *
 * This module is the single seam between the form and wherever emails go.
 * Swapping the Sheet for Supabase later means changing `postSignup` and
 * nothing else — the form never learns what the backend is.
 */

const ENDPOINT = import.meta.env.VITE_SIGNUP_ENDPOINT ?? ""

/** Deliberately permissive — the mail server is the real validator. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isValidEmail = (value) => EMAIL_RE.test(value.trim())

export class SignupError extends Error {}

/**
 * @param {{ email: string, source?: string }} payload
 * @returns {Promise<void>} resolves once the address is recorded
 */
export async function submitSignup({ email, source = "teaser" }) {
  const address = email.trim().toLowerCase()

  if (!isValidEmail(address)) {
    throw new SignupError("That email doesn't look right.")
  }

  if (!ENDPOINT) {
    throw new SignupError(
      "Signups aren't switched on yet. Set VITE_SIGNUP_ENDPOINT and redeploy.",
    )
  }

  let response
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      // text/plain keeps this a CORS "simple request". Apps Script Web Apps
      // do not answer preflight OPTIONS, so application/json would fail.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ email: address, source, ts: new Date().toISOString() }),
      redirect: "follow",
    })
  } catch {
    throw new SignupError("Couldn't reach the server. Check your connection and retry.")
  }

  if (!response.ok) {
    throw new SignupError("Something went wrong on our end. Try again in a moment.")
  }

  // Apps Script answers with JSON; a non-JSON body means the deployment is
  // misconfigured (usually an HTML sign-in page from "Anyone with Google").
  let result
  try {
    result = await response.json()
  } catch {
    throw new SignupError("Something went wrong on our end. Try again in a moment.")
  }

  if (result.status !== "ok") {
    throw new SignupError(result.message || "Something went wrong. Try again in a moment.")
  }
}
