## Tic-Tac-Toe
This is a tic-tac-toe game developed on top of Ethereum blockchain. To achieve full decentralization, deployment is done in two areas:
- Smart contracts - Ropsten test net
- Web UI - IPFS

### Features
- First version will be 3x3, but then expanding to 4x4, 5x5 and beyond
- The game should be only played in multiplayer
- After each game, the winner is incentivised  with TTTP(Tic-Tac-Toe Points) and TTTT(Tic-Tac-Toe Tokens) depending on oponents power and win score
- TTTP(Tic-Tac-Toe Points) - are used to hold a player's playing power and is used in the match-making process
- TTTT(Tic-Tac-Toe Tokens) - are used to buy several items in the game(you can buy more time, reduce the time of the other player between rounds, or buy other kinds of perks I can't think of now)
- Match-Making system implemented by a Smart Contract which joins players together based on their TTTP
- `Match-Making Start Contract` also issues `topic token` for Whisper connection in full darkness
- Chat is also available for players to communicate if they want
- Each player can set a name which might be saved on another smart contract - this consumes TTTT(you can also update it)
- Weekly or monthy leader boards? They get more points?(need to find places where to spend those new points)

### Approach
Below are two approaches for implementation and we'll try each one to see how they behave to get an in depth understanding of the underlying infrastructure and the pros/cons of each approach

#### Version 1
1. Whole logic of the game is stored inside a smart contract and every time a move is made, a transaction confirms that move and saves the state
2. Communication between nodes is done via Whisper using full darkness
3. Full darkness is achieved by way of communicating via a private topic between the two players which is issued by the `Match-Making Smart Contract`
4. Nodes Communicate between each other the following:
    - State of the game
    - When each players makes a move
    - When the game is over and they have to send in the result to the blockchain
    - When they want to communicate on the chat
    - When the time is increased/decreased of self/oponent via buying it with TTTT
    - etc

#### Version 2
1. Instead of sending each transaction, we only send the state of the game when the game is over - checking that players did not cheat is done via both players sending the state of the board thus if either changed it in their favor we will spot it - this will also remove the need to approve each transation via MetaMask and will also not slow down the game as transactions take a while on the Ropsten test net unlike a local private net where they are almost instant
2. Communication between nodes is done via Whisper using full darkness
3. Full darkness is achieved by way of communicating via a private topic between the two players which is issued by the `Match-Making Smart Contract`
4. Nodes Communicate between each other the following:
    - State of the game
    - When each players makes a move
    - When the game is over and they have to send in the result to the blockchain
    - When they want to communicate on the chat
    - When the time is increased/decreased of self/oponent via buying it with TTTT
    - etc
    
5. Players who don't send in the game state in certain time period will loose both TTTT and TTTP(more than normal) - this is to counter scenarios where people are loosing a game and they do not want to loose points

### Stages of implementation
Implementation is done in several stages to achive faster feedback from an almost complete game. Each stage should be playable while the next stage adds new features

#### Stage 1 - Single player - Ganache desktop test net - in progress
Run a test net locally and play against the computer

#### Stage 2 - Single player - MetaMask Ropsten test net - not started
Connect to the game using MetaMask on the Ropsten test net and play against the computer

#### Stage 3 - Multi player - Ganache desktop test net - not started
Run a test net locally and two game instances. In each instance pick an account from the list and start playing between the two

#### Stage 4 - Multi player - MetaMask Ropsten test net - not started
Connect to the game using MetaMask on the Ropsten test net and wait for an opponent to come online. Play it as a 1v1 accross the globe.

### Experimental communication between player - Whisper protocol
- we might be able to achive cross-player communication using the Whisper protocol by using `web3.shh`

## Simple Auction(not the actual game but a test before starting on it)
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
