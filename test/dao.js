const ethers = require(`ethers`);

const providerSepolia = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/3uvxjzVO19PqwZSiiprJ7nCa2vm0zDlc");

const privateKey = "5db83f2b447702e2bc18a8ea57773f0115cfbfd4d627ae6a66a08de461d7806d";
const wallet = new ethers.Wallet(privateKey, providerSepolia);
const daoAddress = "0x100669C6E4496038776A229d99dE418422e0E9b5";

const daoAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "burnForMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposalId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_voteType",
                "type": "bool"
            }
        ],
        "name": "daoMemberVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_proposal",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "MemberApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            }
        ],
        "name": "MemberPledged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "MemberRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "MemberUnlocked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_unlockTime",
                "type": "uint256"
            }
        ],
        "name": "pledge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "unlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "BURN_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MAX_VOTE_DIVIDEND",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "memberBalanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "members",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "pledgeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pledgeStartTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pledgeUnlockTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MIN_QUALIFICATION_LIMIT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proposal",
        "outputs": [
            {
                "internalType": "contract VicProposal",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "receiptTable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "processed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract VicToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "vevicBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "vevicUpdateTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const contractDao = new ethers.Contract(daoAddress, daoAbi, wallet);

const tokenAddress = "0x46EAf3205b4a0D87da3538e76905A977c1793552";
const lixiangPublicAddress = "0xeea78E4B6bf6BE675f96Bb4cbeDFd7a89Bdb18f6";

const tokenAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_proposal",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "MemberApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            }
        ],
        "name": "MemberPledged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "MemberRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "MemberUnlocked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "BURN_RATE",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MAX_VOTE_DIVIDEND",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MIN_QUALIFICATION_LIMIT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "burnForMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposalId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_voteType",
                "type": "bool"
            }
        ],
        "name": "daoMemberVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "memberBalanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "members",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "pledgeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pledgeStartTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pledgeUnlockTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_unlockTime",
                "type": "uint256"
            }
        ],
        "name": "pledge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "proposal",
        "outputs": [
            {
                "internalType": "contract VicProposal",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "receiptTable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "unlockTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "processed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract VicToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "unlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "vevicBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "vevicUpdateTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const contractToken = new ethers.Contract(tokenAddress, tokenAbi, wallet);

const main = async () => {
    const publicAddress = await wallet.getAddress();
    console.log(`钱包地址${publicAddress}`);

    // const oneToken = ethers.BigNumber.from("100000000000000000");
    const gasPrice = ethers.utils.parseUnits('50', 'gwei');
    const transactionObject = {
        gasPrice: ethers.utils.parseUnits('1.5', 'gwei'),
        gasLimit: 2000000,
    };

    // const myBalance = await contractDao.memberBalanceOf(publicAddress);
    console.log(gasPrice);

    const averageGasPrice = await providerSepolia.getGasPrice();
    console.log("打印gasPrice");
    // console.log()
    console.log(averageGasPrice);

    // const v = await contractDao.burnForMember("0x45B5b7E140B1ce14337B03F65A7948eFCd5CE077", {
    //     gasLimit: 2000000,
    //     gasPrice: ethers.utils.parseUnits("1.5", "gwei")
    // });
    // console.log(`======v=${v}`);
    // console.log(vote)

    console.log("对ID为0的提案投同意")
    const vote = await contractDao.daoMemberVote(0, true, {
        gasLimit: 2000000,
        gasPrice: ethers.utils.parseUnits("1.5", "gwei")
    });
    console.log("投票成功");
    console.log(vote)

    // console.log(ethers.utils.formatUnits(vote.value));

    // console.log("授权使用VIC代币");
    // const oneVic = ethers.utils.formatUnits(oneToken, 0);
    // console.log(oneVic);
    // console.log(typeof oneVic);
    // await contractToken.approve(daoAddress, oneVic);
    // console.log("授权成功");


    // console.log("质押前余额");
    // const afterPledgeAmount = await contractDao.memberBalanceOf(publicAddress);
    // console.log(ethers.utils.formatUnits(afterPledgeAmount));
    // console.log("正在质押");
    // await contractDao.pledge(oneVic, 1685473300);
    // console.log("质押成功");

    // const lixiangPledgeAmount = await contractDao.memberBalanceOf(lixiangPublicAddress);
    // console.log(`李祥地址质押代币${ethers.utils.formatUnits(lixiangPledgeAmount)}`);

    // const pledgeAmount = await contractDao.memberBalanceOf(publicAddress);
    // console.log(`我的地址质押的代币${ethers.utils.formatUnits(pledgeAmount)}`);
}
main()
