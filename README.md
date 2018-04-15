# Simple Auction(not the actual game but a test before starting on it)
Here we test the deployment to IPFS of https://github.com/aoancea/dapps-auction-angular-client. It's a test to see if and how a dapp needs to be deployed in order to also work properly

#### Installation steps
- Install ganache-cli for desktop and run it with 5-10 accounts on http://127.0.0.1:7545
- Navigate to https://gateway.ipfs.io/ipfs/QmQqNmXSWU2c3BxyeZfiHG6S5GngHUqznh8XtFyXMyyvtH

## Raise funds app(not the actual game but a test before starting on it)
This is a simple page that tries to implement a crowdfunding campain. You are able to transfer money to my account through a smart contract using MetaMask connected to the Ropsten public test net.

#### What is this actually?
- It's a web application fully hosted on IPFS meaning that it has no single point of failure and it can only go down if all nodes in the IPFS network go down which is very unlikely
- It's a web application on which nobody has access anymore in terms of changing any of its code. It's fully immutable
- It's application that connects to the Ropsten public test net through MetaMask and accepts ETH to send to my account
- It's a decentralized application hosted decentralized

#### Install steps
- Access https://gateway.ipfs.io/ipfs/QmSv8Th6MQLv8BsTot43KnDydMQi9kcfecPQgV8nNzcRr8/#/raise-funds - there is a bug that makes the UI not really refresh when actually needed. To fix this just click on the text box from time to time and it will refresh the entire UI (do not access the other 2 links as they might crash)
- Install MetaMask from https://metamask.io/. It comes with a built in account.
- Select the `Ropsten` test net from upper left of the pop-up which opens when you click on the MetaMask fox icon -> you are now connected to the `Ropsten` test net
- Hit the `BUY` button to get Ethereum in your account as your current balance is `0`
- Hit `ROPSTEN TEST FAUCET` and get redirected to the actual site where you'll transfer funds to your accout
- You are now on https://faucet.metamask.io/ and hit `request 1 ether from faucet`
- Wait until the transaction is processed. You can meanwhile access the transaction hash appearing in the transation section and see what actually happens. Here is an example https://ropsten.etherscan.io/tx/0x830c212282ce436cf86916606417e1dd85d728c7acad426f19736590d7295080
- Now that you have earned `1 ETH` go back to https://gateway.ipfs.io/ipfs/QmSv8Th6MQLv8BsTot43KnDydMQi9kcfecPQgV8nNzcRr8/#/raise-funds
- Enter a value between 0 and 1 inside the text box and hit `Transfer`
- Check your MetaMask extension icon as you'll have to approve the transaction
- Hit `Submit` and click on the transaction generated in the `Sent` tab if you want to inspect it like when you aquired `1 ETH`
- Wait until the transation is completed(remember to click from time to time on the text box in the page so it gets refreshes - it's about that annoying bug)
- You have now succesfuly transfered me ether, `Thank you and come again`
