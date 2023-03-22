const validator = (field, label, setStatus) => {
  if (!field) {
    setStatus("Error: " + label);
    return false;
  }
  setStatus(null);
  return true;
};

export default validator;
