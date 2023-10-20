
export type ChainConfig = {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export type RequestState<T> = {
  status: 'idle' | 'loading' | 'success' | 'error',
  data?: T;
  error?: Error;
}

export type AppLocation = {
  /**
   * The latitude in degrees.
   */
  latitude: number;
  /**
   * The longitude in degrees.
   */
  longitude: number;
  /**
   * The altitude in meters above the WGS 84 reference ellipsoid. Can be `null` on Web if it's not available.
   */
  altitude?: number | null;
  /**
   * The radius of uncertainty for the location, measured in meters. Can be `null` on Web if it's not available.
   */
  accuracy?: number | null;
  /**
   * The accuracy of the altitude value, in meters. Can be `null` on Web if it's not available.
   */
  altitudeAccuracy?: number | null;
  /**
   * Horizontal direction of travel of this device, measured in degrees starting at due north and
   * continuing clockwise around the compass. Thus, north is 0 degrees, east is 90 degrees, south is
   * 180 degrees, and so on. Can be `null` on Web if it's not available.
   */
  heading?: number | null;
  /**
   * The instantaneous speed of the device in meters per second. Can be `null` on Web if it's not available.
   */
  speed?: number | null;
};

export type MediaContent = {
  id: string;
  location: AppLocation;
}

export type Company = {
  name: string;
  logoUri: string;
}

export type Post = {
  id: string;
  company: Company;
  title: string;
  content: string;
}
