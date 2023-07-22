import nodemailer from "nodemailer";

export async function sendEmailService({ to, subject, message, attachments = [] } = {}) {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587, // 587 => not secure || 465 => secure that depend on ( secure ) ATTRIBUTE
    secure: false, // ssl(tls)
    service: "gmail",
    auth: {
      user: "hjjsh78jjudi@gmail.com",
      pass: "mizoratumoiglknn",
    },
  });

  const emailInfo = await transporter.sendMail({
    // from: "hjjsh78jjudi@gmail.com",
    from: '"Trillo" <hjjsh78jjudi@gmail.com>', // this to make set address for email
    to,
    subject,
    html: message,
    attachments,
  });

  return emailInfo.accepted.length ? true : false;
}
