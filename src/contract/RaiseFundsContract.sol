pragma solidity ^ 0.4.16;

contract RaiseFunds {

    address public beneficiary;
    uint public raised;

    function SimpleAuction (address _beneficiary) public {
        beneficiary = _beneficiary;
    }

    function acceptFunds() payable  public {
        raised = raised + msg.value;
        beneficiary.transfer(msg.value);
    }

    function raised() public view returns (uint) {
        return raised;
    }
}