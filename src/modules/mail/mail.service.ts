import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@modules/config/app-config.service';
import { createTransport } from 'nodemailer';

export interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

@Injectable()
export class MailService {

  constructor(private config: AppConfigService) {
  }

  async send(options: SendMailOptions) {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: this.config.googleEmail,
        clientId: this.config.googleClientId,
        clientSecret: this.config.googleClientSecret,
        refreshToken: this.config.googleEmailRefreshToken,
      }
    });
    const mailOptions = {
      from: this.config.googleMailbox,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
    };
    try {
      return transport.sendMail(mailOptions);
    }
    finally {
      transport.close();
    }
  }

}
