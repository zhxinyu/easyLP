import fetch from 'node-fetch';
import qs from 'qs'

const start = async function(sellToken, buyToken, amount){
    var amountInDecimal = amount;

    switch(sellToken) {
        case "ETH":
            amountInDecimal = amountInDecimal*10**18;
          break;
        case "USDC":
            amountInDecimal = amountInDecimal*10**6;
          break;
        default:
          // code block
      }

    const params = {
        sellToken: sellToken,
        buyToken: buyToken,
        sellAmount: amount*10**6
    }
    console.log(params);

    const response = await fetch(
        `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
    );
    
    console.log(await response.json());
}

// either sushiSwap or uniswap. 
start('USDC', 'DAI', 50);
// export default start;