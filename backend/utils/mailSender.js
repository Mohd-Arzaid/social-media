import nodemailer from 'nodemailer';

const mailSender = async(email,title,body)=>{
    try {
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                pass : process.env.MAIL_PASS,
                user : process.env.MAIL_USER,
            }

        })

        let info = await transporter.sendMail({
            from : "Arzaid Website",
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;
      
    } catch (error) {
        console.log(error.message);
        throw new Error("Failed to send email");
    }
}

export default mailSender;