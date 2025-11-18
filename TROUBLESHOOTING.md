# Troubleshooting: Data Not Appearing in Google Sheets

If you're not seeing data in your Google Sheets, follow these steps:

## Step 1: Check Google Apps Script Sheet Names

**This is the most common issue!**

1. Open your Google Apps Script project:
   - For Client Form: https://script.google.com (find "LMGD Client Form Handler")
   - For Candidate Form: https://script.google.com (find "LMGD Candidate Form Handler")

2. In each script, find this line:
   ```javascript
   const sheetName = 'LMGD Client Requirements';
   ```
   or
   ```javascript
   const sheetName = 'LMGD Candidate Registrations';
   ```

3. **Make sure the sheet name matches EXACTLY** (case-sensitive, including spaces):
   - Go to your Google Sheets
   - Check the exact name of your spreadsheet
   - Update the script with the exact name
   - Save the script
   - **Redeploy the Web App** (important!)

## Step 2: Check Google Apps Script Execution Logs

1. Go to https://script.google.com
2. Open your script project
3. Click **"Executions"** in the left sidebar
4. Look for recent executions (when you submitted the form)
5. Click on an execution to see if there are any errors
6. Common errors:
   - "Sheet not found" → Sheet name is wrong
   - "Permission denied" → Web app not deployed with "Anyone" access
   - "Invalid JSON" → Data format issue

## Step 3: Verify Web App Deployment Settings

1. In Google Apps Script, click **"Deploy"** → **"Manage deployments"**
2. Click the pencil icon (edit) on your deployment
3. Make sure:
   - **Execute as:** "Me"
   - **Who has access:** **"Anyone"** (this is critical!)
4. If you changed it, click **"Deploy"** again
5. Copy the new URL and update `main.js` if it changed

## Step 4: Test the Script Directly

You can test if the script works by running the test function:

1. In Google Apps Script, click the function dropdown
2. Select `testDoPost`
3. Click the Run button (▶️)
4. Check the Execution log for errors
5. Check your Google Sheet to see if test data appeared

## Step 5: Check Browser Console

1. Open your website
2. Press **F12** (or right-click → Inspect)
3. Go to the **Console** tab
4. Submit a form
5. Look for any error messages in red
6. Common errors:
   - CORS errors → Web app not set to "Anyone"
   - Network errors → URL might be wrong

## Step 6: Verify Sheet Tab Name

1. Open your Google Sheet
2. Check the tab name at the bottom (usually "Sheet1")
3. In Google Apps Script, make sure this matches:
   ```javascript
   const tabName = 'Sheet1'; // Change if different
   ```

## Step 7: Check Sheet Permissions

1. Open your Google Sheet
2. Click **Share** button
3. Make sure your Google account (the one running the script) has **Editor** access
4. The script needs permission to write to the sheet

## Step 8: Manual Test

Try accessing the Web App URL directly in your browser:

```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

You should see a response (even if it's an error). If you see nothing, the deployment might be wrong.

## Common Issues and Solutions

### Issue: "Sheet not found" error
**Solution:** 
- Check the exact sheet name (case-sensitive)
- Make sure the sheet exists in your Google Drive
- Update the script and redeploy

### Issue: Data appears but in wrong columns
**Solution:**
- Check that your sheet headers match exactly what's in the script
- Headers should be in Row 1
- Column order matters

### Issue: "Permission denied"
**Solution:**
- Redeploy the Web App with "Anyone" access
- Make sure you clicked "Deploy" after making changes

### Issue: Forms submit but no data appears
**Solution:**
1. Check execution logs (Step 2)
2. Verify sheet name (Step 1)
3. Make sure you saved and redeployed after changing the script

### Issue: CORS errors in browser console
**Solution:**
- Web app must be deployed with "Anyone" access
- Try redeploying the Web App

## Quick Fix Checklist

- [ ] Sheet names in script match your actual Google Sheet names exactly
- [ ] Script is saved in Google Apps Script
- [ ] Web App is deployed with "Anyone" access
- [ ] Web App URLs in `main.js` are correct
- [ ] Google Sheet exists and is accessible
- [ ] Tab name matches (usually "Sheet1")
- [ ] Headers are in Row 1 of the sheet
- [ ] Your Google account has Editor access to the sheets

## Still Not Working?

1. **Check the execution logs** - This will tell you exactly what's wrong
2. **Try the test function** - This will verify the script works
3. **Verify sheet names** - This is the #1 cause of issues
4. **Redeploy after changes** - Always redeploy after updating the script

## Need More Help?

Check the execution logs in Google Apps Script - they will show you the exact error message that will help diagnose the issue.

