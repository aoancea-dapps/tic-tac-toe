import { Injectable } from '@angular/core';

declare var Web3: any;

@Injectable()
export class Web3ProviderService {

    public web3: any;

    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

}
