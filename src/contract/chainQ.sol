// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract chainQ {
    address public owner;
    uint256 public subscriptionPrice;
    mapping(address => uint256) public subscriptions;
    mapping(address => uint256) public balances;

    event SubscriptionPurchased(address indexed user, uint256 amount);
    event BalanceWithdrawn(address indexed user, uint256 amount);
    event SubscriptionPriceChanged(uint256 newPrice);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _subscriptionPrice) {
        owner = msg.sender;
        subscriptionPrice = _subscriptionPrice;
    }

    function purchaseSubscription() public payable {
        require(msg.value >= subscriptionPrice, "Insufficient funds to purchase a subscription");
        require(subscriptions[msg.sender] == 0, "You already have an active subscription");

        subscriptions[msg.sender] = block.timestamp + 30 days; // 30-day subscription
        balances[msg.sender] += msg.value;

        emit SubscriptionPurchased(msg.sender, msg.value);
    }

    function getSubscriptionStatus(address user) external view returns (bool hasSubscription, uint256 expirationTimestamp) {
        hasSubscription = subscriptions[user] > block.timestamp;
        expirationTimestamp = subscriptions[user];
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawFunds(uint256 amount) public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds available for withdrawal");
        require(amount <= contractBalance, "Withdrawal amount exceeds contract balance");
    
        payable(owner).transfer(amount);
    
        emit BalanceWithdrawn(owner, amount);
    }

    // Function to change the subscription price
    function changeSubscriptionPrice(uint256 newPrice) public onlyOwner {
        subscriptionPrice = newPrice;
        emit SubscriptionPriceChanged(newPrice);
    }
    
    // Receive function to accept Ether
    receive() external payable {
        
    }
    
    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner address cannot be zero");
        owner = newOwner;
    }

}
