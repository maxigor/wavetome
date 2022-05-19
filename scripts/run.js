const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
    );


  /* Let's send a few waves! */
  let getAllWaves = await waveContract.getAllWaves();
  let totalWaves = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("A serie halo eh chata!");
  await waveTxn.wait();

  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn2 = await waveContract.connect(randomPerson).wave("Mentira, eu curti!!!!!");
  await waveTxn2.wait();

  console.log(totalWaves)
  console.log(getAllWaves)

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );


};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();