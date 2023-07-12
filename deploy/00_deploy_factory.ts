import { DeployFunction } from "hardhat-deploy/types";
import { typedDeployments } from "@utils";
import { ethers } from "hardhat";

const migrate: DeployFunction = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = typedDeployments(deployments);
  const { deployer } = await getNamedAccounts();

  const admin = deployer;
  const operator = deployer;

  console.log(deployer);

  // Оценка стоимости деплоя
  const GooddoerFactory = await ethers.getContractFactory("GooddoerFactory");
  const estimatedGas = await ethers.provider.estimateGas(GooddoerFactory.getDeployTransaction(admin, operator));
  const gasPrice = await ethers.provider.getGasPrice();
  const estimatedCost = estimatedGas.mul(gasPrice);

  console.log(`Estimated deployment cost: ${ethers.utils.formatEther(estimatedCost)} ETH`);

  await deploy("GooddoerFactory", {
    from: deployer,
    args: [admin, operator],
    log: true,
  });
};

migrate.tags = ["factory"];

export default migrate;
