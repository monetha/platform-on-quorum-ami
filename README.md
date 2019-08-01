# Monetha Platform on Quorum

This is a playground environment of [Monetha Platform](https://monetha.io/platform) running on Quorum blockchain using Raft consensus protocol (based on [Quorum 7 nodes example](https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes)).

This AMI allows you to jump straight into building apps using Monetha's [verifiable data SDK](https://github.com/monetha/js-verifiable-data), as described in our [guide to identity and data management on Quorum](https://blog.monetha.io/guide-quorum-digital-identity/#Create).

The scripts in this repository build an AWS [AMI image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) that allows you to launch a pre-configured [EC2 instance](https://aws.amazon.com/ec2/) with all of the needed tools inside.

## EC2 instance

Due to running 7 Quorum nodes on the same instance, you need to use an instance type that has **at least 6GB** of memory (e.g., `t3.large`).

When you [launch the EC2 instance](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/), you can use SSH to connect to it.

The AMI is based on `Ubuntu 16.04 LTS`. As such, the **default username** is `ubuntu`. There is no password set to the account, you will need to use EC2 keypair to [connect to the instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html).

## Quorum

[Quorum blockchain](https://github.com/jpmorganchase/quorum) is deployed and configured to launch when you start the EC2 instance.

If you need to stop, start, or check the Quorum service status, you can use the following commands:
```shell
sudo systemctl status quorum.service 
sudo systemctl start quorum.service 
sudo systemctl stop quorum.service
```

## Monetha smart contracts

The latest Monetha [smart contracts](https://github.com/monetha/reputation-contracts) get deployed when you launch the EC2 instance for the first time. 

You can find the contract addresses in the `/home/ubuntu/monetha-reputation-contracts/migrations.log` file.

## Explore the digital identities 

You can use Monetha's [passport-scanner](https://github.com/monetha/passport-scanner) app to explore the digital identities on your Quorum blockchain. You can either follow the projects readme and setup the latest and greatest scanner version or you can download the latest [passport-scanner release](https://github.com/monetha/passport-scanner/releases), open it, and point it to your Quorum nodes JSON-RPC port. You can use the following command to access the passport-scanner app (please note that it depends on Docker):
```shell
docker run -it --rm --name nginx --publish 80:80 -v </path/to/extracted/passport-scanner/files>:/usr/share/nginx/html:ro nginx
``` 

## Ports

This AMI is based on [Quorum 7 nodes example](https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes). You can use the following ports to connect to Quorum nodes [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC):
- node 1 - port `22000`
- node 2 - port `22001`
- node 3 - port `22002`
- node 4 - port `22003`
- node 5 - port `22004`
- node 6 - port `22005`
- node 7 - port `22006`

**Please note** that you will need to add these ports to the inbound rules for the AWS Security Group(s) to be able to reach them from outside of the instance.

## List of AMIs

| Region | AMI ID |
|---|---|
| ap-northeast-1 | ami-0ed9317deee6a31ab |
| ap-northeast-2 | ami-03ad248d7ead9b007 |
| ap-south-1 | ami-056d1404d94800529 |
| ap-southeast-1 | ami-056b5e35fd1cc1fd4 |
| ap-southeast-2 | ami-0ee95e34019191b70 |
| ca-central-1 | ami-05e90bca87f8e9f08 |
| eu-central-1 | ami-0006e03d602ad024c |
| eu-north-1 | ami-069811847d42337cc |
| eu-west-1 | ami-0cfb9c071bf75dae7 |
| eu-west-2 | ami-058fe3ce006fc936a |
| eu-west-3 | ami-05e2dfc55b1590404 |
| sa-east-1 | ami-02964b43191f77a0f |
| us-east-1 | ami-0526e67a852e0bb97 |
| us-east-2 | ami-0c9a13dca5eb1d6e4 |
| us-west-1 | ami-01e94a50cab3cbfef |
| us-west-2 | ami-0b088d7eb8e6eb59c |
