import { Injectable } from '@angular/core';

declare var Web3: any;
//declare var web3: any;

@Injectable()
export class Web3ProviderService {

    public web3: any;
    //public isMetaMasrk: boolean;

    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

        // try {
        //     if (web3 !== 'undefined') {
        //         // Use Mist/MetaMask's provider
        //         this.web3 = new Web3(web3.currentProvider);
        //         this.isMetaMasrk = true;
        //     } else {
        //         // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        //         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        //         this.isMetaMasrk = false;
        //     }
        // } catch {
        //     // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        //     this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        //     this.isMetaMasrk = false;
        // }
    }
}
