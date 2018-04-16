import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';
import { TicTacToeStage1ProviderService } from './tic-tac-toe-stage-1-provider.service';
import { Z_VERSION_ERROR } from 'zlib';

@Component({
    selector: 'app-tic-tac-toe-stage-1',
    templateUrl: './tic-tac-toe-stage-1.component.html',
    styleUrls: ['./tic-tac-toe-stage-1.component.less']
})
export class TicTacToeStage1Component implements OnInit {

    private web3: any;

    private deployedContract: any;
    private ticTacToeStage1Instance: any;

    public boxValues: string[] = ['', '', '', '', '', '', '', '', ''];

    public accounts: string[];

    public player1: string;
    public player2: string;

    constructor(private web3Provider: Web3ProviderService, private ticTacToeStage1Provider: TicTacToeStage1ProviderService) {
        this.web3 = this.web3Provider.web3;
    }

    ngOnInit() {
        var self = this;

        this.player1 = this.web3.eth.accounts[0];
        this.player2 = this.web3.eth.accounts[1];

        self.web3.eth.defaultAccount = self.player1;

        var TicTacToeStage1Contract = this.web3.eth.contract(self.ticTacToeStage1Provider.abi);

        self.deployedContract = TicTacToeStage1Contract.new({ data: self.ticTacToeStage1Provider.byte_code, from: self.player1, gas: 30000000000 });

        var addressPromiseHandle = setInterval(() => {
            if (!self.deployedContract.address) return;

            clearInterval(addressPromiseHandle);

            self.ticTacToeStage1Instance = TicTacToeStage1Contract.at(self.deployedContract.address);

            self.ticTacToeStage1Instance.startGame(self.player1, self.player2, { gas: 300000 }); // failing with ERROR Error: sender account not recognized

            self.updateBoard();

        }, 1000);

    }

    clickBox(index): void {
        console.log('box ' + (parseInt(index) + 1) + ' clicked!');

        var self = this;

        self.ticTacToeStage1Instance.sendPick(this.player1, index, { gas: 300000 });

        self.updateBoard();

        for (var i = 0; i < 8; ++i) {
            if (!self.boxValues[i]) {
                self.ticTacToeStage1Instance.sendPick(this.player2, i, { gas: 300000 });
                self.updateBoard();
                break;
            }
        }
    }

    private updateBoard(): void {
        var self = this;

        var line1_state = self.ticTacToeStage1Instance.getLine1State(self.player1);
        var line2_state = self.ticTacToeStage1Instance.getLine2State(self.player1);
        var line3_state = self.ticTacToeStage1Instance.getLine3State(self.player1);

        this.boxValues[0] = line1_state[0];
        this.boxValues[1] = line1_state[1];
        this.boxValues[2] = line1_state[2];

        this.boxValues[3] = line2_state[0];
        this.boxValues[4] = line2_state[1];
        this.boxValues[5] = line2_state[2];

        this.boxValues[6] = line3_state[0];
        this.boxValues[7] = line3_state[1];
        this.boxValues[8] = line3_state[2];
    }
}
