import { Result } from '@mj-website/monads';
import { fail } from 'assert';
import { logger } from '../../../infra/logger';
import { mailProviderFactory } from '../providers';
import { MailProviderProps } from '../providers/MailProvider';
import { emailTemplateFactory } from '../templates';
import { MailTemplateProps } from '../templates/EmailTemplate';

export class MailService {
  async sendMail(providerProps: MailProviderProps, mailProps: MailTemplateProps): Promise<Result<void>> {
    try {
      const provider = mailProviderFactory.build(providerProps);
      const mail = await emailTemplateFactory.build(mailProps);

      if (mail.isFailure) {
        throw mail.error;
      }

      await provider.sendMail(mail.getValue());

      return Result.ok();
    } catch (err) {
      logger.error({ err }, `There was an error sending email`);
      return fail(err);
    }
  }
}
