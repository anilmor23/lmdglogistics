/**
 * Google Apps Script for Client Requirements Form
 * 
 * This script receives form submissions and saves them to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with these column headers in Row 1:
 *    Timestamp | Company Name | Contact Person | Email | Phone | City | Manpower Type | Number of Resources | Duration | Additional Details
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
    const spreadsheetId = '13i0b4GTds4Z1lKr0_qh5SzZiayaXNzpw_FbV479_qks'; // Replace with your spreadsheet ID
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
        'Company Name',
        'Contact Person',
        'Email',
        'Phone',
        'City',
        'Manpower Type',
        'Number of Resources',
        'Duration',
        'Additional Details'
      ]);
    }
    
    // Append the form data as a new row
    try {
      sheet.appendRow([
        new Date(), // Timestamp
        data.companyName || '',
        data.contactPerson || '',
        data.email || '',
        data.phone || '',
        data.city || '',
        data.manpowerType || '',
        data.numResources || '',
        data.duration || '',
        data.details || ''
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
    companyName: 'Test Company',
    contactPerson: 'John Doe',
    email: 'test@example.com',
    phone: '+91-1234567890',
    city: 'Gurgaon',
    manpowerType: 'Forklift Operators',
    numResources: '10',
    duration: '1–6 months',
    details: 'Test submission'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

