require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/3uvxjzVO19PqwZSiiprJ7nCa2vm0zDlc`,
      accounts: ['5db83f2b447702e2bc18a8ea57773f0115cfbfd4d627ae6a66a08de461d7806d']
    }
  }
};
