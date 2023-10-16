import { ChainConfig } from '../typings/app';

export const localNetwork: ChainConfig = {
  chainId: '0x539',
  chainName: 'localhost',
  rpcUrls: ['http://127.0.0.1:7545'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};

export const filecoinMainnet: ChainConfig = {
  chainId: '0x314',
  chainName: 'Filecoin Mainnet',
  rpcUrls: ['https://rpc.ankr.com/filecoin'],
  nativeCurrency: {
    name: 'Filecoin',
    symbol: 'FIL',
    decimals: 18,
  },
};
