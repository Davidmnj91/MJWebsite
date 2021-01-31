import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

export type GmailProviderProps = { type: 'GMAIL'; props: GmailAccountProps };

export type GmailAccountProps = {
  user: string;
  pass: string;
};

export const createGmailTransport = (user: string, pass: string): GmailProviderProps => {
  return { type: 'GMAIL', props: { user, pass } };
};

export const createGmailProvider = ({ user, pass }: GmailAccountProps): Mail => {
  return createTransport({ service: 'Gmail', auth: { user, pass } });
};
