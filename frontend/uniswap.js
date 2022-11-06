import { ethers } from 'ethers'
import { Pool, Position} from '@uniswap/v3-sdk'
import { AlphaRouter } from '@uniswap/smart-order-router'
import { Token, CurrencyAmount,Fraction } from '@uniswap/sdk-core'

import abiInstance from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'  assert { type: 'json' };
const IUniswapV3PoolABI = abiInstance.abi
const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8'

const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/lffdFZ-4Vnmaj3yh1h7SPMr4SQfKYO62')
const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI, provider)
async function getPoolImmutables() {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
    poolContract.factory(),
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.tickSpacing(),
    poolContract.maxLiquidityPerTick(),
  ])

  const immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  }
  return immutables
}

async function getPoolState() {
  const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()])

  const PoolState = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  }

  return PoolState
}

const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()])
const router = new AlphaRouter({ chainId: 1, provider: provider })

const USDC = new Token(
  1,
  immutables.token0,
  6,
  'USDC',
  'USD Coin'
);

const WETH = new Token(
  1,
  immutables.token1,
  18,
  'WETH',
  'Wrapped Ether'
);

// // console.log(token0Balance,token1Balance);

const pool = new Pool(
  USDC,
  WETH,
  immutables.fee,
  state.sqrtPriceX96.toString(),
  state.liquidity.toString(),
  state.tick
);
const token0Balance = CurrencyAmount.fromRawAmount(USDC, '5000000000')
const token1Balance = CurrencyAmount.fromRawAmount(WETH, '0')
const position = new Position({
    pool,
    tickLower: -60,
    tickUpper: 60,
    liquidity: 1,
   });
// console.log(position);

// // console.log(await provider.getSigner().getAddress());
const routeToRatioResponse = await router.routeToRatio(
  token0Balance,
  token1Balance,
  position,
//   swapAndAddConfig: 
  {
     ratioErrorTolerance: new Fraction(1, 100),
     maxIterations: 6,
   }
);

const route = routeToRatioResponse.result

console.log(route.optimalRatio)
console.log(route.methodParameters)



// import { SwapToRatioStatus } from "@uniswap/smart-order-router";

// const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
// const MY_ADDRESS = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

// if (routeToRatioResponse.status == SwapToRatioStatus.success) {
//   const route = routeToRatioResponse.result
//   const transaction = {
//     data: route.methodParameters.calldata,
//     to: V3_SWAP_ROUTER_ADDRESS,
//     value: BigNumber.from(route.methodParameters.value),
//     from: MY_ADDRESS,
//     gasPrice: BigNumber.from(route.gasPriceWei),
//   };
// )

// await web3Provider.sendTransaction(transaction);
