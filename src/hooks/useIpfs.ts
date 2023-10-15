import Config from 'react-native-config';
import { Buffer } from "buffer";
import {useEffect, useMemo, useState} from "react";

const projectId = Config.INFURA_API_KEY;
const projectSecret = Config.INFURA_API_SECRET;

const URI = 'https://ipfs.infura.io:5001/api/v0';

const base64 = Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

const headers = {
  Authorization: `Basic ${base64}`,
};

export type RequestState = {
  status: 'idle' | 'loading' | 'success' | 'error',
  data?: string;
  error?: Error;
  input?: Record<string, any>;
}

export function useIpfs() {
  const [uploadState, setUploadState] = useState<RequestState>({
    status: 'idle'
  });

  useEffect(() => {
    if (uploadState?.status === 'loading' && uploadState?.input) {
      upload(uploadState.input)
    }
  }, [uploadState]);

  async function initUpload (input: Record<string, any>) {
    if (input) {
      setUploadState({
        status: 'loading',
        input,
      })
    }
  }

  async function upload(input: Record<string, any>) {
    try {
      const jsonAsString = JSON.stringify(input);
      const jsonAsBuffer = Buffer.from(jsonAsString);

      const url = `${URI}/add?stream-channels=true&progress=false`;
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(jsonAsBuffer)], {
        type: 'application/json',
        lastModified: Date.now()
      });
      formData.append('path', blob);

      const result = await fetch(url, {
        headers,
        method: 'POST',
        body: formData,
      });
      if (result.ok) {
        const response = (await result?.json()) as Record<string, any>;
        setUploadState({
          status: 'success',
          data: response.Hash,
          error: undefined,
        })
      } else {
        console.log(result.headers)
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
