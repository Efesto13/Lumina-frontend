import Users from "@/database/schema.user";
import { compareHash } from "./hash";


export const validationRegister = async (email: string, password: string, name: string) => {
    const duplicateEmail = await Users.findOne({email: email});

    if(duplicateEmail) throw new Error("Email alredy exists");

    if(!password || password.length < 6) throw new Error("Min 6 characters in password");

    if(!name || name.length < 3) throw new Error("Min 3 characters in name");

    return
};

export const validationLogin = async (email: string, password: string) => {
    const user = await Users.findOne({email: email});

    if(!user) throw new Error("Email not exists");

    const comparePassword = await compareHash(password, user.password);

    if(!comparePassword) throw new Error("Password incorrect");

    return user
};