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

        mapping (uint => string) state;
        mapping (address => string) player_value;
    }

    mapping (address => address) p1_to_p2;
    mapping (address => address) p2_to_p1;

    mapping (address => Board) gameStates;

    //mapping (string => string) games;
    //mapping (string => string) gameStates;

    function SimpleAuction () public {
    }


    function startGame(address player1, address player2) public {
        p1_to_p2[player1] = player2;
        p2_to_p1[player2] = player1;

        gameStates[player1] = Board({win: address(0)});
        gameStates[player2] = gameStates[player1];

        Board storage board = gameStates[player1];
        board.player_value[player1] = "X";
        board.player_value[player2] = "0";


        // player_value[player1] = "X";
        // player_value[player2] = "0";

        // var player1AsString = toString(player1);
        // var player2AsString = toString(player2);

        // var gameIndex = strConcat(player1AsString, player2AsString);
        // games[gameIndex] = "";
        // gameStates[gameIndex] = "aaabbbccc";
    }

    function sendPick(address player, uint boxIndex) public {
        address adversary = p2_to_p1[player];

        if(adversary == address(0))
            adversary = p1_to_p2[player];

        Board storage board = gameStates[player];
        string player_value = board.player_value[player];

        board.state[boxIndex] = player_value;
    }


    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string) {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }

    function toString(address x) internal returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
}