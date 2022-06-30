import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

// ToHashFn signature function for hashing raw string
type ToHashFn = (password: string) => Promise<string>;

// ComparePasswordFn signature function for comparing stored vs supplied password
type ComparePasswordFn = (
  storedPassword: string,
  suppliedPassword: string
) => Promise<boolean>;

// toHash - transforms provided sring into hashed version
const toHash: ToHashFn = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString("hex")}.${salt}`;
};

const comparePassword: ComparePasswordFn = async (
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> => {
  const [hashedPassword, salt] = storedPassword.split(".");
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buf.toString("hex") === hashedPassword;
};

export { toHash, comparePassword };
