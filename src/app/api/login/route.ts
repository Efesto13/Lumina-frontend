import { connectionDB } from "@/lib/db";
import { validationLogin } from "@/lib/validationtions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectionDB();

        const { email, password } = await req.json();

        if (!email || !password) return NextResponse.json({ error: "Usuario no encontrado" });

        const user = await validationLogin(email, password);

        return NextResponse.json(
            {
                mensagge: "Welcome user",
                user: user
            }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}