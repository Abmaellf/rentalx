
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from "../IDateProvider";
dayjs.extend(utc);


  class DayjsDateProvider implements IDateProvider {
    
    
    compareInHours(start_date: Date, end_date: Date): number {
      const end_date_utc = this.convertToUTC(end_date);
      const start_date_utc = this.convertToUTC(start_date);

      return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'h')
    }


    convertToUTC(date: Date):string {
      return dayjs(date).utc().local().format();
    }


    dateNow():Date {
      return dayjs().toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
      const end_date_utc = this.convertToUTC(end_date);
      const start_date_utc = this.convertToUTC(start_date);

      return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'd')
    }

    addDays(days: number): Date {
       return dayjs().add(days, "days").toDate();
      
    }
   

  }
  export { DayjsDateProvider };