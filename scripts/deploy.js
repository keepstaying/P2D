const { ethers } = require(`hardhat`);


async function deploy() {

    const [deployer] = await ethers.getSigners();

    const lixiangAddress = '0xeea78E4B6bf6BE675f96Bb4cbeDFd7a89Bdb18f6';

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("VicToken");
    const VicToken = await Token.deploy("vicToken", "Vic");

    console.log("Token address:", VicToken.address);

    const NFT = await ethers.getContractFactory("MyERC721");
    const VicNFT = await NFT.deploy("vicNFT", "VVV")

    console.log("NFT address:", VicNFT.address);


    const Proposal = await ethers.getContractFactory("VicProposal");
    const VicProposal = await Proposal.deploy(VicToken.address);

    console.log("Proposal address:", VicProposal.address);

    const Dao = await ethers.getContractFactory("VicDAO");
    const VicDao = await Dao.deploy(VicToken.address, VicProposal.address);

    console.log("VicDao address:", VicDao.address);

    console.log("给部署者地址铸造代币")
    await VicToken.mint(deployer.address, 100000);
    const tokenBalance = await VicToken.balanceOf(deployer.address);
    console.log("成功铸造:" + ethers.utils.formatUnits(tokenBalance, 0));

    console.log("给演示地址铸造代币")
    await VicToken.mint(lixiangAddress, 1000000000);
    const tokenBalanceLiXiang = await VicToken.balanceOf(deployer.address);
    console.log("成功铸造:" + ethers.utils.formatUnits(tokenBalanceLiXiang, 0));

    // console.log("允许DAO合约调用代币")
    // await VicToken.approve(VicDao.address, 1000);
    // console.log("允许成功");

    // console.log("质押代币成为DAO成员");
    // let now = Date.now();
    // now = Math.floor(now / 1000);
    // await VicDao.pledge(100, now + 604800);//质押一周
    // const memberBalance = await VicDao.memberBalanceOf(deployer.address);
    // console.log("质押余额：" + ethers.utils.formatUnits(memberBalance, 0));

    console.log("给部署者铸造NFT10");
    await VicNFT.mint(deployer.address, 10);//铸造ID为10的NFT
    console.log("成功");
    console.log("给演示者铸造NFT111");
    await VicNFT.mint(lixiangAddress, 111);//铸造ID为111的NFT
    console.log("成功");
    console.log("给演示者铸造NFT222");
    await VicNFT.mint(lixiangAddress, 222);//铸造ID为222的NFT
    console.log("成功");
    // console.log("查看ID为10的拥有者")
    // const owner = await VicNFT.ownerOf(10);
    // console.log(owner);

    // console.log("允许Proposal合约调用ID为10的NFT");
    // await VicNFT.approve(VicProposal.address, 10);
    // console.log("成功");

    // console.log("部署者使用tokenID为10的NFT发起提案");
    // await VicProposal.createProposal(604800, VicNFT.address, 10, 30, now + 604800);
    // console.log("查看部署的提案");
    // const proposal = await VicProposal.proposals[0];
    // console.log(proposal);

    // console.log("dao成员投票");
    // await VicDao.daoMemberVote(0, true);
    // console.log("投票成功");
    // console.log("查看提案状态");
    // const proposalAfter = await VicProposal.proposals[0];
    // console.log(proposalAfter);

}
deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });