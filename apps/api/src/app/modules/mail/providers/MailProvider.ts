import * as Mail from 'nodemailer/lib/mailer';
import { createGmailProvider, GmailProviderProps } from './GmailProvider';

export type MailProviderProps = GmailProviderProps;

export class MailProviderFactory {
  build(provider: MailProviderProps): Mail {
    const { type, props } = provider;

    switch (type) {
      case 'GMAIL':
        return createGmailProvider(props);
      default:
        throw new Error(`Cannot found provider for ${type}`);
    }
  }
}
