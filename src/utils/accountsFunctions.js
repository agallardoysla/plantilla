export const maxAccounts = 5;

const newAccountPrefix = 'sub';

export function getNextAccountName(accounts) {
  const sufix = accounts.length;
  return `${newAccountPrefix}${sufix}`;
}
