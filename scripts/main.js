const ethers = require(`ethers`);
const deployDao = require(`./deployDao`);
const deployNft = require(`./deployNft`);
// import deployNft from "./deployNft";
const deployProposal = require(`./deployProposal`);
const deployToken = require(`./deployToken`);

const providerSepolia = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/3uvxjzVO19PqwZSiiprJ7nCa2vm0zDlc");

const privateKey = "5db83f2b447702e2bc18a8ea57773f0115cfbfd4d627ae6a66a08de461d7806d";
const wallet = new ethers.Wallet(privateKey, providerSepolia);

const main = async () => {
    console.log("\n部署NFT合约");
    const nftAddress = await deployNft.deploy();
    console.log("\n部署Token合约")
    const tokenAddress = await deployToken.deploy();
    console.log("\n部署Proposal合约");
    const proposalAddrrss = await deployProposal.deploy(tokenAddress);
    console.log("\n部署DAO合约");
    const daoAddress = await deployDao.deploy(tokenAddress, proposalAddrrss);
    console.log("")
    console.log(`NFT合约地址为:${nftAddress}`)
    console.log(`Token合约地址为:${tokenAddress}`)
    console.log(`Proporsal合约地址为:${proposalAddrrss}`)
    console.log(`DAO约地址为:${daoAddress}`)

    // const 

    console.log("为演示钱包铸造NFT")


}
main();