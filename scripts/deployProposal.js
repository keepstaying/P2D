const ethers = require(`ethers`);

const providerSepolia = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/3uvxjzVO19PqwZSiiprJ7nCa2vm0zDlc");

const privateKey = "5db83f2b447702e2bc18a8ea57773f0115cfbfd4d627ae6a66a08de461d7806d";
const wallet = new ethers.Wallet(privateKey, providerSepolia);

const proposalAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
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
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            }
        ],
        "name": "ProposalApproved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            }
        ],
        "name": "ProposalCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            }
        ],
        "name": "ProposalRejected",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MAX_VOTE_DURATION",
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
        "name": "MAX_VOTE_PERCENTAGE",
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
        "name": "MIN_VOTE_DURATION",
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
        "name": "MIN_VOTE_PERCENTAGE",
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
        "name": "clearHasVoted",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_repayTime",
                "type": "uint256"
            }
        ],
        "name": "createProposal",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getProposalsLength",
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
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "proposals",
        "outputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "nftId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalAgreeVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalDisagreeVotes",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "repayTime",
                "type": "uint256"
            },
            {
                "internalType": "enum VicProposal.ProposalStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposalId",
                "type": "uint256"
            }
        ],
        "name": "repay",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "voter",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_proposalId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "voteType",
                "type": "bool"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const byteCodeProposal = '60806040523480156200001157600080fd5b5060405162001bb638038062001bb68339818101604052810190620000379190620000e8565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200011a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000b08262000083565b9050919050565b620000c281620000a3565b8114620000ce57600080fd5b50565b600081519050620000e281620000b7565b92915050565b6000602082840312156200010157620001006200007e565b5b60006200011184828501620000d1565b91505092915050565b611a8c806200012a6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806343ab637e1161007157806343ab637e146101845780638634f038146101a25780639f958f57146101d2578063bc378a73146101f0578063e1a025771461020e578063fc0c546a1461022a576100b4565b8063013cf08b146100b957806309eef43e146100f25780631ecbb9de146101225780632187433f14610140578063371fd8e61461014a5780633eedfc1014610166575b600080fd5b6100d360048036038101906100ce9190611076565b610248565b6040516100e99a9998979695949392919061116a565b60405180910390f35b61010c60048036038101906101079190611232565b6102f9565b604051610119919061127a565b60405180910390f35b61012a610319565b6040516101379190611295565b60405180910390f35b610148610320565b005b610164600480360381019061015f9190611076565b610371565b005b61016e610674565b60405161017b9190611295565b60405180910390f35b61018c61067b565b6040516101999190611295565b60405180910390f35b6101bc60048036038101906101b791906112b0565b610680565b6040516101c99190611295565b60405180910390f35b6101da610a9b565b6040516101e79190611295565b60405180910390f35b6101f8610aa0565b6040516102059190611295565b60405180910390f35b61022860048036038101906102239190611357565b610aad565b005b610232610f44565b60405161023f9190611409565b60405180910390f35b6001818154811061025857600080fd5b90600052602060002090600b02016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600201549080600301549080600401549080600501549080600601549080600701549080600901549080600a0160009054906101000a900460ff1690508a565b60026020528060005260406000206000915054906101000a900460ff1681565b62278d0081565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055565b60006001828154811061038757610386611424565b5b90600052602060002090600b0201600901549050428110156103a857600080fd5b6000600183815481106103be576103bd611424565b5b90600052602060002090600b02016003015490506000600184815481106103e8576103e7611424565b5b90600052602060002090600b020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016104769190611453565b602060405180830381865afa158015610493573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b79190611483565b10156104c257600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb30846040518363ffffffff1660e01b815260040161051d9291906114b0565b6020604051808303816000875af115801561053c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056091906114ee565b50600081905060006001868154811061057c5761057b611424565b5b90600052602060002090600b02016002015490508173ffffffffffffffffffffffffffffffffffffffff1663095ea7b330836040518363ffffffff1660e01b81526004016105cb9291906114b0565b600060405180830381600087803b1580156105e557600080fd5b505af11580156105f9573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff166323b872dd3033846040518463ffffffff1660e01b815260040161063a9392919061151b565b600060405180830381600087803b15801561065457600080fd5b505af1158015610668573d6000803e3d6000fd5b50505050505050505050565b6203f48081565b603381565b60006203f4808610156106c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bf906115d5565b60405180910390fd5b62278d0086111561070e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070590611667565b60405180910390fd5b60008311610751576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610748906116f9565b60405180910390fd5b42821015610794576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078b9061178b565b60405180910390fd5b60008590508073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330886040518463ffffffff1660e01b81526004016107d69392919061151b565b600060405180830381600087803b1580156107f057600080fd5b505af1158015610804573d6000803e3d6000fd5b505050506000600180549050905060006040518061016001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018973ffffffffffffffffffffffffffffffffffffffff1681526020018881526020018781526020014281526020018a4261087691906117da565b81526020016000815260200160008152602001600a67ffffffffffffffff8111156108a4576108a361180e565b5b6040519080825280602002602001820160405280156108d25781602001602082028036833780820191505090505b508152602001868152602001600060028111156108f2576108f16110f3565b5b815250905060018190806001815401808255809150506001900390600052602060002090600b020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c0820151816006015560e08201518160070155610100820151816008019080519060200190610a0a929190610f94565b50610120820151816009015561014082015181600a0160006101000a81548160ff02191690836002811115610a4257610a416110f3565b5b021790555050507f66e5b37817dfa9935ab8e631ce7774a2e773d56cc8ea6815ac65f1fbac642084823388428560a00151604051610a8495949392919061183d565b60405180910390a181935050505095945050505050565b601e81565b6000600180549050905090565b600060018381548110610ac357610ac2611424565b5b90600052602060002090600b0201905060006002811115610ae757610ae66110f3565b5b81600a0160009054906101000a900460ff166002811115610b0b57610b0a6110f3565b5b14610b4b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4290611902565b60405180910390fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610bd8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcf90611994565b60405180910390fd5b6001600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001151582151503610c5d576001816006016000828254610c5191906117da565b92505081905550610c87565b6000151582151503610c86576001816007016000828254610c7e91906117da565b925050819055505b5b80600801849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600081600701548260060154610d0291906117da565b9050600060018581548110610d1a57610d19611424565b5b90600052602060002090600b020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600060018681548110610d6457610d63611424565b5b90600052602060002090600b02016003015490506000610da26103e8610d94600385610f6890919063ffffffff16565b610f7e90919063ffffffff16565b9050846005015442101580610db75750600a84145b15610f3a57846006015485600701541015610ed457600185600a0160006101000a81548160ff02191690836002811115610df457610df36110f3565b5b021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84836040518363ffffffff1660e01b8152600401610e549291906114b0565b6020604051808303816000875af1158015610e73573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9791906114ee565b507f28ec9e38ba73636ceb2f6c1574136f83bd46284a3c74734b711bf45e12f8d92987604051610ec79190611295565b60405180910390a1610f39565b600285600a0160006101000a81548160ff02191690836002811115610efc57610efb6110f3565b5b02179055507fd92fba445edb3153b571e6df782d7a66fd0ce668519273670820ee3a86da0ef487604051610f309190611295565b60405180910390a15b5b5050505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008183610f7691906119b4565b905092915050565b60008183610f8c9190611a25565b905092915050565b82805482825590600052602060002090810192821561100d579160200282015b8281111561100c5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610fb4565b5b50905061101a919061101e565b5090565b5b8082111561103757600081600090555060010161101f565b5090565b600080fd5b6000819050919050565b61105381611040565b811461105e57600080fd5b50565b6000813590506110708161104a565b92915050565b60006020828403121561108c5761108b61103b565b5b600061109a84828501611061565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110ce826110a3565b9050919050565b6110de816110c3565b82525050565b6110ed81611040565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110611133576111326110f3565b5b50565b600081905061114482611122565b919050565b600061115482611136565b9050919050565b61116481611149565b82525050565b600061014082019050611180600083018d6110d5565b61118d602083018c6110d5565b61119a604083018b6110e4565b6111a7606083018a6110e4565b6111b460808301896110e4565b6111c160a08301886110e4565b6111ce60c08301876110e4565b6111db60e08301866110e4565b6111e96101008301856110e4565b6111f761012083018461115b565b9b9a5050505050505050505050565b61120f816110c3565b811461121a57600080fd5b50565b60008135905061122c81611206565b92915050565b6000602082840312156112485761124761103b565b5b60006112568482850161121d565b91505092915050565b60008115159050919050565b6112748161125f565b82525050565b600060208201905061128f600083018461126b565b92915050565b60006020820190506112aa60008301846110e4565b92915050565b600080600080600060a086880312156112cc576112cb61103b565b5b60006112da88828901611061565b95505060206112eb8882890161121d565b94505060406112fc88828901611061565b935050606061130d88828901611061565b925050608061131e88828901611061565b9150509295509295909350565b6113348161125f565b811461133f57600080fd5b50565b6000813590506113518161132b565b92915050565b6000806000606084860312156113705761136f61103b565b5b600061137e8682870161121d565b935050602061138f86828701611061565b92505060406113a086828701611342565b9150509250925092565b6000819050919050565b60006113cf6113ca6113c5846110a3565b6113aa565b6110a3565b9050919050565b60006113e1826113b4565b9050919050565b60006113f3826113d6565b9050919050565b611403816113e8565b82525050565b600060208201905061141e60008301846113fa565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208201905061146860008301846110d5565b92915050565b60008151905061147d8161104a565b92915050565b6000602082840312156114995761149861103b565b5b60006114a78482850161146e565b91505092915050565b60006040820190506114c560008301856110d5565b6114d260208301846110e4565b9392505050565b6000815190506114e88161132b565b92915050565b6000602082840312156115045761150361103b565b5b6000611512848285016114d9565b91505092915050565b600060608201905061153060008301866110d5565b61153d60208301856110d5565b61154a60408301846110e4565b949350505050565b600082825260208201905092915050565b7f566f7465206475726174696f6e206973206c657373207468616e20746865206d60008201527f696e696d756d0000000000000000000000000000000000000000000000000000602082015250565b60006115bf602683611552565b91506115ca82611563565b604082019050919050565b600060208201905081810360008301526115ee816115b2565b9050919050565b7f566f7465206475726174696f6e206578636565647320746865206d6178696d7560008201527f6d00000000000000000000000000000000000000000000000000000000000000602082015250565b6000611651602183611552565b915061165c826115f5565b604082019050919050565b6000602082019050818103600083015261168081611644565b9050919050565b7f5265717569726564207072696365206d7573742062652067726561746572207460008201527f68616e2030000000000000000000000000000000000000000000000000000000602082015250565b60006116e3602583611552565b91506116ee82611687565b604082019050919050565b60006020820190508181036000830152611712816116d6565b9050919050565b7f726570617954696d65206d75737420626967676572207468616e20626c6f636b60008201527f54696d6500000000000000000000000000000000000000000000000000000000602082015250565b6000611775602483611552565b915061178082611719565b604082019050919050565b600060208201905081810360008301526117a481611768565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006117e582611040565b91506117f083611040565b9250828201905080821115611808576118076117ab565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060a08201905061185260008301886110e4565b61185f60208301876110d5565b61186c60408301866110e4565b61187960608301856110e4565b61188660808301846110e4565b9695505050505050565b7f5468652070726f706f73616c206973206e6f74206f70656e20666f7220766f7460008201527f696e670000000000000000000000000000000000000000000000000000000000602082015250565b60006118ec602383611552565b91506118f782611890565b604082019050919050565b6000602082019050818103600083015261191b816118df565b9050919050565b7f54686520766f7465722068616420766f74656420696e20746869732070726f7060008201527f6f73616c00000000000000000000000000000000000000000000000000000000602082015250565b600061197e602483611552565b915061198982611922565b604082019050919050565b600060208201905081810360008301526119ad81611971565b9050919050565b60006119bf82611040565b91506119ca83611040565b92508282026119d881611040565b915082820484148315176119ef576119ee6117ab565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611a3082611040565b9150611a3b83611040565b925082611a4b57611a4a6119f6565b5b82820490509291505056fea26469706673582212207fa6534b3b8c32c47c94538a24314f73f1ed35e843f6d2ef80c4ab82720e860364736f6c63430008120033';

async function deploy(tokenAddress) {
    const publicAddress = await wallet.getAddress();
    console.log(`钱包地址为${publicAddress}`);

    const factoryProposal = new ethers.ContractFactory(proposalAbi, byteCodeProposal, wallet);
    //部署合约，填入constructor的参数
    const contractProposal = await factoryProposal.deploy(tokenAddress, {
        gasLimit: 30000000
    });
    console.log(`Proposal合约地址:${contractProposal.address}`);
    // console.log("部署Proposal合约的交易详情");
    // console.log(contractProposal.deployTransaction);
    console.log("等待Proposal合约部署上链");
    await contractProposal.deployed();
    console.log("Proposal合约已上链");
    return contractProposal.address;
}
// deployProposal()
module.exports = { deploy };