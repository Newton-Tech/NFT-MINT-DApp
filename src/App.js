import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3 from "web3";
import { Component } from "react";
import axios from "axios";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseExtension",
        type: "string",
      },
    ],
    name: "setBaseExtension",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newmaxMintAmount",
        type: "uint256",
      },
    ],
    name: "setmaxMintAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseExtension",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let contract = null;
let account = null;

const apikey = "M73U8C68ENT6DXCN7V6V8PV7CBZ48TEMEP";

const ADDRESS = "0xc6b45a2e27245Ecdd0A8e38BAbbFF7Fb44aBcCfD";
const endpoint = "https://api-goerli.etherscan.io/api";
const nftpng =
  "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/";

const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      alchemy: "T9gMmtxGkvQG2v3OzQyYuArUH685RIs_",
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "NFT MINT",
      alchemy: "T9gMmtxGkvQG2v3OzQyYuArUH685RIs_",
      rpc: "",
      chainId: 5,
      appLogoUrl: null,
      darkMode: true,
    },
  },
};

const web3Modal = new Web3Modal({
  network: "goerli",
  theme: "dark",
  cacheProvider: true,
  providerOptions,
});

async function connectwallet() {
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  await window.ethereum.send("eth_requestAccounts");
  var accounts = await web3.eth.getAccounts();
  account = accounts[0];
  document.getElementById("wallet-address").textContent = account;
  contract = new web3.eth.Contract(ABI, ADDRESS);
}

async function mint() {
  var _mintAmount = Number(document.querySelector("[name=amount]").value);
  var mintRate = Number(await contract.methods.cost().call());
  var totalAmount = mintRate * _mintAmount;
  contract.methods
    .mint(account, _mintAmount)
    .send({ from: account, value: String(totalAmount) });
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      balance: [],
      nftdata: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(
        endpoint +
          `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`
      )
      .then((outputa) => {
        this.setState({
          balance: outputa.data,
        });
        console.log(outputa.data);
      });

    await axios
      .get(
        endpoint +
          `?module=account&action=tokennfttx&contractaddress=${ADDRESS}&page=1&offset=100&tag=latest&apikey=${apikey}`
      )
      .then((outputb) => {
        const { result } = outputb.data;
        this.setState({
          nftdata: result,
        });
        console.log(outputb.data);
      });
  }

  render() {
    const { balance } = this.state;
    const { nftdata } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <form
              className="gradient col-lg-5 mt-5"
              style={{
                borderRadius: "25px",
                boxShadow: "1px 1px 15px #000000",
              }}
            >
              <h4 style={{ color: "#FFFFFF" }}>Mint Portal</h4>
              <h5 style={{ color: "#FFFFFF" }}>Please connect your wallet</h5>
              <Button
                onClick={connectwallet}
                style={{ marginBottom: "5px", color: "#FFFFFF" }}
              >
                Connect Wallet
              </Button>
              <div
                className="card"
                id="wallet-address"
                style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
              >
                <label htmlFor="floatingInput">Wallet Address</label>
              </div>
              <div
                className="card"
                style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
              >
                <input
                  type="number"
                  name="amount"
                  defaultValue="1"
                  min="1"
                  max="5"
                />
                <label>Please select the amount of NFTs to mint.</label>
                <Button onClick={mint}>Buy/Mint!</Button>
              </div>
              <label style={{ color: "#FFFFFF" }}>
                Price 0.05 ETH each mint.
              </label>
              <h5 style={{ color: "white", textShadow: "1px 1px 3px #000000" }}>
                {" "}
                Tokens Minted so far= {balance.result}/1000
              </h5>
            </form>
            <div className="row items mt-3">
              <div
                className="ml-3 mr-3"
                style={{
                  display: "inline-grid",
                  gridTemplateColumns: "repeat(4, 5fr)",
                  columnGap: "10px",
                }}
              >
                {nftdata.map((result) => {
                  return (
                    <div className="card">
                      <div className="image-over">
                        <img
                          className="card-img-top"
                          src={nftpng + result.tokenID + ".png"}
                          alt=""
                        />
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <h5 className="mb-0">
                            NEWTON_WHALSE COLLECTION #{result.tokenID}
                          </h5>
                          <h5 className="mb-0 mt-2">
                            Owner Wallet:
                            <p
                              style={{
                                color: "#39FF14",
                                fontWeight: "bold",
                                textShadow: "1px 1px 2px #000000",
                              }}
                            >
                              {result.to}
                            </p>
                          </h5>
                          <div className="card-bottom d-flex justify-content-between">
                            <Button className="btn btn-bordered-white btn-smaller mt-3">
                              <i className="mr-2" />
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
