import "@nomiclabs/hardhat-ethers"
import 'hardhat-deploy'
import { ethers } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

export async function mydeploy(
  hre: HardhatRuntimeEnvironment,
  contractName: string,
  from: string,
  args: any,
  log: boolean,
  gasLimit: number
) {
  console.log('mydeploy: ' + contractName + '\n')
  await ethers.getContractFactory(contractName)
  const ret = await hre.deployments.deploy(contractName, {
    from: from,
    args: args,
    log: log,
    gasLimit: gasLimit,
  })
  return await ethers.getContractAt(ret.abi, ret.address)
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log('\n\n\n\n\n\n\nstart Swapper deployment\n\n\n\n\n ')
  console.log('hre.network.name = ' + hre.network.name)

  const signers = await ethers.getSigners()
  const deployer = signers[0].address

  const gasLimit1 = 3000000

  console.log('deployer = ' + deployer)
  console.log('\n\n\n\n')

  // if there are some parameters in the contract constructor, set here
  const args = null
  const swapper = await mydeploy(
    hre,
    'Swapper',
    deployer,
    args ? [args] : null,
    true,
    gasLimit1
  )
  console.log('#Swapper')
  console.log(
    'npx hardhat verify --network ' +
      hre.network.name +
      ' ' +
      swapper.address +
      ' ' +
      args ? args : ''
  )
}

func.tags = ['Swapper']

func.skip = async (hre) => {
  return (
    hre.network.name !== 'rinkeby' &&
    hre.network.name !== 'matic' &&
    hre.network.name !== 'mumbai' &&
    hre.network.name !== 'hardhat' &&
    hre.network.name !== 'fantomtest' &&
    hre.network.name !== 'fantom' &&
    hre.network.name !== 'fuji' &&
    hre.network.name !== 'avalanche' &&
    hre.network.name !== 'bnbTest' &&
    hre.network.name !== 'bnb' &&
    hre.network.name !== 'neonDev' &&
    hre.network.name !== 'neon'
  )
}
export default func
