import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_TOKEN!;

export const client = new MailtrapClient({ token: TOKEN });

export const sender = {
    email: process.env.MAILTRAP_SENDER_EMAIL!,
    name: process.env.MAILTRAP_SENDER_NAME!,
};