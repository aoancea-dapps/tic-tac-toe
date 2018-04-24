import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Web3ProviderService } from './services/web3-provider.service';
import { TicTacToeStage1ProviderService } from './tic-tac-toe-stage-1/tic-tac-toe-stage-1-provider.service';
import { TicTacToeStage12ProviderService } from './tic-tac-toe-stage-1-2/tic-tac-toe-stage-1-2-provider.service';

import { AppComponent } from './app.component';

import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionMetamaskComponent } from './auction-metamask/auction-metamask.component';
import { RaiseFundsComponent } from './raise-funds/raise-funds.component';
import { TicTacToeStage1Component } from './tic-tac-toe-stage-1/tic-tac-toe-stage-1.component';
import { TicTacToeStage12Component } from './tic-tac-toe-stage-1-2/tic-tac-toe-stage-1-2.component';

const routes = [
    { path: 'navigation-page', component: NavigationPageComponent },
    { path: 'auction', component: AuctionComponent },
    { path: 'auction-metamask', component: AuctionMetamaskComponent },
    { path: 'raise-funds', component: RaiseFundsComponent },
    { path: 'tic-tac-toe-stage-1', component: TicTacToeStage1Component },
    { path: 'tic-tac-toe-stage-1-2', component: TicTacToeStage12Component },

    { path: '', redirectTo: '/navigation-page', pathMatch: "full" }
]

@NgModule({
    declarations: [
        AppComponent,
        NavigationPageComponent,
        AuctionComponent,
        AuctionMetamaskComponent,
        RaiseFundsComponent,
        TicTacToeStage1Component,
        TicTacToeStage12Component,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
        FormsModule
    ],
    providers: [Web3ProviderService, TicTacToeStage1ProviderService, TicTacToeStage12ProviderService],
    bootstrap: [AppComponent]
})
export class AppModule { }
