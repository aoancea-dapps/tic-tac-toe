pragma solidity ^0.4.16;

contract TicTacToeStage12Contract {

    struct Board {
        bool is_initiliazed;

        address potential_winner; // who won from player1's perspective

        bool isDraw;

        string game_key; // will be used in a future implementation to target a specific game between two players
    }

    mapping (address => address) player_vs_player;

    mapping (address => Board) gameStates;

    event GameCompleteEvent(address winner);
    event GameStartEvent(address player1, address player2);
    event MarkBoxEvent(address player, uint index);

    address match_making_initial_player;

    function startGame(address player) public {
        if (match_making_initial_player == address(0))
            match_making_initial_player = player;

        if (match_making_initial_player == player)
            return;

        player_vs_player[player] = match_making_initial_player;
        player_vs_player[match_making_initial_player] = player;

        emit GameStartEvent(match_making_initial_player, player);

        match_making_initial_player = address(0);
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

                emit GameCompleteEvent(adversary_board.potential_winner);

                delete gameStates[player];
                delete gameStates[adversary];

                player_vs_player[player] = address(0);
                player_vs_player[adversary] = address(0);
            } else {
                revert();
            }
        }
    }

    function markBox(uint index) public {
        emit MarkBoxEvent(msg.sender, index);
    }
}