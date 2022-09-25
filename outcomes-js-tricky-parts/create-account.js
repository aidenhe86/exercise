function createAccount(pin, amount = 0) {
  return {
    checkBalance(input) {
      if (input !== pin) return "Invalid PIN.";
      return `$${amount}`;
    },
    deposit(input, dep) {
      if (input !== pin) return "Invalid PIN.";
      amount += dep;
      return `Succesfully deposited $${dep}. Current balance: $${amount}.`;
    },
    withdraw(input, wid) {
      if (input !== pin) return "Invalid PIN.";
      if (wid > amount)
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      amount -= wid;
      return `Succesfully withdrew $${wid}. Current balance: $${amount}.`;
    },
    changePin(input, newPin) {
      if (input !== pin) return "Invalid PIN.";
      pin = newPin;
      return "PIN successfully changed!";
    },
  };
}

module.exports = { createAccount };
