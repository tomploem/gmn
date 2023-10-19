import {Buffer} from "buffer";
import Config from "react-native-config";
import {useEffect, useMemo, useState} from "react";
import {RequestState} from "../typings/app";
import { readAsStringAsync, EncodingType } from 'expo-file-system'

const URI = 'https://ipfs.infura.io:5001/api/v0';
const projectId = Config.INFURA_API_KEY;
const projectSecret = Config.INFURA_API_SECRET;

const base64 = Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

const headers = {
  Authorization: `Basic ${base64}`,
};

export function useIpfsRead<T>(cid: string) {
  const [fetchState, setFetchState] = useState<RequestState<T>>({
    status: 'loading',
  })

  useEffect(() => {
    readFile(cid)
  }, [cid]);

  async function readFile(cid: string) {

    try {
      const url = `${URI}/cat?arg=${cid}`;
      const response = await fetch(url, { headers, method: 'POST' });
      const buffer = await response.arrayBuffer();

      let base64Flag = 'data:image/jpeg;base64,';
      let base64 = Buffer.from(buffer).toString('base64');



      setFetchState({
        status: 'success',
        data: base64 as T,
      })
    } catch (err) {
      console.error('Could not parse response:', err);
    }
  }


  return useMemo(() => ({
    data: fetchState.data,
    loading: fetchState.status === 'loading',
    hasError: fetchState.status === 'error',
    error: fetchState.error,
  }), [fetchState])
}
