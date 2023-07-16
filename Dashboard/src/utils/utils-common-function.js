export function phoneValidation(phoneNumber) {
  var regularExpression =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regularExpression.test(phoneNumber);
}

export function emailValidation(mail) {
  var regularExpression =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  return regularExpression.test(mail);
}

export function passwordValidation(password) {
  var regularExpression =
    /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  return regularExpression.test(password);
}

export function licensePlateValidation(licensePlate) {
  console.log(licensePlate);
  var regularExpression = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
  return regularExpression.test(licensePlate);
}
// Calculate the date 18 years ago

export function verifyIfHas18yo(age) {
  const today = new Date();
  const birthdate = new Date(age);
  const diffTime = today - birthdate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays >= 6570) return true;
  return false;
}

export function ValidateCreditCardNumber(creditCardNumber) {
  const creditCardNumberTrim = creditCardNumber.replace(/\s/g, "");
  const creditCradDigit = Number(creditCardNumberTrim);
  var visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
  var mastercardRegEx =
    /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
  var amexpRegEx = /^3[47][0-9]{13}$/;
  var discovRegEx =
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/;
  var isValid = false;

  if (visaRegEx.test(creditCradDigit)) {
    isValid = true;
  } else if (mastercardRegEx.test(creditCradDigit)) {
    isValid = true;
  } else if (amexpRegEx.test(creditCradDigit)) {
    isValid = true;
  } else if (discovRegEx.test(creditCradDigit)) {
    isValid = true;
  }

  if (isValid) {
    return true;
  }
  return false;
}

export function ValidateMMYY(value) {
  // Regular expression pattern for MM/YY format
  var pattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;

  // Check if the input matches the pattern
  if (pattern.test(value)) {
    // Extract month and year from the input
    var [month, year] = value.split("/");

    // Convert year to a 4-digit format
    var fullYear = "20" + year;

    // Create a new Date object with the extracted values
    var date = new Date(fullYear, month - 1); // Note: month is 0-based

    var today = new Date();

    // Check if the date is valid
    if (
      date.getFullYear() >= today.getFullYear() &&
      date.getMonth() >= today.getMonth()
    ) {
      // Date is valid
      return true;
    }
  }

  // Date is invalid
  return false;
}
