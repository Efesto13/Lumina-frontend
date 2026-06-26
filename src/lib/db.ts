import mongoose from "mongoose";

export const connectionDB = async () =>{
    try {
        const mongo_Uri = process.env.MONGO_URI_DEFAULT;

        if(mongo_Uri){
            await mongoose.connect(mongo_Uri);
        } 
    }catch (error) {
        console.error("No conectada");
    };
};