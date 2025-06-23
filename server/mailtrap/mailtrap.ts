import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhuvankumar66666@gmail.com',     // your gmail address  
        pass: 'knreajfrssxgvkzt',//it is an app password generated from google account security settings
    }
})