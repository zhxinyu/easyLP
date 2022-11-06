import { Button, Table, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";
import { default as DynamicForm } from "./DynamicForm"
import { Address, Balance, Events } from "../components";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  // const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const columns = [
    {
      title: 'Mint activities',
      dataIndex: 'content',
      key: 'content',
    },
  ];
  const data = [
    {
      key: '1',
      content: '1. 2022-11-06T15:23:35.000Z Pool LUNA/WETH with feeTier 10000. Despoit amount is 4000000/0.378606467109749864',
    },
    {
      key: '2',
      content: '2. 2022-11-06T15:23:23.000Z Pool UNI/LINK with feeTier 3000. Despoit amount is 1922.00915500951286201/2033',
    },
    {
      key: '3',
      content: '3. 2022-11-06T15:23:23.000Z Pool WBTC/WETH with feeTier 3000. Despoit amount is 0.18462693/1.49406217093113745',
    },
    {
      key: '4',
      content: '4.  2022-11-06T15:16:35.000Z Pool SHIB/WETH with feeTier 3000. Despoit amount is 4353998.363148947041030317/0.030167542859335922',
    },
    {
      key: '5',
      content: '5. 2022-11-06T15:15:23.000Z Pool APE/WETH with feeTier 3000. Despoit amount is 2006.651644259999999671/3.508855012401110591',
    },            
  ];

  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 8, width: 1000, margin: "auto", marginTop: 64 }}>
        <h1 align="justify">Trending:</h1>
        {/* <!-- Data retrieved from the Graph endpoint.--> */}
        <Table columns={columns} dataSource={data} />
        <Button type="primary">Refresh</Button>
      </div>
      <div style={{ border: "1px solid #cccccc", padding: 8, width: 1000, margin: "auto", marginTop: 64 }}>
        <h1 align="justify">Add Liquidity</h1>
        <DynamicForm
        // tx={tx}
        // writeContracts={writeContracts}
        />
        <Divider />
      </div>
    </div>
  );
}

export default Home;
