import {RouteWrapper} from "./src/router";
import MetaMaskProvider from "./src/providers/useMetaMask";

export default function App() {
  return (
    <MetaMaskProvider>
      <RouteWrapper />
    </MetaMaskProvider>
  );
}
