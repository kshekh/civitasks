import { config } from '@config';
import mail from '@sendgrid/mail';

class MailClient {
  private mailer: typeof mail;

  // accept a mailer instance in case I ever get
  // around to testing this class
  constructor(mailer: typeof mail = mail) {
    this.mailer = mailer;
    this.mailer.setApiKey(config.SENDGRID_API_KEY);
  }

  async sendEmail(msg) {
    try {
      await this.mailer.send(msg);
    } catch (error) {
      console.error(`Error while sending email with subject: ${msg.subject} to: ${msg.to}`, error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
}

// Initialize the mail client
export const mailClient = new MailClient();