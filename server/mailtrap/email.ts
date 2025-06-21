import { client, sender } from "./mailtrap";
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  passwordResetTemplate,
  passwordResetSuccessTemplate,
} from "./htmlEmail";

// 1️⃣ Send Verification Email
export const verificationEmail = async (
  email: string,
  verificationToken: string // 6 digit code
) => {
  const recipient = [{ email }];
  const htmlContent = verificationEmailTemplate(verificationToken);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: htmlContent,
      category: "Email verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

// 2️⃣ Send Welcome Email
export const sendWelcomEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = welcomeEmailTemplate(name);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Food Application",
      html: htmlContent,
      category: "Welcome Email",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};

// 3️⃣ Send Password Reset Email
export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipient = [{ email }];
  const htmlContent = passwordResetTemplate(resetURL);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset email");
  }
};

// 4️⃣ Send Password Reset Success Email
export const sendResetSuccessEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = passwordResetSuccessTemplate(name);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
