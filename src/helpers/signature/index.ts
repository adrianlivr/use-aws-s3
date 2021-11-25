import { Config, DateYMD } from '../../types';
import * as Crypto from 'crypto-js';

type WordArray = Crypto.lib.WordArray;

export function getSignature(
  config: Config,
  date: DateYMD,
  policyBase64: string,
): string {
  const getSignatureKey = (
    key: string,
    dateStamp: DateYMD,
    regionName: string,
  ): WordArray => {
    const kDate: WordArray = Crypto.HmacSHA256(dateStamp, 'AWS4' + key);
    const kRegion: WordArray = Crypto.HmacSHA256(regionName, kDate);
    const kService: WordArray = Crypto.HmacSHA256('s3', kRegion);
    const kSigning: WordArray = Crypto.HmacSHA256('aws4_request', kService);
    return kSigning;
  };
  const signature = (policyEncoded: string): string => {
    return Crypto.HmacSHA256(
      policyEncoded,
      getSignatureKey(config.secretAccessKey, date, config.region),
    ).toString(Crypto.enc.Hex);
  };
  return signature(policyBase64);
}
