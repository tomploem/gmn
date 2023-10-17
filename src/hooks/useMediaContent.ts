import {useEffect, useMemo, useState} from "react";
import {MediaContent, RequestState} from "../typings/app";

const arr: MediaContent[] = [
  {
    id: '1',
    location: { latitude: 51.0258, longitude: 4.4779 }
  },
  {
    id: '2g',
    location: { latitude: 51.0182, longitude: 4.4826 }
  }
]


export function useMediaContent () {
  const [fetchState, setFetchState] = useState<RequestState<MediaContent[]>>({
    status: 'idle'
  });

  useEffect(() => {
    if (fetchState?.status === 'loading') {
      setFetchState({
        status: 'loading',
      });
      setTimeout(() => {
        setFetchState({
          data: arr,
          status: 'success',
        })
      }, 1000)
    }
  }, [fetchState]);

  return useMemo(() => ({
    loading: fetchState.status === 'loading',
    hasError: fetchState.status === 'error',
    error: fetchState.error,
    data: arr,
  }), [fetchState]);
}
