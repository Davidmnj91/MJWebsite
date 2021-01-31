import { Address } from 'nodemailer/lib/mailer';
import { AdminEmailCreator, AdminEmailTemplateExecutor } from './AdminEmailTemplate';

export type MailTemplateProps = AdminEmailCreator;

export type BaseMailProps = {
  from: string | Address;
  to: string | Address | Array<string | Address>;
  cc?: string | Address | Array<string | Address>;
  bcc?: string | Address | Array<string | Address>;
  subject?: string;
};

export class EmailTemplateFactory {
  async build(templateProps: MailTemplateProps) {
    const { type, props } = templateProps;

    switch (type) {
      case 'ADMIN_EMAIL_TEMPLATE':
        return await AdminEmailTemplateExecutor(props);
      default:
        throw new Error(`Cannot found template for ${type}`);
    }
  }
}
