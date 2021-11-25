export type DateISOString = string; // "2021-11-23T11:10:43.102Z"
export type XAmzDate = string; // "20211123T111043102Z"
export type DateYMD = string; // "20211123"

export interface Config {
  bucketName: string;
  dirName?: string;
  region: string;
  acl?: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  s3Url?: string;
}

type ObjString = {
  [key: string]: string;
};

type Conditions = [
  ObjString,
  ObjString,
  string[],
  string[],
  string[],
  ObjString,
  ObjString,
  ObjString,
  ObjString,
  ObjString,
  ObjString?,
];

export type Policy = {
  conditions: Conditions;
  expiration: DateISOString;
};

export type UploadResponse = {
  bucket: string;
  key: string;
  location: string;
  status: number;
};

export type DeleteResponse = {
  ok: boolean;
  status: number;
  message: string;
  fileName: string;
};
