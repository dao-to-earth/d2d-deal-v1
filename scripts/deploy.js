const main = async () => {
    const swapperContractFactory = await hre.ethers.getContractFactory('Swapper')
  
    const signerAddress = await swapperContractFactory.signer.getAddress()
    const signer = await ethers.getSigner(signerAddress)
    console.log('Signer adress: ', signerAddress)
  
    const swapperContract = await swapperContractFactory.deploy()
    await swapperContract.deployed()
  
    console.log('Swapper deployed to: ', swapperContract.address)
}
  
const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()