/**
 * Google Apps Script for Candidate Registration Form
 * 
 * This script receives candidate registrations and saves them to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with these column headers in Row 1:
 *    Timestamp | Full Name | Phone | Email | Current City | Primary Skill | Years of Experience
 * 
 * 2. Copy this entire script to Google Apps Script:
 *    - Go to https://script.google.com
 *    - Click "New Project"
 *    - Paste this code
 *    - Replace 'YOUR_SHEET_NAME' with your actual Google Sheet name
 *    - Replace 'Sheet1' with your sheet tab name if different
 * 
 * 3. Deploy as Web App:
 *    - Click "Deploy" → "New deployment"
 *    - Choose type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (required for public website)
 *    - Click "Deploy"
 *    - Copy the Web App URL
 * 
 * 4. Update main.js with the Web App URL
 */

function doPost(e) {
  try {
    // Parse the data from the request (handles both JSON and form data)
    let data;
    let rawData = '';
    
    // Check if data is in postData.contents (JSON) or parameters (form data)
    if (e.postData && e.postData.contents) {
      rawData = e.postData.contents;
    } else if (e.parameters && e.parameters.data) {
      rawData = e.parameters.data[0]; // Form data comes as array
    } else {
      throw new Error('No data received');
    }
    
    try {
      data = JSON.parse(rawData);
    } catch (parseError) {
      Logger.log('JSON Parse Error: ' + parseError.toString() + '. Raw data: ' + rawData);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid JSON data: ' + parseError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // IMPORTANT: Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheet ID
    // To find the ID: Open your Google Sheet, look at the URL
    // The ID is the long string between /d/ and /edit
    // Example: https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit
    //                                    ^^^^^^^^^^^^^^^^ This is the ID
    const spreadsheetId = '1PMzGvPvOMYFgndNy0esBf3KPezFQDpqhnXvXYinI9Sg'; // Replace with your spreadsheet ID
    const tabName = 'Sheet1'; // Change if your tab has a different name
    
    let sheet;
    try {
      // Open spreadsheet by ID (most reliable method)
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      sheet = spreadsheet.getSheetByName(tabName);
      
      // If sheet tab doesn't exist, create it
      if (!sheet) {
        sheet = spreadsheet.insertSheet(tabName);
      }
    } catch (sheetError) {
      Logger.log('Sheet Error: ' + sheetError.toString());
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Sheet not found. Please check the spreadsheet ID. Error: ' + sheetError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Phone',
        'Email',
        'Current City',
        'Primary Skill',
        'Years of Experience'
      ]);
    }
    
    // Append the form data as a new row
    try {
      sheet.appendRow([
        new Date(), // Timestamp
        data.fullName || '',
        data.phone || '',
        data.email || '',
        data.city || '',
        data.primarySkill || '',
        data.experienceYears || ''
      ]);
      
      Logger.log('Data saved successfully: ' + JSON.stringify(data));
      
      // Return success response
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully'
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (appendError) {
      Logger.log('Append Error: ' + appendError.toString());
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Error saving data: ' + appendError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('General Error: ' + error.toString());
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
function testDoPost() {
  const testData = {
    fullName: 'Jane Smith',
    phone: '+91-9876543210',
    email: 'jane@example.com',
    city: 'Delhi',
    primarySkill: 'Forklift Operator',
    experienceYears: '5'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

