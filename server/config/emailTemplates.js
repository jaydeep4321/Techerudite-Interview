export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Email Verification</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0; }
    .container { width: 100%; max-width: 600px; background-color: #ffffff; margin: 30px auto; padding: 20px; border-radius: 8px; }
    .header { font-size: 22px; font-weight: bold; color: #333; text-align: center; margin-bottom: 20px; }
    .content { font-size: 16px; color: #333; text-align: center; margin-bottom: 20px; }
    .otp { font-size: 24px; font-weight: bold; color: #28a745; }
    .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Email Verification</div>
    <div class="content">
      <p>Hi,</p>
      <p>Use the following OTP to verify your email:</p>
      <p class="otp">{{otp}}</p>
      <p>This OTP is valid for 10 minutes.</p>
    </div>
    <div class="footer">
      <p>If you did not request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;
