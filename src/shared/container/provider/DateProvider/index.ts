import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";



require('dotenv').config()

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider", DayjsDateProvider
);
