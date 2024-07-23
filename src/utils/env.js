import dotenv from 'dotenv';

dotenv.config();

export function env(name, defValue) {
  const value = process.env[name];
  if (value) return value;

  if (defValue) return defValue;

  throw new Error(`Missing: process.env[${name}]`);
}
