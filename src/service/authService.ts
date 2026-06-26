import { UserCredential, UsersDots } from "@/type/users";




export const register = async (user: UsersDots) => {
    try {
        const res = await fetch(`/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (!res.ok) {

            const errorData = await res.json();

            throw new Error(errorData.error || "Something went wrong during registration");
        };

        const data = await res.json();

        return data
    } catch (error: unknown) {
     if (error instanceof Error) throw error;
        
        throw new Error("An unexpected error occurred");
    }
};

export const login = async (user: UserCredential) => {
    try {
        const res = await fetch(`/api/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });

        if(!res.ok){
            const errorData= await res.json();
            throw new Error(errorData.error || "Something went wrong during login");
        };

        const data = await res.json();

        return data
    } catch (error) {
        if (error instanceof Error) throw error;
        
        throw new Error("An unexpected error occurred");
    }
};