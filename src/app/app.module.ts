import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Web3ProviderService } from './services/web3-provider.service';

import { AppComponent } from './app.component';

import { AuctionComponent } from './auction/auction.component';

const routes = [
    { path: 'auction', component: AuctionComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        AuctionComponent
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
