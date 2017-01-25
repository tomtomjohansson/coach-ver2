import validator from 'validator';

export function createValidator(key, type) {
  const saveValues = value => {   
    const v = {
      value,
      error: validateInput(value,type)
    };
    const state = {
      ...state
    };
    state[key] = v;
    this.setState(state);
  };
  this.validators[key] = () => {
    var v = this.state[key];
    return v.value && !v.error;
  };
  return saveValues;
}

export function checkValidation() {
  var valid = true;
  for (let key in this.validators) {
    if (!this.validators[key] || !this.validators[key]() ) {
      valid = false;
      return;
    };
  }
  return valid;
}

function validateInput(value, type) {
  switch (type) {
    case 'password':
      return validatePassword(value);
    case 'username':
      return validateUsername(value);
    case 'email':
      return validateEmail(value);
    case 'number':
      return validateNumber(value);
    case 'date':
      return validateDate(value);
    default:
      return validateString(value);
  }
}

function validatePassword(text) {
  if (!validator.isLength(text,{min:6,max:20})) {
    return "Måste bestå av minst sex tecken"; 
  } else if (!/^(?:[A-ZÅÄÖa-zåäö0-9 _]+)(?:[A-ZÅÄÖa-zåäö0-9 _]*)$/.test(text)) {
    return "Endast bokstäver och siffror tillåts";
  } else {
    return false;
  }
}

function validateUsername(text) {
  if (validator.isEmpty(text)) {
    return "Fältet får inte vara tomt.";
  } else if (!/^(?:[A-ZÅÄÖa-zåäö0-9 _]+)(?:[A-ZÅÄÖa-zåäö0-9 _]*)$/.test(text)) {
    return "Endast bokstäver och siffror tillåts";
  } else {
    return false;
  }
}

function validateEmail(text) {
  if (!validator.isEmail(text)) {
    return "Fyll i en giltig emailadress";
  } else {
    return false;
  }
}

function validateString(text) {
  if (validator.isEmpty(text)) {
    return "Fältet får inte vara tomt";
  } else {
    return false;
  }
}
