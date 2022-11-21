<img src="./icon.jpg" width="200">

# easyLP

ETH San Francisco 2022 [link](https://ethglobal.com/showcase/easylp-8o44q)

## Introduction

Liquidity Providers (LP) UI for trending activities and easy swap/exchange for best price available across DEX and provide pair liquidity in one single click.

## Project Description

This project aims to provide an easy tool to help liquidity providers (LP) make better decisions on tokens minting in decentralized exchange centers.

- Motivation: In general, there are two folds of inconvenience during LPing. First, the simplicity of most of the existing pooling UI interfaces lacks sufficient information regarding the minting/pooling activities which makes it difficult for LPs to make more judicious and timing decisions. Although there is information elsewhere to grasp, for instance, GraphQL or Mysql, the complicity of information retrieving using query language bears another layer of burden for the LP. Secondly, an LP typically needs to have a pair of tokens in his or her digital wallet before providing the pair liquidity in DEX. For instance, one needs to have a sufficient amount of ETH and USDC at the same time if she wants to provide liquidity for the ETH/USDC pair. Therefore, one needs to swap for the required token if he or she only has one single token, which incurs additional transaction costs from swap. Furthermore, the swapped token may not be 100% used for liquidity as the required tokens ratio varies across different DEX and fluctuates in the volatile market, which induces diversification cost (e.g. another transaction cost will be endured if the remaining swapped token is swapped backward.)

- Solution: We add two features to tackle the inconveniences during LPs. Firstly, we provide a front end to illustrate some relevant LP activities, which could help LP for making a better mint decision. Secondly, we provide an easy venue, a front-end button, which under the hood will go through easy swap/exchange for the best price available across dex and provide pair liquidity in one single transaction.

## How it's Made

The project will take the current [UI](https://app.uniswap.org/#/add/) for Uniswap V3 pool as a base point. We inherit the UI as a kickstart and illustrate the concept of our easyLP tool based on Uniswap V3.

The project can be decomposed into two parts frontend and smart contract. 

- Frontend: Besides basic functionality (e.g. select pair), we utilize the Graph to highlight some key indicators for liquidity activities at the front end, which facilitates LPs to deploy strategic and tactic methods in real-time. It will fetch the market price for the selected pair using 0x swap API which proclaims to provide the current price market as well as the best swap/exchange strategy.

- Smart Contract: a single-stop contract that wraps both swapping and minting: swap for tokens with the best price available and mint for liquidity. In particular, swap action takes in the best swap/exchange strategy from 0x swap API and calls corresponding swap contracts (e.g. Uniswap, Sushiswap and etc. )based on the aforementioned strategy so as to prepare the sufficient but only necessary(keep leftover as small as possible) pair token amount. Mint action will call Uniswap liquidity contract to generate positions.

