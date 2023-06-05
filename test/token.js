const ethers = require(`ethers`);
const fs = require(`fs`);

const providerSepolia = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/3uvxjzVO19PqwZSiiprJ7nCa2vm0zDlc");

// const privateKey = fs.readFileSync(".secret").toString().trim();
const privateKey = "5db83f2b447702e2bc18a8ea57773f0115cfbfd4d627ae6a66a08de461d7806d";
const wallet = new ethers.Wallet(privateKey, providerSepolia);
const lixiangPublicAddress = "0xeea78E4B6bf6BE675f96Bb4cbeDFd7a89Bdb18f6";
// const tokenAddress = "0x46EAf3205b4a0D87da3538e76905A977c1793552";
const tokenAddress = "0xf762F7E1f10f2F27Fc29B0A6adB84617AcC9E361"


const tokenAbi = [
    "function balanceOf(address account) public view returns(uint256)",
    "function transfer(address to, uint256 amount) public returns(bool)",
    "function approve(address spender, uint256 amount) public returns(bool)",
    "function mint(address _to,uint256 _amount)public",
]

const contractToken = new ethers.Contract(tokenAddress, tokenAbi, wallet);

const main = async () => {
    const publicAddress = await wallet.getAddress();//钱包地址
    // console.log("输出钱包地址");
    // console.log(publicAddress);
    // const walletEthBalance = await getEthBalance();
    // console.log("当前钱包ETH余额:");
    // console.log(walletEthBalance);

    const oneToken = ethers.BigNumber.from("10000000000000000000");

    console.log("正在铸造代币...");
    await contractToken.mint(lixiangPublicAddress, ethers.utils.formatUnits(oneToken, 0));
    console.log("铸造成功！！！");
    // const afterMintWalletBalance = await getEthBalance();
    // console.log("铸造后钱包ETH余额:");
    // console.log(afterMintWalletBalance);

    const myBalance = await contractToken.balanceOf(publicAddress);
    console.log(`我的token余额${ethers.utils.formatUnits(myBalance, 0)}`);
    // console.log("输出钱包私钥");
    // console.log(privateKey);
}



async function getEthBalance() {
    const balance = await wallet.getBalance();
    return ethers.utils.formatEther(balance);
}
main();