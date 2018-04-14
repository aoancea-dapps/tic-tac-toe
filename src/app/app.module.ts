import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Web3ProviderService } from './services/web3-provider.service';

import { AppComponent } from './app.component';

import { AuctionComponent } from './auction/auction.component';
import { AuctionMetamaskComponent } from './auction-metamask/auction-metamask.component';

const routes = [
    { path: 'auction', component: AuctionComponent },
    { path: 'auction-metamask', component: AuctionMetamaskComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        AuctionComponent,
        AuctionMetamaskComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
        FormsModule
    ],
    providers: [Web3ProviderService],
    bootstrap: [AppComponent]
})
export class AppModule { }
