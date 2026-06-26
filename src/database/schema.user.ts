import type { UsersAuth } from "@/type/users";
import mongoose, { Schema, model } from "mongoose";


const UsersSchema = new Schema<UsersAuth>({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        minlegth: [6, "Password must be at least 6 characters"],
        required: [true, "password is required"]
    }
});

const Users = mongoose.models.users || model<UsersAuth>("users", UsersSchema);

export default Users;