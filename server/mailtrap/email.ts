import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from './htmlEmail';
import { transporter } from './mailtrap'; // ✅ our new SMTP transporter

const FROM_EMAIL = '"Bhuvan-Food-App" <no-reply@pateleats.com>'; // ✅ custom sender name email hamari real gamai se jago or email tital hoga ye FROM_EMAIL

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const html = htmlContent.replace('{verificationToken}', verificationToken);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: 'Verify your email',
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email verification');
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = generateWelcomeEmailHtml(name);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to Bhuvan-Food-App',
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send welcome email');
  }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  const html = generatePasswordResetEmailHtml(resetURL);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send password reset email');
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const html = generateResetSuccessEmailHtml();

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: 'Password Reset Successfully',
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send password reset success email');
  }
};
