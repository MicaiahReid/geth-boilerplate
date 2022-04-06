const unlockAccounts = () => {
  const accounts = eth.accounts;
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const response = personal.unlockAccount(account, "test");
    if (response) {
      console.log(`unlocked account ${account}`);
    } else {
      console.warn(`failed to unlock account ${account}`);
    }
  }
};
