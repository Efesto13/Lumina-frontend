import bcrypt from 'bcrypt';

const Hash_Round = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, Hash_Round);
};

export const compareHash = async (password: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(password, hashed);
};