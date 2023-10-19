import React, { useState, useEffect} from 'react';
import {LocationObjectCoords} from "expo-location";
import {View} from "react-native";
import SelectContent from "./selectContent";
import UploadContent from "./upload";
import {RequestState} from "../../typings/app";
import {Props} from "../../typings/router";

export function CreateContent ({ navigation }: Props<'CreateContent'>) {
  const [locationCid, setLocationCid] = useState<string>();
  const [imageCid, setImageCid] = useState<string>();
  const [requestState, setRequestState] = useState<RequestState<string>>({
    status: 'idle'
  })

  useEffect(() => {
    if (requestState.status === 'loading') {
      if (locationCid && imageCid)
        handleOnChainSave(locationCid, imageCid);
    } else if (requestState.status === 'success' && requestState.data) {
      navigation.navigate('Post', {
        id: requestState.data
      })
    }
  }, [requestState]);

  useEffect(() => {
    return () => {
      setImageCid(undefined);
      setLocationCid(undefined);
    }
  }, []);

  useEffect(() => {
    if (locationCid && imageCid && locationCid?.length > 0 && imageCid?.length > 0) {
      setRequestState({
        status: 'loading',
      })
    }
  }, [locationCid, imageCid]);

  function handleOnChainSave(locationCid: string, imageCid: string) {
    // Interact with metamask
    setRequestState({
      status: 'success',
      data: '0x3b67423b5d7f44abac4da1422caa446f8089ef9a44c5bd0af12d0239d5cf8039'
    })

  }

  return (
    <View>
      {
        !imageCid
          ? <SelectContent setImageCid={setImageCid} imageCid={imageCid} />
          : <UploadContent setLocationCid={setLocationCid} />
      }
    </View>
  );
};
