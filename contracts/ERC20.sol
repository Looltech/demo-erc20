pragma solidity ^0.5.0;

contract ERC20 {
    //V1
    uint256 total;
    mapping(address => uint256) balances;
    
    
    event TRANSFER(address _from, address _to, uint256 _value);
    
    constructor(uint256 _total) public {
        total = _total;
        balances[msg.sender] = total;
    }
    
    function totalSupply() view public returns (uint256) {
        return total;
    }
    
    function balanceOf(address _owner) view public returns (uint256) {
        return balances[_owner];
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        if(balances[msg.sender] < _value) return false;
        
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        
        emit TRANSFER(msg.sender, _to, _value);
        return true;
    }
    
    ///V2
    mapping(address => mapping(address => uint256)) allowancesMap;
    event APPROVAL(address _owner, address _spender, uint256 _value);
    
    function approve(address _spender, uint256 _value) public returns (bool) {
        if(balances[msg.sender] < _value) return false;
        
        allowancesMap[msg.sender][_spender] = _value;
        
        emit APPROVAL(msg.sender, _spender, _value);
        
        return true;
    }
    
    function allowance(address _owner, address _spender) view public returns (uint256) {
        return allowancesMap[_owner][_spender];
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        if(allowancesMap[_from][msg.sender] < _value) return false;
        if(balances[_from] < _value) return false;
        
        balances[_from] -= _value;
        balances[_to] += _value;
        
        allowancesMap[_from][msg.sender] -= _value;
        
        emit TRANSFER(_from, _to, _value);
        
        return true;
    }
}