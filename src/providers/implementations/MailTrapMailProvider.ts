import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailTrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '7eeb02ee29af80',
                pass: 'f3f18f852b57e5'
            }
        })
    }

    async sendMail({
        to: {
            name: toName,
            email: toEmail
        }, from: {
            name: fromName,
            email: fromEmail
        },
        subject,
        body
    }: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: toName,
                address: toEmail
            },
            from: {
                name: fromName,
                address: fromEmail
            },
            subject,
            html: body
        });
    }
}