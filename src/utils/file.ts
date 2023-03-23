/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";

export const deleteFile = async (filename: string) => {

try{

  await fs.promises.stat(filename)
}catch{
  return ;
}
await fs.promises.unlink (filename)
};

