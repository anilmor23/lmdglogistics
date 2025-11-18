// Interactivity for LMGD Logistics static site
// - Mobile menu toggle
// - Smooth active link close on click
// - Forms validation and success messages
// - Google Sheets integration
// - Footer year

// ============================================
// GOOGLE SHEETS CONFIGURATION
// ============================================
// Google Apps Script Web App URLs for form submissions
const GOOGLE_SHEETS_CONFIG = {
  clientFormUrl: 'https://script.google.com/macros/s/AKfycbyGHyJNo_ZHgGuwSJJ53hzOtvhZB4Z2sVMFRvgTA-Wl9N7yD___PpdgNvzMqJFq3uCX/exec',
  candidateFormUrl: 'https://script.google.com/macros/s/AKfycbxmEqrnZgwa6X8zwl9lIuoiRoiFMSwhZIoRW3DKVmFmwbRykH7qPcYB3X_OMxC70ymQ/exec'
};

(function () {
  const byId = (id) => document.getElementById(id);

  // Footer year
  const yearEl = byId('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu
  const mobileBtn = byId('mobileMenuBtn');
  const mobileMenu = byId('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Clients form
  const clientForm = byId('clientForm');
  const clientSuccess = byId('clientSuccess');
  if (clientForm) {
    clientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(clientForm);

      // Simple client-side checks
      const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'city', 'numResources'];
      for (const field of requiredFields) {
        const value = String(formData.get(field) || '').trim();
        if (!value) {
          alert('Please fill all required fields.');
          return;
        }
      }

      // Email format check
      const email = String(formData.get('email') || '');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email.');
        return;
      }

      // Numeric resources check
      const num = Number(formData.get('numResources'));
      if (!Number.isFinite(num) || num < 1) {
        alert('Please enter a valid number of resources.');
        return;
      }

      // Prepare data for Google Sheets
      const data = {
        timestamp: new Date().toISOString(),
        companyName: formData.get('companyName'),
        contactPerson: formData.get('contactPerson'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        manpowerType: formData.get('manpowerType') || '',
        numResources: formData.get('numResources'),
        duration: formData.get('duration') || '',
        details: formData.get('details') || ''
      };

      // Submit to Google Sheets via Google Apps Script
      const submitButton = clientForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      // Use XMLHttpRequest for better compatibility with Google Apps Script
      const xhr = new XMLHttpRequest();
      xhr.open('POST', GOOGLE_SHEETS_CONFIG.clientFormUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0) {
          // Success (status 0 can occur with redirects)
          console.log('Client requirement submitted to Google Sheets:', data);
          clientForm.reset();
          if (clientSuccess) {
            clientSuccess.classList.remove('hidden');
            setTimeout(() => clientSuccess.classList.add('hidden'), 6000);
          }
        } else {
          console.error('Error submitting form. Status:', xhr.status);
          alert('There was an error submitting your form. Please try again.');
        }
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      };
      
      xhr.onerror = function() {
        console.error('Network error submitting form');
        alert('Network error. Please check your connection and try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      };
      
      xhr.send(JSON.stringify(data));
    });
  }

  // Candidate form
  const candidateForm = byId('candidateForm');
  const candidateSuccess = byId('candidateSuccess');
  if (candidateForm) {
    candidateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(candidateForm);

      // Basic optional validation patterns (non-blocking)
      const email = String(formData.get('candidateEmail') || '');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email.');
        return;
      }

      // Prepare data for Google Sheets
      const data = {
        timestamp: new Date().toISOString(),
        fullName: formData.get('fullName') || '',
        phone: formData.get('candidatePhone') || '',
        email: formData.get('candidateEmail') || '',
        city: formData.get('candidateCity') || '',
        primarySkill: formData.get('primarySkill') || '',
        experienceYears: formData.get('experienceYears') || ''
      };

      // Submit to Google Sheets via Google Apps Script
      const submitButton = candidateForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      // Use XMLHttpRequest for better compatibility with Google Apps Script
      const xhr = new XMLHttpRequest();
      xhr.open('POST', GOOGLE_SHEETS_CONFIG.candidateFormUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0) {
          // Success (status 0 can occur with redirects)
          console.log('Candidate registration submitted to Google Sheets:', data);
          candidateForm.reset();
          if (candidateSuccess) {
            candidateSuccess.classList.remove('hidden');
            setTimeout(() => candidateSuccess.classList.add('hidden'), 6000);
          }
        } else {
          console.error('Error submitting form. Status:', xhr.status);
          alert('There was an error submitting your form. Please try again.');
        }
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      };
      
      xhr.onerror = function() {
        console.error('Network error submitting form');
        alert('Network error. Please check your connection and try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      };
      
      xhr.send(JSON.stringify(data));
    });
  }
})(); 


