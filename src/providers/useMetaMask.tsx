import { MetaMaskSDK } from '@metamask/sdk';
import { ChainConfig } from '../typings/app';
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers';
import {
  createContext,
  ReactNode,
  useContext, useEffect,
  useMemo, useRef,
  useState,
} from 'react';

import { filecoinMainnet } from '../config/chains';
import {Linking} from "react-native";
import BackgroundTimer from 'react-native-background-timer';

const metamask = new MetaMaskSDK({
  openDeeplink: (link) => {
    Linking.openURL(link); // Use React Native Linking method or another way of opening deeplinks.
  },
  timer: BackgroundTimer, // To keep the dapp alive once it goes to background.
  dappMetadata: {
    name: 'GMN', // The name of your dapp.
  },
});

export interface AuthContextProps {
  login(): void;
  isAuthenticated: boolean;
  signer?: JsonRpcSigner;
  provider?: JsonRpcProvider;
  targetNetwork: ChainConfig;
}

export const MetaMaskContext = createContext<AuthContextProps>({
  login: () => '',
  isAuthenticated: false,
  targetNetwork: filecoinMainnet,
});

export const useMetaMask = (): AuthContextProps => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error(`useMetamask must be used within a MetaMaskProvider`);
  }
  return context;
};

type MetaMaskProviderProps = {
  children: ReactNode;
};

export default function MetaMaskProvider({ children }: MetaMaskProviderProps) {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [ready, setReady] = useState(false);
  const shouldInit = useRef(true);

  // initialize sdk
  useEffect(() => {
    if (!shouldInit.current) {
      return;
    }
    shouldInit.current = false;

    metamask.init().then(() => {
      setReady(true);
    });
  });
  const targetNetwork = useMemo(() => {
    return filecoinMainnet;
  }, []);

/*  useEffect(() => {
    metamask?.activeProvider?.on('accountsChanged', (accounts: any) => {
      if (accounts?.length === 0) {
        setSigner(undefined);
      } else {
        init();
      }
    });
    return () => {
      metamask?.activeProvider?.removeAllListeners('accountsChanged');
    };
  }, []);*/

  async function init() {
    //if (!metamask.activeProvider?.isConnected()) return;
    const provider = metamask.getProvider();
    if (!provider) return;
    const signerProvider = new BrowserProvider(metamask.getProvider(), 'any');
    if (signerProvider) {
      const signer = await signerProvider.getSigner();
      setSigner(signer);
    }
  }

  const value = useMemo(() => {
    return {
      signer,
      provider: undefined,
      targetNetwork,
      isAuthenticated: false,
      login: () => init()
    };
  }, [metamask, signer, targetNetwork]);

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}
