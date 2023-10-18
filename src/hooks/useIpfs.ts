import Config from 'react-native-config';
import { Buffer } from "buffer";
import {useEffect, useMemo, useState} from "react";
import {RequestState} from "../typings/app";
import {blobToBase64} from "../utils/image.utils";

const projectId = Config.INFURA_API_KEY;
const projectSecret = Config.INFURA_API_SECRET;

const URI = 'https://ipfs.infura.io:5001/api/v0';

const base64 = Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${base64}`,
};

type UploadType = 'image' | 'json';

type IpfsRequestState<T> = {
  input?: Record<string, any>;
} & RequestState<T>;

export function useIpfs<T>(type: UploadType) {
  const [uploadState, setUploadState] = useState<IpfsRequestState<T>>({
    status: 'idle',
  });

  useEffect(() => {
    if (uploadState?.status === 'loading' && uploadState?.input) {
      upload(uploadState.input)
    }
  }, [uploadState]);

  async function initUpload (input: Record<string, any>) {
    if (input) {
      console.log('init upload')
      setUploadState({
        status: 'loading',
        input,
      })
    }
  }

  async function prepareFileUpload (uri: string): Promise<BodyInit_> {
    const base64 = await blobToBase64(uri);

    const formData = new FormData();
    formData.append('file', {
      name: 'myfile.jpg',
      type: 'image/jpeg',
      uri,
    });
    return formData;
  }

  async function prepareJsonUpload (input: Record<string, any>): Promise<FormData> {
    const jsonAsString = JSON.stringify(input);
    const jsonAsBuffer = Buffer.from(jsonAsString);
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(jsonAsBuffer)], {
      type: 'application/json',
      lastModified: Date.now()
    });
    formData.append('path', blob);
    return formData;
  }

  async function upload(input: Record<string, any>) {
    try {

      const body = type === 'image'
        ? await prepareFileUpload(input.uri)
        : await prepareJsonUpload(input);

      const url = `${URI}/add?stream-channels=true&progress=false`;

      const result = await fetch(url, {
        method: 'POST',
        headers: headers,
        body,
      });
      if (result.ok) {
        const response = (await result?.json()) as Record<string, any>;
        setUploadState({
          status: 'success',
          data: response.Hash,
          error: undefined,
        })
      } else {
        const res = await result.text();
        setUploadState({
          status: 'error',
          data: undefined,
          error: undefined,
        })
      }
    } catch (error) {
      console.log(error);
      setUploadState({
        status: 'error',
        data: undefined,
        error:  error as Error
      })
    }

  }

  return useMemo(() => ({
    upload : initUpload,
    loading: uploadState.status === 'loading',
    hasError: uploadState.status === 'error',
    error: uploadState.error,
    data: uploadState.data
  }), [upload, uploadState]);
}
