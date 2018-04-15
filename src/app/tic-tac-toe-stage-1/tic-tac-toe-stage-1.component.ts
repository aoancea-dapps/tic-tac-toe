import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tic-tac-toe-stage-1',
    templateUrl: './tic-tac-toe-stage-1.component.html',
    styleUrls: ['./tic-tac-toe-stage-1.component.less']
})
export class TicTacToeStage1Component implements OnInit {

    public boxValues: string[] = ['', '', '', '', '', '', '', '', ''];

    constructor() {

    }

    ngOnInit() {

    }

    clickBox(index): void {
        console.log('box ' + (parseInt(index) + 1) + ' clicked!');
    }
}
