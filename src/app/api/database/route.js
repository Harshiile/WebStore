import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { userModel } from './model';
export async function POST(request) {
    const tmpData = {
        "name": "Harshil",
        "rollno": "01"
    }
    try {
        const conn = await mongoose.connect(`mongodb+srv://theharshiile:qwerty1234@webtree.uuhpe.mongodb.net/WebTree?retryWrites=true&w=majority&appName=WebTree`);
        console.log('Database Succesfully Connected');

        const schema = new mongoose.Schema({
            "name": String,
            "rollno": Number
        });
        // const userDetails = mongoose.model('UserDetails', schema);
        const userDetails = userModel(schema);

        userDetails.create(tmpData);

        return Response.json({ "done": true });
    }
    catch (err) {
        console.log(err);
        return Response.json({ "done": false });
    }
}