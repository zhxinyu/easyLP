// import start from "./0xapi/0xapi.js";
// const start = require("./0xapi/0xapi.js");
import { Pool } from '@uniswap/v3-sdk'
import { ethers } from 'ethers'

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')
