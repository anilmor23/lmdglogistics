# How to Find Your Google Spreadsheet ID

The updated scripts now use the **Spreadsheet ID** instead of the sheet name. This is more reliable and avoids errors.

## Step 1: Open Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Open your spreadsheet:
   - "LMGD Client Requirements" (for client form)
   - "LMGD Candidate Registrations" (for candidate form)

## Step 2: Get the Spreadsheet ID from the URL

Look at your browser's address bar. The URL will look like this:

```
https://docs.google.com/spreadsheets/d/1ABC123xyz456DEF789ghi012jkl345mno678pqr/edit
```

The **Spreadsheet ID** is the long string between `/d/` and `/edit`:

```
https://docs.google.com/spreadsheets/d/1ABC123xyz456DEF789ghi012jkl345mno678pqr/edit
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                    This is your Spreadsheet ID
```

## Step 3: Copy the ID

Copy the entire ID (it's usually about 44 characters long, containing letters, numbers, and sometimes dashes/underscores).

**Example IDs:**
- `1ABC123xyz456DEF789ghi012jkl345mno678pqr`
- `1aBcD2eFgH3iJkL4mNoP5qRsT6uVwX7yZaB8cDeF`

## Step 4: Update Your Google Apps Script

1. Open your Google Apps Script project:
   - Client Form: https://script.google.com
   - Candidate Form: https://script.google.com

2. Find this line in each script:
   ```javascript
   const spreadsheetId = 'YOUR_SPREADSHEET_ID';
   ```

3. Replace `'YOUR_SPREADSHEET_ID'` with your actual ID:
   ```javascript
   const spreadsheetId = '1ABC123xyz456DEF789ghi012jkl345mno678pqr';
   ```

4. **Important:** Keep the quotes around the ID!

5. Save the script (Ctrl+S or Cmd+S)

6. Redeploy the Web App:
   - Click "Deploy" → "Manage deployments"
   - Click the pencil icon (edit)
   - Click "Deploy"

## Example

If your Google Sheet URL is:
```
https://docs.google.com/spreadsheets/d/1aBcD2eFgH3iJkL4mNoP5qRsT6uVwX7yZaB8cDeF/edit#gid=0
```

Then your Spreadsheet ID is:
```
1aBcD2eFgH3iJkL4mNoP5qRsT6uVwX7yZaB8cDeF
```

And in your script, you would write:
```javascript
const spreadsheetId = '1aBcD2eFgH3iJkL4mNoP5qRsT6uVwX7yZaB8cDeF';
```

## Why Use ID Instead of Name?

- **More reliable:** IDs never change, even if you rename the sheet
- **Faster:** Direct access without searching
- **No conflicts:** Multiple sheets can have the same name, but IDs are unique
- **Works in all contexts:** SpreadsheetApp.openById() works in web apps

## Troubleshooting

**Q: I can't find the ID in the URL**
- Make sure you're viewing the spreadsheet (not just the list of files)
- The URL should contain `/spreadsheets/d/` followed by a long string

**Q: The ID is very long**
- That's normal! Spreadsheet IDs are typically 44 characters long

**Q: Do I need both IDs?**
- Yes! You need one ID for the Client Requirements sheet
- And a different ID for the Candidate Registrations sheet

