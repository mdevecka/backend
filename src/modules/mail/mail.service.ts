import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {

  constructor(private config: ConfigService<AppConfig>) {
  }

  async send(to: string, subject: string, body: string) {
    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: this.config.get("GOOGLE_EMAIL"),
        clientId: this.config.get("GOOGLE_CLIENT_ID"),
        clientSecret: this.config.get("GOOGLE_CLIENT_SECRET"),
        refreshToken: this.config.get("GOOGLE_EMAIL_REFRESH_TOKEN"),
      }
    });
    const mailOptions = {
      from: this.config.get("GOOGLE_MAILBOX"),
      to: to,
      subject: subject,
      text: body,
    };
    try {
      return transport.sendMail(mailOptions);
    }
    finally {
      transport.close();
    }
  }

}
