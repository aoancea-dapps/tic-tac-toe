pragma solidity ^ 0.4.16;

contract TicTacToeStage1Contract {

    struct Board3x3State {
        string box11;
        string box12;
        string box13;

        string box21;
        string box22;
        string box23;

        string box31;
        string box32;
        string box33;
    }

    struct Board {
        address win;

        Board3x3State state;
        
        mapping (address => string) player_value;
    }

    mapping (address => address) player_vs_player;

    mapping (address => Board) gameStates;

    function startGame(address player1, address player2) public {
        player_vs_player[player1] = player2;
        player_vs_player[player2] = player1;

        Board memory boardPlayer1 = Board(address(0), Board3x3State("","","", "","","","","",""));
        gameStates[player1] = boardPlayer1;
        gameStates[player1].player_value[player1] = "X";
        gameStates[player1].player_value[player2] = "O";
        
        Board memory boardPlayer2 = Board(address(0), Board3x3State("","","", "","","","","",""));
        gameStates[player2] = boardPlayer2;
        gameStates[player2].player_value[player1] = "X";
        gameStates[player2].player_value[player2] = "O";
    }

    function sendPick(address player, uint boxIndex) public {
        address adversary = player_vs_player[player];

        Board storage board = gameStates[player];
        string storage player_value = board.player_value[player];

        Board3x3State storage state = board.state;

        if (boxIndex == 0) {
            state.box11 = player_value;
        } else if (boxIndex == 1) {
            state.box12 = player_value;
        } else if (boxIndex == 2) {
            state.box13 = player_value;
        } else if (boxIndex == 3) {
            state.box21 = player_value;
        } else if (boxIndex == 4) {
            state.box22 = player_value;
        } else if (boxIndex == 5) {
            state.box23 = player_value;
        } else if (boxIndex == 6) {
            state.box31 = player_value;
        } else if (boxIndex == 7) {
            state.box32 = player_value;
        } else if (boxIndex == 8) {
            state.box33 = player_value;
        }
        
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
}