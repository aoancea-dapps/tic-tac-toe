import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';

@Component({
    selector: 'app-auction',
    templateUrl: './auction.component.html',
    styleUrls: ['./auction.component.less']
})
export class AuctionComponent implements OnInit {

    private web3: any;

    public beneficiary: string = 'Loading ...';
    public raised: string = 'Loading ...';
    public time_left: number = 0;

    public highest_bidder: string;
    public highest_bid: string;

    public account_balance: string = 'Loading ...';
    public account_address: string = 'Loading ...';

    private deployedContract: any;

    public accounts: string[];

    public bid_amount: number;
    public bid_account: string;

    public response: string;

    private simpleAuctionInstance: any;

    constructor(private web3Provider: Web3ProviderService) {
        this.web3 = this.web3Provider.web3;
    }

    ngOnInit() {
        var bidding_time = 30;

        var SimpleAuctionBytecode = '6060604052341561000f57600080fd5b60405160408061070e83398101604052808051906020019091908051906020019091905050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504260018190555081600281905550505061067b806100936000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631998aeef146100935780632a24f46c1461009d57806338af3eed146100b25780633ccfd60b146101075780634f245ef71461013457806391f901571461015d578063d074a38d146101b2578063d57bde79146101db575b600080fd5b61009b610204565b005b34156100a857600080fd5b6100b0610390565b005b34156100bd57600080fd5b6100c56104cd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011257600080fd5b61011a6104f2565b604051808215151515815260200191505060405180910390f35b341561013f57600080fd5b610147610617565b6040518082815260200191505060405180910390f35b341561016857600080fd5b61017061061d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101bd57600080fd5b6101c5610643565b6040518082815260200191505060405180910390f35b34156101e657600080fd5b6101ee610649565b6040518082815260200191505060405180910390f35b6002546001540142111561021757600080fd5b6004543411151561022757600080fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156102db5760045460056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346004819055507ff4757a49b326036464bec6fe419a4ae38c8a02ce3e68bf0809674f6aab8ad3003334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1565b60025460015401421115156103a457600080fd5b600660009054906101000a900460ff16156103be57600080fd5b6001600660006101000a81548160ff0219169083151502179055507fdaec4582d5d9595688c8c98545fdd1c696d41c6aeaeb636737e84ed2f5c00eda600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600454604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505015156104cb57600080fd5b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600081111561060e576000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561060d5780600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060009150610613565b5b600191505b5090565b60015481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b600454815600a165627a7a72305820950dcf6d6f9c40bf82e800a01b0bd507afabaea068b635b5970aff14c55827b80029';
        var SimpleAuctionABI = [{ "constant": false, "inputs": [], "name": "bid", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "auctionEnd", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "beneficiary", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "auctionStart", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "highestBidder", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "biddingTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "highestBid", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_biddingTime", "type": "uint256" }, { "name": "_beneficiary", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "bidder", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "HighestBidIncreased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "winner", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "AuctionEnded", "type": "event" }];
        var SimpleAuctionContract = this.web3.eth.contract(SimpleAuctionABI);

        this.deployedContract = SimpleAuctionContract.new(bidding_time, this.web3.eth.accounts[0], { data: SimpleAuctionBytecode, from: this.web3.eth.accounts[0], gas: 3000000 });

        var addressPromiseHandle = setInterval(() => {
            if (!this.deployedContract.address) return;

            clearInterval(addressPromiseHandle);

            this.simpleAuctionInstance = SimpleAuctionContract.at(this.deployedContract.address);

            this.accounts = this.web3.eth.accounts;
            this.web3.eth.defaultAccount = this.accounts[0];

            var auctionInterval = setInterval(() => {
                this.account_balance = this.web3.fromWei(this.web3.eth.getBalance(this.accounts[0]), 'ether');
                this.raised = this.web3.fromWei(this.web3.eth.getBalance(this.simpleAuctionInstance.address), 'ether');
                this.beneficiary = this.simpleAuctionInstance.beneficiary().substr(0, 12);
                this.highest_bidder = this.simpleAuctionInstance.highestBidder().substr(0, 12);
                this.highest_bid = this.web3.fromWei(this.simpleAuctionInstance.highestBid(), 'ether');

                var auctionStart = this.simpleAuctionInstance.auctionStart();
                var auctionBiddingTime = this.simpleAuctionInstance.biddingTime();

                var endTime = auctionStart.c[0] + bidding_time;
                var actualTime = (new this.web3.BigNumber((new Date()).getTime() / 1000)).c[0];
                var timeleft = endTime - actualTime;

                this.time_left = parseInt(timeleft.toString(10));

                if (this.time_left < 1) {
                    clearInterval(auctionInterval);
                }
            }, 1000);

        }, 1000);
    }

    bid(): void {
        var bidTxObject = {
            from: this.bid_account,
            value: this.web3.toWei(this.bid_amount, 'ether'),
        };

        this.response = 'Placing bid...';

        var self = this;

        this.simpleAuctionInstance.bid(bidTxObject, function (bidError, bidResult) {
            if (bidError) {
                self.response = 'Hmm, there was an error' + String(bidError);
            } else {
                self.response = 'Making bid with tx hash: ' + String(bidResult);
            }
        });
    }

    endAuction(): void {
        this.response = 'Ending auction...';

        var self = this;

        this.simpleAuctionInstance.auctionEnd(function (endError, endResult) {
            if (endError) {
                self.response = 'Hmm, there was an error' + String(endError);
            } else {
                self.response = 'Ending auction with tx hash: ' + String(endResult);
            }
        });
    }
}
