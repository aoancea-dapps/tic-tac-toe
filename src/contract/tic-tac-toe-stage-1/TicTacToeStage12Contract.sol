pragma solidity ^0.4.16;

contract TicTacToeStage1Contract {

    struct Board {
        string player_1_game_state; // final state of the game from player1's perspective
        string player_2_game_state; // final state of the game from player1's perspective

        address player_1_winner; // who won from player1's perspective
        address player_2_winner; // who won from player2's perspective

        string player_1_value; // player1's game value, if it's X or 0
        string player_2_value; // player2's game value, if it's X or 0

        address winner;
        bool isDraw;
    }

    mapping (address => address) player_vs_player;

    mapping (address => Board) gameStates;

    function startGame(address player1, address player2) public {
        player_vs_player[player1] = player2;
        player_vs_player[player2] = player1;

        Board memory boardPlayer1 = Board("", "", "X", "O");
        gameStates[player1] = boardPlayer1;
        
        Board memory boardPlayer2 = Board("", "", "X", "O");
        gameStates[player2] = boardPlayer2;
    }

    function sendPick(address player, uint boxIndex) public {
        address adversary = player_vs_player[player];

        Board storage board = gameStates[player];

        gameStates[player] = board;
        gameStates[adversary] = board;
    }
    
    function getLine1State(address player) constant public returns (string, string, string) {
        Board storage board = gameStates[player];
        
        return (board.state.box11, board.state.box12, board.state.box13);
    }
    
    function getLine2State(address player) constant public returns (string, string, string) {
        Board storage board = gameStates[player];
        
        return (board.state.box21, board.state.box22, board.state.box23);
    }
    
    function getLine3State(address player) constant public returns (string, string, string) {
        Board storage board = gameStates[player];
        
        return (board.state.box31, board.state.box32, board.state.box33);
    }
    
    function getPlayerValue(address player) constant public returns(string) {
        Board storage board = gameStates[player];
        
        return board.player_value[player];
    }
    
    function getWinner() constant public returns(address) {
        Board storage board = gameStates[msg.sender];
        
        return board.win;
    }

    function endGame(string player_game_state, address winner) public {
        Board storage board = gameStates[msg.sender];

        board.winner = winner; // this is wrong, we need to check both game states from both players(we can even send in only the winner, not even the game state)
    }
}