import injected from '@dao-to-earth/lock/connectors/injected';
import walletconnect from '@dao-to-earth/lock/connectors/walletconnect';
import torus from '@dao-to-earth/lock/connectors/torus';
import portis from '@dao-to-earth/lock/connectors/portis';
import connectors from '@/helpers/connectors.json';
import walletlink from '@dao-to-earth/lock/connectors/walletlink';
import gnosis from '@dao-to-earth/lock/connectors/gnosis';

const options: any = { connectors: [] };
const lockConnectors = {
  injected,
  walletconnect,
  torus,
  walletlink,
  portis,
  gnosis
};

Object.entries(connectors).forEach((connector: any) => {
  options.connectors.push({
    key: connector[0],
    connector: lockConnectors[connector[0]],
    options: connector[1].options
  });
});

export default options;