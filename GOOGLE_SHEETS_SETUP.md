# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to store form submissions from your LMDG Logistics website.

## Overview

Your website has two forms:
1. **Client Requirements Form** - Stores client manpower requests
2. **Candidate Registration Form** - Stores candidate applications

Each form needs its own Google Sheet and Google Apps Script.

---

## Step 1: Create Google Sheets

### Create Sheet 1: Client Requirements

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"LMDG Client Requirements"** (or any name you prefer)
4. In Row 1, add these column headers:
   ```
   Timestamp | Company Name | Contact Person | Email | Phone | City | Manpower Type | Number of Resources | Duration | Additional Details
   ```
5. Save the sheet name (you'll need it in Step 2)

### Create Sheet 2: Candidate Registrations

1. Create another new spreadsheet
2. Name it: **"LMDG Candidate Registrations"** (or any name you prefer)
3. In Row 1, add these column headers:
   ```
   Timestamp | Full Name | Phone | Email | Current City | Primary Skill | Years of Experience
   ```
4. Save the sheet name (you'll need it in Step 2)

---

## Step 2: Create Google Apps Scripts

### For Client Requirements Form

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete the default code
4. Open the file `google-apps-script-client-form.gs` from this project
5. Copy the entire code and paste it into the Google Apps Script editor
6. **Important:** Replace `'YOUR_SHEET_NAME'` with your actual sheet name (e.g., `'LMDG Client Requirements'`)
7. If your sheet tab is not named "Sheet1", also replace `'Sheet1'` with your tab name
8. Click **"Save"** (Ctrl+S or Cmd+S)
9. Name the project: **"LMDG Client Form Handler"**

### For Candidate Registration Form

1. In Google Apps Script, click **"New Project"** again
2. Delete the default code
3. Open the file `google-apps-script-candidate-form.gs` from this project
4. Copy the entire code and paste it into the Google Apps Script editor
5. **Important:** Replace `'YOUR_SHEET_NAME'` with your actual sheet name (e.g., `'LMDG Candidate Registrations'`)
6. If your sheet tab is not named "Sheet1", also replace `'Sheet1'` with your tab name
7. Click **"Save"** (Ctrl+S or Cmd+S)
8. Name the project: **"LMDG Candidate Form Handler"**

---

## Step 3: Deploy as Web Apps

### Deploy Client Form Script

1. In the **"LMDG Client Form Handler"** project, click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure:
   - **Description:** "Client Requirements Form Handler" (optional)
   - **Execute as:** "Me" (your email)
   - **Who has access:** **"Anyone"** (IMPORTANT: This must be "Anyone" for public website forms)
5. Click **"Deploy"**
6. **Copy the Web App URL** - You'll need this in Step 4
7. Click **"Done"**

### Deploy Candidate Form Script

1. In the **"LMDG Candidate Form Handler"** project, click **"Deploy"** → **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Configure:
   - **Description:** "Candidate Registration Form Handler" (optional)
   - **Execute as:** "Me" (your email)
   - **Who has access:** **"Anyone"** (IMPORTANT: This must be "Anyone" for public website forms)
5. Click **"Deploy"**
6. **Copy the Web App URL** - You'll need this in Step 4
7. Click **"Done"**

---

## Step 4: Update Your Website Code

1. Open `assets/js/main.js` in your project
2. Find the `GOOGLE_SHEETS_CONFIG` section at the top (around line 13-16)
3. Replace the placeholder URLs:

```javascript
const GOOGLE_SHEETS_CONFIG = {
  clientFormUrl: 'YOUR_CLIENT_FORM_SCRIPT_URL_HERE',  // ← Paste Client Form Web App URL here
  candidateFormUrl: 'YOUR_CANDIDATE_FORM_SCRIPT_URL_HERE'  // ← Paste Candidate Form Web App URL here
};
```

**Example:**
```javascript
const GOOGLE_SHEETS_CONFIG = {
  clientFormUrl: 'https://script.google.com/macros/s/AKfycby.../exec',
  candidateFormUrl: 'https://script.google.com/macros/s/AKfycbz.../exec'
};
```

4. Save the file

---

## Step 5: Test the Forms

1. Open your website in a browser
2. Fill out the **Client Requirements** form and submit
3. Check your Google Sheet - you should see a new row with the data
4. Fill out the **Candidate Registration** form and submit
5. Check your candidate Google Sheet - you should see a new row with the data

---

## Troubleshooting

### Forms submit but data doesn't appear in sheets

- **Check sheet names:** Make sure the sheet names in the script match exactly (case-sensitive)
- **Check permissions:** Ensure the Web App is deployed with "Anyone" access
- **Check browser console:** Open Developer Tools (F12) and look for errors

### "Access denied" or CORS errors

- Make sure you deployed the Web App with **"Anyone"** access (not "Only myself")
- Try redeploying the Web App

### Script not found errors

- Make sure you saved the script before deploying
- Verify the Web App URL is correct in `main.js`

### Data appears in wrong columns

- Check that your Google Sheet headers match exactly what's in the script
- Make sure headers are in Row 1

---

## Security Notes

- The Web Apps are set to "Anyone" access, which is required for public website forms
- The scripts only allow writing data (POST requests), not reading
- Consider adding rate limiting or spam protection if you receive many submissions

---

## Optional: Add Email Notifications

You can modify the Google Apps Script to send email notifications when forms are submitted. Add this code before the `return` statement in the `doPost` function:

```javascript
// Send email notification (optional)
const emailBody = `
New Client Requirement Submitted:

Company: ${data.companyName}
Contact: ${data.contactPerson}
Email: ${data.email}
Phone: ${data.phone}
City: ${data.city}
Manpower Type: ${data.manpowerType}
Resources: ${data.numResources}
Duration: ${data.duration}
Details: ${data.details}
`;

MailApp.sendEmail({
  to: 'your-email@example.com', // Replace with your email
  subject: 'New Client Requirement - LMDG Logistics',
  body: emailBody
});
```

---

## Support

If you encounter issues:
1. Check the browser console (F12) for JavaScript errors
2. Check Google Apps Script execution logs (View → Executions)
3. Verify all URLs and sheet names are correct

---

**Setup Complete!** Your forms will now save data to Google Sheets automatically.

