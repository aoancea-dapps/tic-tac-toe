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

    address[] pending_addreses;

    event GameCompleteEvent(address winner);
    event GameStartEvent(address player1, address player2);

    function startGame(address player) public {
        address potential_player = address(0);
        for (uint i = 0; i < pending_addreses.length; i++) {
            if (pending_addreses[i] != address(0)) {
                potential_player = pending_addreses[i];
                pending_addreses[i] = address(0);
                break;
            }
        }

        if (potential_player == address(0)) {
            pending_addreses.push(player);
        } else {
            player_vs_player[player] = potential_player;
            player_vs_player[potential_player] = player;

            emit GameStartEvent(potential_player, player);
        }
    }

    function endGame(address player, address winner) public {
        Board storage player_board = gameStates[player];
        if (!player_board.is_initiliazed) {
            player_board.is_initiliazed = true;
            player_board.potential_winner = winner;
        }

        address adversary = player_vs_player[player];
        Board storage adversary_board = gameStates[adversary];
        if (adversary_board.is_initiliazed) {
            
            if (player_board.potential_winner == adversary_board.potential_winner) {
                player_board.winner = player_board.potential_winner;
                adversary_board.winner = adversary_board.potential_winner;

                emit GameCompleteEvent(adversary_board.winner);
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