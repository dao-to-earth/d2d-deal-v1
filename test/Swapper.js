const { expect } = require('chai')
const { ethers } = require('hardhat')


describe("Swapper", function () {
    beforeEach(async function () {
        const swapperFactory = await ethers.getContractFactory("Swapper");
        const swapper = await swapperFactory.deploy();
    });

    //check getters right after deployment

    it("Should ....", async function () {
        // check 
        // expect(await swapper.function()).to.equal(owner.address);
    });

    describe('create proposal', function () {
    });  

    describe('cancel proposal', function () {
    });  
    
    describe('approve proposal', function () {
    });  

    describe('claim swap', function () {
    });  
});