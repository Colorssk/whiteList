// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract WhiteList{
    uint public listCount;
    uint public registerLimit;
    mapping(address=>bool) public accounts;


    constructor(uint _limit){
        registerLimit = _limit;
    }

    function addMember() public {
        require(address(msg.sender) != address(0), "invalid address");
        require(!accounts[msg.sender],"has existed");
        require(registerLimit>listCount, "no position for you");
        accounts[msg.sender] = true;
        listCount++;
    }
}