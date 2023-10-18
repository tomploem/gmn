import * as FileSystem from 'expo-file-system';

export const blobToBase64 = async (uri: string) => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64;
};
