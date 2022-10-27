const { ethers } = require("hardhat");

async function main() {

  const whitelistContract = await ethers.getContractFactory("WhiteList");

  const deployedWhitelistContract = await whitelistContract.deploy(2);
  await deployedWhitelistContract.deployed();
  // 0xa19e5174CA37Be4394744045e45C4dbf0cC8c8B2
  console.log("Whitelist Contract Address:", deployedWhitelistContract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });