import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';
import { TicTacToeStage12ProviderService } from './tic-tac-toe-stage-1-2-provider.service';

@Component({
    selector: 'app-tic-tac-toe-stage-1-2',
    templateUrl: './tic-tac-toe-stage-1-2.component.html',
    styleUrls: ['./tic-tac-toe-stage-1-2.component.less']
})
export class TicTacToeStage12Component implements OnInit {

    private web3: any;

    private deployedContract: any;
    private ticTacToeStage1Instance: any;

    public boxValues: string[] = ['', '', '', '', '', '', '', '', ''];

    public accounts: string[];

    public player1: string;
    public player2: string;

    public isPlaying: boolean = false;

    public showLine1: boolean = false;
    public showLine2: boolean = false;
    public showLine3: boolean = false;

    public showColumn1: boolean = false;
    public showColumn2: boolean = false;
    public showColumn3: boolean = false;

    public showDiagonal1: boolean = false;
    public showDiagonal2: boolean = false;

    public player1Won: boolean = false;
    public player2Won: boolean = false;

    public winnerConfirmed: boolean = false;

    constructor(private web3Provider: Web3ProviderService, private ticTacToeStage12Provider: TicTacToeStage12ProviderService) {
        this.web3 = this.web3Provider.web3;
    }

    ngOnInit() {
        var self = this;

        this.player1 = this.web3.eth.accounts[0];
        this.player2 = this.web3.eth.accounts[1];

        self.web3.eth.defaultAccount = self.player1;

        var TicTacToeStage12Contract = this.web3.eth.contract(self.ticTacToeStage12Provider.abi);

        self.deployedContract = TicTacToeStage12Contract.new({ data: self.ticTacToeStage12Provider.byte_code, from: self.player1, gas: 30000000000 });

        var addressPromiseHandle = setInterval(() => {
            if (!self.deployedContract.address) return;

            clearInterval(addressPromiseHandle);

            self.ticTacToeStage1Instance = TicTacToeStage12Contract.at(self.deployedContract.address);

            var gameCompleteEvent = self.ticTacToeStage1Instance.GameCompleteEvent();

            gameCompleteEvent.watch(function (err, result) {
                self.player1Won = self.player1 == result.args.winner;
                self.player2Won = self.player2 == result.args.winner;

                self.winnerConfirmed = true;
            });

            self.ticTacToeStage1Instance.startGame(self.player1, self.player2, { gas: 300000 });

            this.isPlaying = true;

        }, 1000);
    }

    clickBox(index): void {
        if (!this.isPlaying)
            return;

        console.log('box ' + (parseInt(index) + 1) + ' clicked!');

        var self = this;

        self.markBox(self.player1, index);

        self.checkIfWin(self.player1);

        if (!self.isPlaying) {
            self.ticTacToeStage1Instance.endGame(self.player1, self.player1, { gas: 300000 });
            self.ticTacToeStage1Instance.endGame(self.player2, self.player1, { gas: 300000 });
        } else {
            for (var i = 0; i < 8; ++i) {
                if (!self.boxValues[i]) {

                    self.markBox(self.player2, i);

                    self.checkIfWin(self.player2);

                    // check if win?
                    if (!self.isPlaying) {
                        self.ticTacToeStage1Instance.endGame(self.player2, self.player2, { gas: 300000 });
                        self.ticTacToeStage1Instance.endGame(self.player1, self.player2, { gas: 300000 });
                    }

                    break;
                }
            }
        }
    }

    private checkIfWin(player: string): void {
        var playerState = player == this.player1 ? 'X' : 'O';

        if (this.boxValues[0] == playerState && this.boxValues[1] == playerState && this.boxValues[2] == playerState) {
            this.showLine1 = true;
            this.isPlaying = false;
        } else if (this.boxValues[3] == playerState && this.boxValues[4] == playerState && this.boxValues[5] == playerState) {
            this.showLine2 = true;
            this.isPlaying = false;
        } else if (this.boxValues[6] == playerState && this.boxValues[7] == playerState && this.boxValues[8] == playerState) {
            this.showLine3 = true;
            this.isPlaying = false;
        } else if (this.boxValues[0] == playerState && this.boxValues[3] == playerState && this.boxValues[6] == playerState) {
            this.showColumn1 = true;
            this.isPlaying = false;
        } else if (this.boxValues[1] == playerState && this.boxValues[4] == playerState && this.boxValues[7] == playerState) {
            this.showColumn2 = true;
            this.isPlaying = false;
        } else if (this.boxValues[2] == playerState && this.boxValues[5] == playerState && this.boxValues[8] == playerState) {
            this.showColumn3 = true;
            this.isPlaying = false;
        } else if (this.boxValues[0] == playerState && this.boxValues[4] == playerState && this.boxValues[8] == playerState) {
            this.showDiagonal1 = true;
            this.isPlaying = false;
        } else if (this.boxValues[2] == playerState && this.boxValues[4] == playerState && this.boxValues[6] == playerState) {
            this.showDiagonal2 = true;
            this.isPlaying = false;
        }
    }

    private markBox(player: string, index: number): void {
        var playerState = player == this.player1 ? 'X' : 'O';

        this.boxValues[index] = playerState;
    }
}
