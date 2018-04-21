import { Component, OnInit } from '@angular/core';

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

    public showColum1: boolean = false;
    public showColum2: boolean = false;
    public showColum3: boolean = false;

    public showDiagonal1: boolean = false;
    public showDiagonal2: boolean = false;

    public player1Won: boolean = false;
    public player2Won: boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
