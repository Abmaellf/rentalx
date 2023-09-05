import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";

require('dotenv').config()

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider", DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider", new EtherealMailProvider
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider

}
container.registerSingleton<IStorageProvider>(
  "StorageProvider", // LocalStorageProvider | S3StorageProvider
  diskStorage[process.env.disk]
);

