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
    public is_draw: boolean = false;

    public contract_address: string;

    private player1_state: string;
    private player2_state: string;

    private player_states: Map<string, string>;

    public game_status: string;

    constructor(private web3Provider: Web3ProviderService, private ticTacToeStage3Provider: TicTacToeStage3ProviderService) {
        this.web3 = this.web3Provider.web3;
    }

    ngOnInit() {
        var self = this;

        self.contract_address = '0x040e5d71ad98e8a1de786d4bccefee4767884bd4';
        self.accounts = this.web3.eth.accounts;

        self.web3.eth.defaultAccount = self.accounts[0];

        self.player_states = new Map<string, string>();
    }

    startGame(): void {
        var self = this;

        self.game_status = 'Connecting';

        self.web3.eth.defaultAccount = self.player1;

        var TicTacToeStage3Contract = self.web3.eth.contract(self.ticTacToeStage3Provider.abi);

        self.ticTacToeStage3Instance = TicTacToeStage3Contract.at(self.contract_address);

        var gameStartEvent = self.ticTacToeStage3Instance.GameStartEvent();
        var gameCompleteEvent = self.ticTacToeStage3Instance.GameCompleteEvent();
        var markBoxEvent = self.ticTacToeStage3Instance.MarkBoxEvent();

        gameStartEvent.watch(function (err, result) {

            if (result.args.player1 != self.player1) {
                self.player2 = result.args.player1;
            } else {
                self.player2 = result.args.player2;
            }

            if (result.args.player1 == self.player1) {

                self.player_states[self.player1] = 'X';
                self.player_states[self.player2] = 'O';
            } else {
                self.player_states[self.player1] = 'O';
                self.player_states[self.player2] = 'X';
            }

            self.isPlaying = true;

            self.game_status = "You are now connected with " + self.player2;
        });

        gameCompleteEvent.watch(function (err, result) {
            self.player1Won = self.player1 == result.args.winner;
            self.player2Won = self.player2 == result.args.winner;

            self.winnerConfirmed = true;
        });

        markBoxEvent.watch(function (err, result) {
            if (result.args.player == self.player2) {

                self.markBox(self.player2, result.args.index);

                self.checkIfWin(self.player2);

                if (!self.isPlaying) {

                    if (self.is_draw) {
                        self.ticTacToeStage3Instance.endGame(self.player1, '0x0000000000000000000000000000000000000000', { gas: 300000 });
                    } else {
                        self.ticTacToeStage3Instance.endGame(self.player1, self.player2, { gas: 300000 });
                    }
                }
            }
        });

        self.ticTacToeStage3Instance.startGame(self.player1, { gas: 300000 });
    }

    clickBox(index): void {
        var self = this;

        if (!self.isPlaying)
            return;

        console.log('box ' + (parseInt(index) + 1) + ' clicked!');

        var self = this;

        self.ticTacToeStage3Instance.markBox(index, { gas: 300000 });

        self.markBox(self.player1, index);

        self.checkIfWin(self.player1);

        if (!self.isPlaying) {

            if (self.is_draw) {
                self.ticTacToeStage3Instance.endGame(self.player1, '0x0000000000000000000000000000000000000000', { gas: 300000 });
            } else {
                self.ticTacToeStage3Instance.endGame(self.player1, self.player1, { gas: 300000 });
            }
        }
    }

    private checkIfWin(player: string): void {
        var playerState = this.player_states[player];

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
        } else if (this.boxValues[0] && this.boxValues[1] && this.boxValues[2]
            && this.boxValues[3] && this.boxValues[4] && this.boxValues[5]
            && this.boxValues[6] && this.boxValues[7] && this.boxValues[8]
        ) {
            this.is_draw = true;
            this.isPlaying = false;
        }
    }

    private markBox(player: string, index: number): void {
        var playerState = this.player_states[player];

        this.boxValues[index] = playerState;
    }
}
