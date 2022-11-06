import { ethers } from 'ethers'
import { AlphaRouter } from '@uniswap/smart-order-router'
import { Token, CurrencyAmount,TradeType, Percent } from '@uniswap/sdk-core'

const web3Provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/lffdFZ-4Vnmaj3yh1h7SPMr4SQfKYO62')
const MY_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
// await web3Provider.getSigner().getAddress();

const router = new AlphaRouter({ chainId: 1, provider: web3Provider });

const WETH = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

const USDC = new Token(
  1,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
);

const typedValueParsed = '100000000000000000000'
const wethAmount = CurrencyAmount.fromRawAmount(WETH, '100000000000000000000');

const route = await router.route(
  wethAmount,
  USDC,
  TradeType.EXACT_INPUT,
  {
    recipient: MY_ADDRESS,
    slippageTolerance: new Percent(5, 100),
    deadline: Math.floor(Date.now()/1000 +1800)
  }
);

console.log(route)
// console.log(`Quote Exact In: ${route.quote.toFixed(2)}`);
// console.log(`Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`);
// console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);

// const transaction = {
//   data: route.methodParameters.calldata,
//   to: V3_SWAP_ROUTER_ADDRESS,
//   value: BigNumber.from(route.methodParameters.value),
//   from: MY_ADDRESS,
//   gasPrice: BigNumber.from(route.gasPriceWei),
// };

// await web3Provider.sendTransaction(transaction);