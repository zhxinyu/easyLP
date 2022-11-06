import fetch from 'node-fetch';

const chainId = 1;
const subgraphUrl = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";


const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
}


let mintQ = `{
  mints(first: 20, orderBy: timestamp, orderDirection: desc) {
    timestamp
		pool {
		  id
		}
    amount
    amount0
    amount1
  }
}`;

let poolQ = (id) => {
  return `{
  pool(id: \"${id}\"){
  token0 {
    id
  }
  token1 {
    id
  }
  feeTier
  }
}`};

let tokenQ = (id) => {
  return `{
    token(id: \"${id}\"){
    symbol
    }
  }
  `}

let body = JSON.stringify({
  query: mintQ});

let response = fetch(subgraphUrl, {
  method: 'POST',
  headers,
  body,
}).then((res) => res.json())

let mints = (await response).data.mints;

for (const mint of mints){
  // console.log(mint.timestamp, mint.pool.id, mint.amount0, mint.amount1);
  // const queryEachRaw = poolQ(mint.pool.id);
  // console.log(queryEachRaw)
  let responseEach1 = fetch(subgraphUrl, {
    method: 'POST',
    headers,
    body:JSON.stringify({
      query: poolQ(mint.pool.id)}),
  }).then((res) => res.json()) 
  let token0 = (await responseEach1).data.pool.token0.id
  let token1 = (await responseEach1).data.pool.token1.id
  let feeTier = (await responseEach1).data.pool.feeTier
  let token0Symbol = (await fetch(subgraphUrl, {
    method: 'POST',
    headers,
    body:JSON.stringify({
      query: tokenQ(token0)}),
  }).then((res) => res.json()) ).data.token.symbol

  let token1Symbol = (await fetch(subgraphUrl, {
    method: 'POST',
    headers,
    body:JSON.stringify({
      query: tokenQ(token1)}),
  }).then((res) => res.json()) ).data.token.symbol  
  console.log("Trending mint activities:", new Date(mint.timestamp * 1000), `Pool ${token0Symbol}/${token1Symbol} with feeTier ${feeTier}. Despoit amount is ${mint.amount0}/${mint.amount1}`);
}
// console.log(mints)








//   return response
// }

  

    // const response = await fetch(
    //     `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3/${qs.stringify(params)}`
    // );
    
    // console.log(await response.json());
// }

// either sushiSwap or uniswap. 
// start('USDC', 'DAI', 50);
// export default start;