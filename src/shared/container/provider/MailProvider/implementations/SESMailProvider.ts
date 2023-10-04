import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs"

require('dotenv').config()

var AWS = require('aws-sdk');

  @injectable()
  class SESMailProvider implements IMailProvider {

    private client: Transporter;

    constructor(){ 
      this.client = nodemailer.createTransport({
        SES: new AWS.SES({
          apiVersion: "2010-12-01",
          region: process.env.AWS_REGION,
          //region: "sa-east-1"
          //defaultProvider,
         })
       })              
    }

    async sendMail(
      to: string, 
      subject: string, 
      variables: any, 
      path: string
      ): Promise<void> {

      const templateFileContent = fs.readFileSync(path).toString("utf-8");

      const templateParse = handlebars.compile(templateFileContent);

      const templateHtml = templateParse(variables);

       await this.client.sendMail({
        to,
        from: "Rentx <contato@anacristinafisioterapia.com.br>",
        subject,
        html: templateHtml,
      });
    }
  }
  export { SESMailProvider };