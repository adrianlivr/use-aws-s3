# use-aws-s3

Open Source React Hook to Upload your Media and files into AWS S3 Bucket directly from Front-end React.

# React AWS-S3 Hook

UseAwsS3 - A TypeScript Library for AWS S3 File Upload

Using NPM

```
npm install --save @adrianlivr/use-aws-s3
```

Using Yarn

```
yarn add @adrianlivr/use-aws-s3
```

# Examples Uploading An Image

## **Uploading to S3**

```js
import useAwsS3 from '@adrianlivr/use-aws-s3';

const config = {
  bucketName: 'myBucket',
  dirName: 'images', /* optional */
  region: "sa-east-1",
  acl: 'public-read', /* optional */
  accessKeyId: "ASIATQHVNYDZBA5X5DA5",
  secretAccessKey: "MsUdE5aWIUqnLiV94WK/gMY5SeaJMxwQ6KC0XTFZ",
  sessionToken: "FwoGZXIvYXdzEDYaDE4fVPKSWJ7YIHNYiSKrAdfKL7AeV//osgA9eD34MZbmdYxus5E4ulBg3F6pfA2LaPfvX7/we2bVV421GO7UJ9GoDyBHBj0TGpwNzy61OvFyCELyKeDdmjhF6s9p/aDYMcLLOJNlQSHHmmPoltGTSVeoUP3QjHBrSWXVKeUAHCswD4OzcuEegolEtXpvIoOMOmUxValLhhYUugMEe4CliQ2tNQ8nEZunA3zNhaaICvT+N0IAj7SsbmrhLyilr6/9BTIt7kni9GwSI+J6by546vkVmdy7PG/YF1YZsW6voU48i9yHwt+tnOR7blVGzh5n" /* optional */
  s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}

const { uploadFile, uploadResult } = useAwsS3(config);
/*  Notice! That if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

/* This is optional */
const newFileName = 'test-file';

const [result] = uploadResult!
const data = await uploadFile(file, newFileName)

if(data.ok && !data.ok) {
  console.log('Failed to upload this file')
}

console.log(data, result.data)

  /**
   * {
   *   bucket: "myBucket",
   *   key: "image/test-image.jpg",
   *   location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
   * },
   * {
   *   bucket: "myBucket",
   *   key: "image/test-image.jpg",
   *   location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
   * },
   */
```

## **Deleting an existing file in your bucket**

In this case the file that we want to delete is in the folder 'photos'

```js
import useAwsS3 from '@adrianlivr/use-aws-s3';

const config = {
  bucketName: 'myBucket',
  dirName: 'images', /* optional */
  region: "sa-east-1",
  acl: 'public-read', /* optional */
  accessKeyId: "ASIATQHVNYDZBA5X5DA5",
  secretAccessKey: "MsUdE5aWIUqnLiV94WK/gMY5SeaJMxwQ6KC0XTFZ",
  sessionToken: "FwoGZXIvYXdzEDYaDE4fVPKSWJ7YIHNYiSKrAdfKL7AeV//osgA9eD34MZbmdYxus5E4ulBg3F6pfA2LaPfvX7/we2bVV421GO7UJ9GoDyBHBj0TGpwNzy61OvFyCELyKeDdmjhF6s9p/aDYMcLLOJNlQSHHmmPoltGTSVeoUP3QjHBrSWXVKeUAHCswD4OzcuEegolEtXpvIoOMOmUxValLhhYUugMEe4CliQ2tNQ8nEZunA3zNhaaICvT+N0IAj7SsbmrhLyilr6/9BTIt7kni9GwSI+J6by546vkVmdy7PG/YF1YZsW6voU48i9yHwt+tnOR7blVGzh5n" /* optional */
  s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}

const { uploadFile, deleteResult } = useAwsS3(config);
const filename = 'hello-world.docx';

/* If the file that you want to delete it's in your bucket's root folder, don't provide any dirName in the config object */

//In this case the file that we want to delete is in the folder 'photos' that we referred in the config object as the dirName

const deleted = await deleteFile(filename)
const [result] = deleteResult!

if(deleted.ok && !deleted.ok) {
  console.log('Failed to delete this file')
}

console.log(data, result.data)


  /**
   * {
   *    ok: true,
   *    status: 204,
   *    message: 'File deleted',
   *    fileName: 'hello-world.docx'
   * },
   * {
   *    ok: true,
   *    status: 204,
   *    message: 'File deleted',
   *    fileName: 'hello-world.docx'
   * }
   */
```

Defaults your bucket to `public-read` : http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html

`config`

- `bucketName` **required** - Your S3 bucket
- `dirName` **required** - Your S3 folderName/dirName
- `acl` **optional** - Your AWS S3 ACL
- `region` **required** - Your S3 bucket's region
- `accessKeyId` **required** - Your S3 `AccessKeyId`
- `secretAccessKey` **required** - Your S3 `SecretAccessKey`
- `sessionToken` **optional** - Your secure token for use temp credentials
- `s3Url` **optional** - Your S3 URL

## License

## **S3 Bucket Policy**

Doc: http://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html

MIT
