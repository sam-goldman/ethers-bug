import hre from 'hardhat'
import { ethers } from "ethers";

const signer = new ethers.Wallet(
  '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6'
)
const slowProvider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
const fastProvider = hre.ethers.provider

async function main() {
  const fastInitialTime = Date.now();

  // Deploy 10 contracts using the fast provider
  for (let i = 0; i < 4; i++) {
    const lock = await hre.ethers.deployContract("Lock", [], signer.connect(fastProvider));
    await lock.waitForDeployment();
  }

  console.log(`Fast run finished in ${Date.now() - fastInitialTime} ms`);

  const slowInitialTime = Date.now();

  // Deploy 10 contracts using the slow provider
  for (let i = 0; i < 10; i++) {
    const lock = await hre.ethers.deployContract("Lock", [], signer.connect(slowProvider));
    await lock.waitForDeployment();
  }

  console.log(`Slow run finished in ${Date.now() - slowInitialTime} ms`);
}

main()