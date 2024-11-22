export const mintConfidentialToken = `
    function _mint(address account, uint64 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _balances[account] = TFHE.add(_balances[account], value);
        TFHE.allow(_balances[account], address(this));
        TFHE.allow(_balances[account], account);
        _totalSupply += value;
    }
`;
