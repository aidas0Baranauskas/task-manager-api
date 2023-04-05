//external imports
import sgMail from '@sendgrid/mail'
import * as dotenv from "dotenv";
dotenv.config();

//code
sgMail.setApiKey(process.env.sendgrid_API_Key)

const msg = {
	to: "aidas0baranauskas@gmail.com",
	from: "aidas0baranauskas@gmail.com",
	subject: "5th attemot",
	text: "blank t34t34t34t34t34t",
};

sgMail.send(msg).then(() => { }, error => { console.error(error) });