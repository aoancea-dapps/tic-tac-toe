import { Component, OnInit } from '@angular/core';

import { Web3ProviderService } from '../services/web3-provider.service';
import { TicTacToeStage3ProviderService } from './tic-tac-toe-stage-3-provider.service';

declare var Web3: any;
declare var web3: any;

@Component({
    selector: 'app-tic-tac-toe-stage-3',
    templateUrl: './tic-tac-toe-stage-3.component.html',
    styleUrls: ['./tic-tac-toe-stage-3.component.less']
})
export class TicTacToeStage3Component implements OnInit {

    private web3: any;

    private ticTacToeStage3Instance: any;

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

    public contract_address: string;

    constructor(private web3Provider: Web3ProviderService, private ticTacToeStage3Provider: TicTacToeStage3ProviderService) {
        //this.web3 = this.web3Provider.web3;

        //this.web3 = new Web3(web3.currentProvider);

        //this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    ngOnInit() {
        var self = this;

        self.contract_address = '0xcf23faab8cb75ebfb5472b4a3bcdfae65c68fd5e';
        self.accounts = this.web3.eth.accounts;

        self.web3.eth.defaultAccount = self.accounts[0];
    }

    startGame(): void {
        var self = this;

        self.web3.eth.defaultAccount = self.player1;

        var private_key0 = self.web3.shh.newKeyPair();

        //var PublicKey = self.web3.shh.getPublicKey();

        var private_key = self.web3.shh.newKeyPair(function (err, result) {
            console.log(result);
        });
        var version = self.web3.shh.version(function (err, result) {
            console.log(result);
        });

        var version = self.web3.shh.generateSymKeyFromPassword('test', function (err, result) {
            console.log(result);
        });

        // var version = self.web3.shh.getSymKey(function (err, result) {
        //     console.log(result);
        // });



        // var TicTacToeStage3Contract = self.web3.eth.contract(self.ticTacToeStage3Provider.abi);

        // self.ticTacToeStage3Instance = TicTacToeStage3Contract.at(self.contract_address);

        // var gameStartEvent = self.ticTacToeStage3Instance.GameStartEvent();
        // var gameCompleteEvent = self.ticTacToeStage3Instance.GameCompleteEvent();

        // gameStartEvent.watch(function (err, result) {

        //     if (result.args.player1 != self.player1) {
        //         self.player2 = result.args.player1;
        //     } else {
        //         self.player2 = result.args.player2;
        //     }

        //     self.isPlaying = true;
        // });

        // gameCompleteEvent.watch(function (err, result) {
        //     self.player1Won = self.player1 == result.args.winner;
        //     self.player2Won = self.player2 == result.args.winner;

        //     self.winnerConfirmed = true;
        // });

        // self.ticTacToeStage3Instance.startGame(self.player1, { gas: 300000 });
    }

    clickBox(index): void {
        if (!self.isPlaying)
            return;

        console.log('box ' + (parseInt(index) + 1) + ' clicked!');

        var self = this;

        self.markBox(self.player1, index);

        self.checkIfWin(self.player1);

        if (!self.isPlaying) {
            self.ticTacToeStage3Instance.endGame(self.player1, self.player1, { gas: 300000 });
            self.ticTacToeStage3Instance.endGame(self.player2, self.player1, { gas: 300000 });
        } else {
            for (var i = 0; i < 8; ++i) {
                if (!self.boxValues[i]) {

                    self.markBox(self.player2, i);

                    self.checkIfWin(self.player2);

                    // check if win?
                    if (!self.isPlaying) {
                        self.ticTacToeStage3Instance.endGame(self.player2, self.player2, { gas: 300000 });
                        self.ticTacToeStage3Instance.endGame(self.player1, self.player2, { gas: 300000 });
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
