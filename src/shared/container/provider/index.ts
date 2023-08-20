import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider", DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider", new EtherealMailProvider
);

container.registerInstance<IStorageProvider>(
  "StorageProvider",
  new LocalStorageProvider
);

