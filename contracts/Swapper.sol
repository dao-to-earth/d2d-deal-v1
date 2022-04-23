// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./ISwapper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Swapper is ISwapper {
    using Counters for Counters.Counter;
    Counters.Counter private _dealId;

    // TODO: refacto this ugly struct
    // deal_id => pair of Offer()
    struct Deal {
        address account1;
        address account2;
        address token1;
        address token2;
        uint256 amount1;
        uint256 amount2;
        uint256 startDate;
        uint256 vesting;
        uint256 deadline;
        Status status;
    }
    mapping(uint256 => Deal) private _deals;

    mapping(address => mapping(address => uint256)) private _balances;

    function propose(
        address token1, 
        uint256 amount1, 
        address receiver, 
        address token2, 
        uint256 amount2, 
        uint256 vesting,
        uint256 deadline
    ) external override returns(bool, uint256) {
       
        _transfer(msg.sender, token1, amount1);
        
        uint256 id = _dealId.current();
        _deals[id] = Deal({
            account1: msg.sender, 
            account2: receiver,
            token1: token1,
            token2: token2,
            amount1: amount1,
            amount2: amount2,
            vesting: vesting,
            deadline: deadline,
            startDate: block.number,
            status: Status.Pending
        });
        _dealId.increment();

        emit DealCreated(msg.sender, token1, amount1, receiver, token2, amount2, vesting);

        return (true, id);
    }

    function approve(uint256 id) external override returns (bool) {
        Deal storage deal = _deals[id];

        require(msg.sender == deal.account2, "Swapper: caller not allowed");

        _transfer(msg.sender, deal.token2, deal.amount2);
        
        deal.status = Status.Approved;

        emit DealApproved(id, msg.sender);

        return true;
    }

    function claim(uint256 id) external override returns (bool) {
        Deal storage deal = _deals[id];
        
        require((deal.account1 == msg.sender) || (deal.account2 == msg.sender), "Swapper: caller is not stakeholder");
        
        require(deal.startDate + deal.vesting >= block.number, "Swapper: vesting period is not over");

        IERC20(deal.token1).transfer(deal.account2, deal.amount1);
        IERC20(deal.token2).transfer(deal.account1, deal.amount2);

        deal.status = Status.Claimed;
        
        emit DealClaimed(id, msg.sender);
        
        return true;
    }

    function cancel(uint256 id) external override returns (bool) {
        Deal storage deal = _deals[id];
        require(deal.account1 == msg.sender, "Swapper: caller is not the deal proposer");
        require(deal.status == Status.Pending, "Swapper: deal is no longer pending");
        require(deal.startDate + deal.deadline >= block.number, "Swapper: acceptance period is not over");
        IERC20(deal.token1).transfer(deal.account1, deal.amount1);
        deal.status = Status.Canceled;
        
        emit DealCanceled(id, msg.sender);

        return true;
    }

    function _transfer(address account, address token, uint256 amount) private {
        uint256 allowance = IERC20(token).allowance(account, address(this));
        require(allowance >= amount, "Swapper: needs allowance");
        
        bool success = IERC20(token).transferFrom(account, address(this), amount);
        require(success, "Swapper: token transfer has failed");

        _balances[account][token] = amount;
    }
}