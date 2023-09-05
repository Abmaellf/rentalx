import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from './simpleClient'

import * as fs from "fs";
import mime from "mime";
import { resolve } from "path"; 

import { IStorageProvider } from "../IStorageProvider";
import upload from '@config/upload';

  class S3StorageProvider implements IStorageProvider {
   
    constructor(){}

    async save(file: string, folder: string): Promise<any> {

      const originalName = resolve(upload.tmpFolder, file);
      const fileContent = await fs.promises.readFile(originalName);
      const ContentType =  mime.getType(originalName);

      const params = {
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: file,
        ACL: "public-read", 
        Body: fileContent,
        ContentType
      };

      try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log( "Successfully created " + params.Key + " and uploaded it to " +
            params.Bucket + "/" + params.Key
        );
       return results; 
       // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }

      await fs.promises.unlink(originalName);

      return file;
    }

    async delete(file: string, folder: string): Promise<void> {
      // await this.s3Client.deleteObject({
      //   // Bucket: `${process.env.AWS_BUCKET}${folder}`,
      //   Bucket:'abmael-api-rentx/'+folder,
      //   Key: file,
      // })
    }    
  }
  
  export { S3StorageProvider };