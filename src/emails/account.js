//external imports
import sgMail from '@sendgrid/mail'
import * as dotenv from "dotenv";
dotenv.config();

//code
sgMail.setApiKey(
	"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"
);

const msg = {
	to: "aidas0baranauskas@gmail.com",
	from: "aidas0baranauskas@gmail.com",
	subject: "and here we are again",
	text: "it's always such a pleasure",
};

sgMail.send(msg).then(() => { }, error => { console.error(error) });