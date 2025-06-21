export const verificationEmailTemplate = (code: string) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #4CAF50;">Verify Your Email</h2>
    <p>Thank you for signing up! Please use the verification code below to complete your registration:</p>
    <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #000;">
      ${code}
    </div>
    <p style="font-size: 14px;">This code is valid for 24 hours. If you did not sign up, please ignore this email.</p>
    <hr style="margin-top: 30px;" />
    <p style="font-size: 12px; color: #999;">© 2025 Food Application</p>
  </div>
`;

export const welcomeEmailTemplate = (name: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; max-width: 600px; margin: auto;">
    <h2 style="color: #4CAF50;">Welcome, ${name} 👋</h2>
    <p>We’re so excited to have you onboard at <strong>Food Application</strong>.</p>
    <p>Let’s get you started with a delicious journey.</p>
    <a href="https://your-app-url.com" style="background-color: #4CAF50; color: white; padding: 10px 20px; display: inline-block; margin-top: 20px; text-decoration: none; border-radius: 5px;">Get Started</a>
    <hr style="margin-top: 30px;" />
    <p style="font-size: 12px; color: #999;">Food Application Team</p>
  </div>
`;

export const passwordResetTemplate = (resetLink: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
    <h2 style="color: #f44336;">Reset Your Password</h2>
    <p>It looks like you requested a password reset. Click the button below to change your password:</p>
    <a href="${resetLink}" style="background-color: #f44336; color: white; padding: 10px 20px; display: inline-block; margin-top: 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p style="font-size: 14px; margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
    <hr />
    <p style="font-size: 12px; color: #999;">Food Application</p>
  </div>
`;

export const passwordResetSuccessTemplate = (name: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
    <h2 style="color: #4CAF50;">Password Reset Successful</h2>
    <p>Hello ${name},</p>
    <p>Your password has been successfully updated. If this wasn’t you, please contact support immediately.</p>
    <hr />
    <p style="font-size: 12px; color: #999;">Food Application Security Team</p>
  </div>
`;
