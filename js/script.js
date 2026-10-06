const form = document.getElementById('registrationForm');
const studentName = document.getElementById('studentName');
const studentNumber = document.getElementById('studentNumber');
const email = document.getElementById('email');
const workshop = document.getElementById('workshop');
const studentTypeRegular = document.getElementById('studentTypeRegular');
const studentTypeScholar = document.getElementById('studentTypeScholar');
const terms = document.getElementById('terms');

const nameError = document.getElementById('nameError');
const studentNumberError = document.getElementById('studentNumberError');
const emailError = document.getElementById('emailError');
const workshopError = document.getElementById('workshopError');
const termsError = document.getElementById('termsError');

const registrationFee = document.getElementById('registrationFee');
const discount = document.getElementById('discount');
const finalFee = document.getElementById('finalFee');

const registerBtn = document.getElementById('registerBtn');
const clearBtn = document.getElementById('clearBtn');
const registrationResult = document.getElementById('registrationResult');

const summaryName = document.getElementById('summaryName');
const summaryStudentNumber = document.getElementById('summaryStudentNumber');
const summaryEmail = document.getElementById('summaryEmail');
const summaryWorkshop = document.getElementById('summaryWorkshop');
const summaryStudentType = document.getElementById('summaryStudentType');
const summaryFee = document.getElementById('summaryFee');
const summaryDiscount = document.getElementById('summaryDiscount');
const summaryFinalFee = document.getElementById('summaryFinalFee');

window.addEventListener('DOMContentLoaded', () => {
  registrationResult.style.display = 'none';
  updateFeeDisplay(0, 0, 0);
});

const studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStudentInfo(name, studentNumber, email) {
  const trimmedName = name.trim();
  if (trimmedName.length < 3) return false;
  if (/^\s+$/.test(name) || trimmedName === '') return false;
  if (/\d/.test(trimmedName)) return false;

  if (!studentNumberPattern.test(studentNumber)) return false;

  if (!emailPattern.test(email)) return false;

  return true;
}

function calculateFinalFee(workshop, studentType) {
  const fees = {
    'Web Development': 500,
    'UI/UX Design': 400,
    'Cybersecurity': 600
  };

  const baseFee = fees[workshop] || 0;
  const discountRate = studentType === 'Scholar' ? 0.20 : 0;
  const discountAmount = baseFee * discountRate;
  return baseFee - discountAmount;
}

function getCurrentFees() {
  const selectedWorkshop = workshop.value;
  const fees = {
    'Web Development': 500,
    'UI/UX Design': 400,
    'Cybersecurity': 600
  };
  const baseFee = fees[selectedWorkshop] || 0;
  
  let studentType = null;
  if (studentTypeRegular.checked) studentType = 'Regular';
  if (studentTypeScholar.checked) studentType = 'Scholar';
  
  const discountAmount = studentType === 'Scholar' ? baseFee * 0.20 : 0;
  const final = baseFee - discountAmount;
  
  return { baseFee, discountAmount, final };
}

function updateFeeDisplay(base, disc, final) {
  registrationFee.textContent = `₱${base}`;
  discount.textContent = `₱${disc}`;
  finalFee.textContent = `₱${final}`;
}

workshop.addEventListener('change', () => {
  const { baseFee, discountAmount, final } = getCurrentFees();
  updateFeeDisplay(baseFee, discountAmount, final);
});

document.querySelectorAll('input[name="studentType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const { baseFee, discountAmount, final } = getCurrentFees();
    updateFeeDisplay(baseFee, discountAmount, final);
  });
});

function clearErrors() {
  nameError.textContent = '';
  studentNumberError.textContent = '';
  emailError.textContent = '';
  workshopError.textContent = '';
  termsError.textContent = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  
  let isValid = true;

  const trimmed = studentName.value.trim();
  if (trimmed.length < 3 || trimmed === '' || /\d/.test(trimmed)) {
    nameError.textContent = 'Enter a valid student name.';
    isValid = false;
  }

  if (!studentNumberPattern.test(studentNumber.value)) {
    studentNumberError.textContent = 'Enter a valid student number.';
    isValid = false;
  }

  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Enter a valid email address.';
    isValid = false;
  }

  if (!workshop.value) {
    workshopError.textContent = 'Please select a workshop.';
    isValid = false;
  }

  if (!terms.checked) {
    termsError.textContent = 'You must accept the Terms and Conditions.';
    isValid = false;
  }

  if (isValid) {
    const { baseFee, discountAmount, final } = getCurrentFees();
    
    summaryName.textContent = studentName.value;
    summaryStudentNumber.textContent = studentNumber.value;
    summaryEmail.textContent = e
