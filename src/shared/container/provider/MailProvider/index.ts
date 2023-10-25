import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";
import { env } from 'node:process';

// require('dotenv').config()

 const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  "MailProvider",   mailProvider[env.MAIL_PROVIDER]
);