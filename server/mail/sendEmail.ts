import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const recipients = [
  "melakabebeee@gmail.com",
  "mulualemasfaw2321@gmail.com",
  "mesekirsalgech@gmail.com",
];

export function sendMail(message: string, recipientsEmail: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERz, // Use environment variable
      pass: process.env.EMAIL_PASS, // Use environment variable
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
    debug: true, // Enable debug mode
  });
  transporter
    .sendMail({
      // to: recipients.join(","),
      to: recipientsEmail,
      subject: "ETHIO FEDERAL SYSTEM ",
      html: `<h1 style="color: green; font-weight: bold;">${message}</h1>`, // Add inline CSS styles
    })
    .then(() => {
      console.log("email sent");
    })
    .catch((err) => {
      console.log(err);
      console.log("email not sent");
    });
}
