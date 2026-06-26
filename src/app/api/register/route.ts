import Users from "@/database/schema.user";
import { connectionDB } from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { validationRegister } from "@/lib/validationtions";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        await connectionDB();
        
        const {name, email, password} = await req.json();
        
        await validationRegister(email, password, name); 
        
        const hash = await hashPassword(password);

        const newUser = await Users.create({
            name: name,
            email:email,
            password: hash
        });

        if(!newUser) return NextResponse.json({ error: "The user could not be created" }, { status: 400 });
        

        return NextResponse.json({ message: "User registered successfully", id: newUser._id }, { status: 201 });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    };
};