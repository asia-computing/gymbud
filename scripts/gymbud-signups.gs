/**
 * GYMBUD · signup collector (Google Apps Script)
 *
 * Appends every teaser-site signup to a Google Sheet.
 *
 * ── Setup ────────────────────────────────────────────────────────────────
 * 1. Create a Google Sheet named e.g. "GYMBUD signups".
 * 2. Extensions → Apps Script. Delete the stub, paste this file, save.
 * 3. Run `setup` once (Run ▸ setup) and grant the permission prompt. This
 *    writes the header row.
 * 4. Deploy ▸ New deployment ▸ type "Web app".
 *      Execute as:        Me
 *      Who has access:    Anyone            ← NOT "Anyone with Google account"
 *    Copy the /exec URL.
 * 5. Put that URL in the site's `.env` as VITE_SIGNUP_ENDPOINT (and in the
 *    repo's Actions secret of the same name, for the Pages build).
 *
 * Re-deploy ("Manage deployments" ▸ edit ▸ new version) after any edit here —
 * the /exec URL keeps serving the old code until you do.
 */

var SHEET_NAME = 'signups'
var HEADERS = ['timestamp', 'email', 'source', 'user_agent']

function setup() {
  var sheet = getSheet_()
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
  }
}

function doPost(e) {
  try {
    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}')
    var email = String(payload.email || '').trim().toLowerCase()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json_({ status: 'error', message: "That email doesn't look right." })
    }

    // One lock keeps concurrent submissions from overwriting the same row.
    var lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try {
      var sheet = getSheet_()
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS)
        sheet.setFrozenRows(1)
      }
      if (!isKnown_(sheet, email)) {
        sheet.appendRow([
          payload.ts || new Date().toISOString(),
          email,
          String(payload.source || 'teaser'),
          String((e && e.parameter && e.parameter.ua) || ''),
        ])
      }
    } finally {
      lock.releaseLock()
    }

    // A repeat address is a success from the visitor's point of view.
    return json_({ status: 'ok' })
  } catch (err) {
    return json_({ status: 'error', message: 'Server error.' })
  }
}

/** GET is only ever a human checking the deployment is alive. */
function doGet() {
  return json_({ status: 'ok', service: 'gymbud-signups' })
}

function getSheet_() {
  var doc = SpreadsheetApp.getActiveSpreadsheet()
  return doc.getSheetByName(SHEET_NAME) || doc.insertSheet(SHEET_NAME)
}

function isKnown_(sheet, email) {
  var rows = sheet.getLastRow()
  if (rows < 2) return false
  var emails = sheet.getRange(2, HEADERS.indexOf('email') + 1, rows - 1, 1).getValues()
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).trim().toLowerCase() === email) return true
  }
  return false
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
