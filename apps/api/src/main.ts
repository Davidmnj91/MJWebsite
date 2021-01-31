import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as expressPino from 'express-pino-logger';
import { Server } from 'http';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { connectionOpts } from './app/infra/db';
import { logger } from './app/infra/logger';
import { createGmailTransport } from './app/modules/mail/providers/GmailProvider';
import { mailService } from './app/modules/mail/service';
import { createAdminEmailTemplate } from './app/modules/mail/templates/AdminEmailTemplate';

class App {
  public express: express.Application;
  public server: Server;
  public port = process.env.API_PORT;
  public connection: Connection;

  constructor() {
    createConnection(connectionOpts).then(async () => {
      this.express = express();

      this.express.use(cors());

      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: true }));

      const expressLogger = expressPino(logger);
      this.express.use(expressLogger);

      this.express.use(fileUpload({ useTempFiles: true }));

      // this.sendCredentialsEmail();

      const { v1Router: router } = await import('./app/infra/api/v1');
      this.express.use('/api', router);

      this.express.get('/', (req, res) => {
        res.send({ message: 'Welcome to api!' });
      });

      this.server = this.express.listen(this.port);
    });
  }

  private async sendCredentialsEmail() {
    const mailUser = process.env.MAIL_USERNAME;
    const mailPasword = process.env.MAIL_PASSWORD;
    const from = process.env.MAIL_DEFAULT_SENDER;
    const to = process.env.MAIL_RECEIPTMENTS;

    const issuer = process.env.AUTH_ISSUER;
    const secret = process.env.AUTH_SECRET;

    const template = createAdminEmailTemplate({ from, to, issuer, secret });

    const transport = createGmailTransport(mailUser, mailPasword);

    mailService.sendMail(transport, template);
  }
}

export default new App();
