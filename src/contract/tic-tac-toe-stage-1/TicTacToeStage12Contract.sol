pragma solidity ^0.4.16;

contract TicTacToeStage12Contract {

    struct Board {
        bool is_initiliazed;

        address potential_winner; // who won from player1's perspective

        address winner;

        bool isDraw;

        string game_key; // will be used in a future implementation to target a specific game between two players
    }

    mapping (address => address) player_vs_player;

    mapping (address => Board) gameStates;

    function startGame(address player1, address player2) public {
        player_vs_player[player1] = player2;
        player_vs_player[player2] = player1;
    }

    function endGame(address winner) public {
        Board storage player_board = gameStates[msg.sender];
        if (!player_board.is_initiliazed) {
            player_board.is_initiliazed = true;
            player_board.potential_winner = winner;
        }

        address adversary = player_vs_player[msg.sender];
        Board storage adversary_board = gameStates[adversary];
        if (adversary_board.is_initiliazed) {
            
            if (player_board.potential_winner == adversary_board.potential_winner) {
                player_board.winner = player_board.potential_winner;
                adversary_board.winner = adversary_board.potential_winner;
            } else {
                revert();
            }
        }
    }

    function getWinner() constant public returns(address) {
        Board storage board = gameStates[msg.sender];
        
        return board.winner;
    }
}