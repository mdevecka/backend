import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@modules/config/app-config.service';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {

  constructor(private config: AppConfigService) {
  }

  async send(to: string, subject: string, body: string) {
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
