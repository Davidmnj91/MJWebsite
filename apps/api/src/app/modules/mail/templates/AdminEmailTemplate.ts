import { Result } from '@mj-website/monads';
import { SendMailOptions } from 'nodemailer';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { BaseMailProps } from './EmailTemplate';

export type AdminEmailOptions = {
  user?: string;
  issuer: string;
  secret: string;
} & BaseMailProps;

export type AdminEmailCreator = { type: 'ADMIN_EMAIL_TEMPLATE'; props: AdminEmailOptions };

export const createAdminEmailTemplate = (props: AdminEmailOptions): AdminEmailCreator => {
  return { type: 'ADMIN_EMAIL_TEMPLATE', props };
};

export const AdminEmailTemplateExecutor = async (props: AdminEmailOptions): Promise<Result<SendMailOptions>> => {
  const { from, to, cc, bcc, subject, user, issuer, secret } = props;

  const otpAuth = authenticator.keyuri(user || issuer, issuer, secret);

  const qrCode = await buildQrCode(otpAuth);

  if (qrCode.isFailure) {
    return qrCode;
  }

  const email: SendMailOptions = {
    from,
    to,
    cc,
    bcc,
    subject: subject || `Your admin key for ${issuer}`,
    html: `Your code for Google authenticator is <b>${secret}</b> or scan the below QR code: <p><img src="cid:qrCode"/></p>`,
    attachments: [
      {
        cid: 'qrCode',
        path: qrCode.getValue(),
        filename: 'qrCode.png',
        contentType: 'image/png',
        encoding: 'base64',
      },
    ],
  };

  return Result.ok(email);
};

const buildQrCode = async (otpAuth: string): Promise<Result<any>> => {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(otpAuth, (err, imageUrl) => {
      if (err) {
        return reject(Result.fail(err));
      }
      return resolve(Result.ok(imageUrl));
    });
  });
};
