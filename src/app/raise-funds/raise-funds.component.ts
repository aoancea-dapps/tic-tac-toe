import { Component, OnInit } from '@angular/core';

declare var Web3: any;
declare var web3: any;

@Component({
    selector: 'app-raise-funds',
    templateUrl: './raise-funds.component.html',
    styleUrls: ['./raise-funds.component.less']
})
export class RaiseFundsComponent implements OnInit {

    private web3: any;

    public beneficiary: string = 'Loading ...';
    public raised: string = 'Loading ...';

    public account_balance: string = 'Loading ...';
    public account_address: string = 'Loading ...';

    public amount: string;

    private deployedContract: any;

    public response: string;

    private simpleAuctionInstance: any;

    constructor() {
        this.web3 = new Web3(web3.currentProvider);
    }

    ngOnInit() {
        var self = this;

        //var SimpleAuctionABI = [{ "constant": false, "inputs": [], "name": "acceptFunds", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_beneficiary", "type": "address" }], "name": "SimpleAuction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "beneficiary", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }];
        var SimpleAuctionABI = [{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"SimpleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptFunds","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"raised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

        var SimpleAuctionContract = self.web3.eth.contract(SimpleAuctionABI);

        //self.simpleAuctionInstance = SimpleAuctionContract.at('0x4ab39f18a4ed3b4082855fc6a1dcd2f66a535890');
        self.simpleAuctionInstance = SimpleAuctionContract.at('0xeb9fd6055e0a3ef8dd4ea6f7e52cc092abb6b148');

        self.web3.eth.getAccounts(function (err, accounts) {
            self.account_address = accounts[0];

            var auctionInterval = setInterval(() => {

                self.web3.eth.getBalance(self.account_address, function (err, balance) {
                    self.account_balance = self.web3.fromWei(balance, 'ether');
                });


                self.simpleAuctionInstance.raised(function (err, raised) {
                    self.raised = self.web3.fromWei(raised, 'ether');
                });

                self.simpleAuctionInstance.beneficiary(function (err, beneficiary) {
                    self.beneficiary = beneficiary.substr(0, 12);
                });
            }, 1000);
        });
    }

    transfer(): void {
        var self = this;

        var acceptFundsTxObject = {
            from: this.account_address,
            value: this.web3.toWei(this.amount, 'ether'),
        };

        this.response = 'Transfering ETH! This might take a while until the transaction is confirmed!';

        this.simpleAuctionInstance.acceptFunds(acceptFundsTxObject, function (err, bidResult) {
            if (err) {
                self.response = 'Hmm, there was an error' + String(err);
            } else {
                self.response = 'Transfering ETH with tx hash: ' + String(bidResult);
            }
        });
    }
}