const { ethers } = require(`hardhat`);


async function deploy() {

    const [deployer] = await ethers.getSigners();//定义一个实例

    const lixiangAddress = '0xeea78E4B6bf6BE675f96Bb4cbeDFd7a89Bdb18f6';

    console.log(
        "Deploying contracts with the account:",
        deployer.address//当前账户的地址
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());//当前账户的余额

    const Token = await ethers.getContractFactory("VicToken"); //创建合约
    const VicToken = await Token.deploy("vicToken", "Vic");//部署token合约

    console.log("Token address:", VicToken.address);//打印token合约的地址

    const NFT = await ethers.getContractFactory("MyERC721");//创建NFT合约
    const VicNFT = await NFT.deploy("vicNFT", "VVV")//部署NFT合约

    console.log("NFT address:", VicNFT.address);//打印地址


    const Proposal = await ethers.getContractFactory("VicProposal");//创建提案合约
    const VicProposal = await Proposal.deploy(VicToken.address);//部署合约并将token合约的地址作为参数传入

    console.log("Proposal address:", VicProposal.address);

    const Dao = await ethers.getContractFactory("VicDAO");                   //创建Dao的合约
    const VicDao = await Dao.deploy(VicToken.address, VicProposal.address);  //部署Dao合约并将token合约和提案合约的参数传入

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
