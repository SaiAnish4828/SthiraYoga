# Booking emails — setup & usage notes (Option B: Google Sheet + Gmail)

When a visitor submits **Book a Class**, the site POSTs the booking as JSON to
`booking.endpoint` in `src/data/site.ts`. That endpoint is a small
**Google Apps Script** (free) that does two things:

1. Appends the booking as a row in a Google Sheet you own (your booking log).
2. Emails the details to `Sthirayogwell@gmail.com` so the studio can call back.

The visitor only ever sees the site's own "Thank you" confirmation —
**no auto-reply email is sent to them** (deliberately; that's a future step).

Until `booking.endpoint` is set, the form runs in **demo mode**: it validates
and shows the confirmation, but nothing leaves the browser.

---

## One-time setup (~15 minutes, done once by the studio)

You need any Google account (preferably the studio's).

### 1. Create the log sheet

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**.
2. Rename it to `Sthira Bookings` (top-left).
3. Keep the first tab named `Sheet1` (or rename it to `Bookings` — either works;
   the script below uses `Bookings` and creates it if missing).

### 2. Add the script

1. In the spreadsheet: **Extensions → Apps Script**. A code editor opens.
2. Delete any starter code and paste **the whole script from the next section**.
3. At the top of the script, check `STUDIO_EMAIL` is
   `Sthirayogwell@gmail.com` (change it there if the studio address changes).
4. Press **Ctrl+S** (save). Name the project `Sthira Booking Handler` if asked.

### 3. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Gear icon next to "Select type" → **Web app**.
3. Settings:
   - **Description:** `Sthira booking handler v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**. Google will ask you to **Authorize access** → choose your
   account → **Advanced → Go to Sthira Booking Handler (unsafe)** → **Allow**.
   (This "unsafe" screen is normal for your own scripts.)
5. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfyc…/exec`.

### 4. Point the website at it

1. Open `src/data/site.ts` → find `booking:` → set
   `endpoint: 'https://script.google.com/macros/s/…/exec'` (your URL).
2. Rebuild + redeploy (`npm run build:pages`, commit `docs/`, push) —
   or just send the URL to your developer and they'll do this step.

### 5. Test end-to-end

1. On the live site, submit a test booking (use your own phone number).
2. Within a minute you should get:
   - an email **"New class booking — \<name\>"** in the studio inbox, and
   - a new row in the `Bookings` sheet tab.
3. Delete the test row from the sheet afterwards.

---

## The server script (paste into Apps Script)

```javascript
// Sthira Yoga & Wellness — booking handler (Option B).
// Receives the website form POST, logs it to the sheet, emails the studio.
// Visitor receives NO auto-reply (studio-only notifications for now).

var STUDIO_EMAIL = 'Sthirayogwell@gmail.com';
var SHEET_NAME = 'Bookings';
var HEADERS = ['Received', 'Name', 'Phone', 'Email', 'Service', 'Date', 'Time', 'Message', 'Source'];

function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad-request' });
  }

  // Honeypot: bots fill the invisible "website" field; humans never do.
  // Pretend success so bots learn nothing.
  if (data.website) {
    return json({ ok: true });
  }

  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  var row = [
    new Date(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.serviceLabel || data.service || '',
    data.date || '',
    data.time || '',
    data.message || '',
    data.source || '',
  ];
  sheet.appendRow(row);

  var subject = 'New class booking — ' + (data.name || 'website visitor');
  var body = [
    'A new class booking came in from the website.',
    '',
    'Name: ' + (data.name || '-'),
    'Phone: ' + (data.phone || '-'),
    'Email: ' + (data.email || '-'),
    'Interested in: ' + (data.serviceLabel || data.service || '-'),
    'Preferred date: ' + (data.date || '-'),
    'Preferred time: ' + (data.time || '-'),
    'Message: ' + (data.message || '-'),
    '',
    'Submitted at: ' + new Date().toString(),
    'Source page: ' + (data.source || '-'),
  ].join('\n');

  GmailApp.sendEmail(STUDIO_EMAIL, subject, body, { replyTo: data.email || '' });

  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

---

## Day-to-day usage

- **New booking arrives** → email in the studio inbox (reply goes straight to
  the visitor, thanks to `replyTo`) + a row in the sheet. Call/WhatsApp them.
- **Reading the log** → the `Bookings` tab, newest at the bottom. Filter by
  service or date as needed; never delete the header row.
- **Something looks like spam** → honeypot catches most bots silently. If junk
  still arrives, check the sheet: spam rows usually have a filled `website`
  value only in the raw payload (not stored). For persistent abuse, ask your
  developer about rate-limiting or reCAPTCHA.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Form shows success but no email/row | The site's `endpoint` may still be empty (demo mode) or hold an old URL. Check `booking.endpoint`. |
| "Authorization required" after editing the script | Apps Script needs a **new version**: Deploy → **Manage deployments** → pencil icon → **Version: New version** → Deploy. |
| Emails land in spam | Mark one as "Not spam". Mail comes from your own Gmail, so this is rare. |
| `Daily limit exceeded` | Gmail caps script-sent mail (~100–500/day). A studio won't hit this; if it ever happens, spread sends or ask about Option C (own backend). |
| Changed the studio email | Update `STUDIO_EMAIL` at the top of the script **and** `email` in `src/data/site.ts`, then redeploy the script (new version) + rebuild the site. |

## Future advancements (parked for later)

- Auto-confirmation email to the visitor (add one `GmailApp.sendEmail` to the
  visitor's address + a template).
- WhatsApp notification to the studio on each booking (via WhatsApp Business API).
- Calendar blocking / slot availability.
- Admin view instead of a raw sheet.
