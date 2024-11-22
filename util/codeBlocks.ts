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

export const burnConfidentialToken = `
    function _requestBurn(address account, uint64 amount) internal virtual {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        ebool enoughBalance = TFHE.le(amount, _balances[account]);
        TFHE.allow(enoughBalance, address(this));
        uint256[] memory cts = new uint256[](1);
        cts[0] = Gateway.toUint256(enoughBalance);
        // Store burn request
        uint256 requestID = Gateway.requestDecryption(
            cts,
            this._burnCallback.selector,
            0,
            block.timestamp + 100,
            false
        );

        burnRqs[requestID] = BurnRq(account, amount);
    }

    function _burnCallback(uint256 requestID, bool decryptedInput) public virtual onlyGateway {
        BurnRq memory burnRequest = burnRqs[requestID];
        address account = burnRequest.account;
        uint64 amount = burnRequest.amount;
        if (!decryptedInput) {
            revert("Decryption failed");
        }
        _totalSupply = _totalSupply - amount;
        _balances[account] = TFHE.sub(_balances[account], amount);
        TFHE.allow(_balances[account], address(this));
        TFHE.allow(_balances[account], account);
        delete burnRqs[requestID];
    }
`;

export const getConfidentialBalance = `
    mapping(address account => euint64) public _balances;

    function balanceOf(address account) public view virtual returns (euint64) {
        return _balances[account];
    }
`;

export const confidentialTokenCode = `
pragma solidity ^0.8.24;

import { IConfidentialERC20 } from "./Interfaces/IConfidentialERC20.sol";
import { IERC20Metadata } from "./Utils/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20Errors } from "./Utils/IERC6093.sol";
import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

abstract contract ConfidentialERC20 is Ownable, IConfidentialERC20, IERC20Metadata, IERC20Errors, GatewayCaller {
    mapping(address account => euint64) public _balances;

    mapping(address account => mapping(address spender => euint64)) internal _allowances;

    uint64 public _totalSupply;

    string private _name;
    string private _symbol;


    constructor(string memory name_, string memory symbol_) Ownable(msg.sender) {
        _name = name_;
        _symbol = symbol_;
    }
    struct BurnRq {
        address account;
        uint64 amount;
    }
    mapping(uint256 => BurnRq) public burnRqs;

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return 6;
    }

    function totalSupply() public view virtual returns (uint64) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (euint64) {
        return _balances[account];
    }

    function transfer(address to, euint64 value) public virtual returns (bool) {
        require(TFHE.isSenderAllowed(value));
        address owner = _msgSender();
        ebool isTransferable = TFHE.le(value, _balances[msg.sender]);
        _transfer(owner, to, value, isTransferable);
        return true;
    }

    function transfer(address to, einput encryptedAmount, bytes calldata inputProof) public virtual returns (bool) {
        transfer(to, TFHE.asEuint64(encryptedAmount, inputProof));
        return true;
    }

    function allowance(address owner, address spender) public view virtual returns (euint64) {
        return _allowances[owner][spender];
    }

    function approve(address spender, euint64 value) public virtual returns (bool) {
        require(TFHE.isSenderAllowed(value));
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }
    function approve(address spender, einput encryptedAmount, bytes calldata inputProof) public virtual returns (bool) {
        approve(spender, TFHE.asEuint64(encryptedAmount, inputProof));
        return true;
    }

    function transferFrom(address from, address to, euint64 value) public virtual returns (bool) {
        require(TFHE.isSenderAllowed(value));
        address spender = _msgSender();
        ebool isTransferable = _decreaseAllowance(from, spender, value);
        _transfer(from, to, value, isTransferable);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        einput encryptedAmount,
        bytes calldata inputProof
    ) public virtual returns (bool) {
        transferFrom(from, to, TFHE.asEuint64(encryptedAmount, inputProof));
        return true;
    }

    function _transfer(address from, address to, euint64 value, ebool isTransferable) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        euint64 transferValue = TFHE.select(isTransferable, value, TFHE.asEuint64(0));
        euint64 newBalanceTo = TFHE.add(_balances[to], transferValue);
        _balances[to] = newBalanceTo;
        TFHE.allow(newBalanceTo, address(this));
        TFHE.allow(newBalanceTo, to);
        euint64 newBalanceFrom = TFHE.sub(_balances[from], transferValue);
        _balances[from] = newBalanceFrom;
        TFHE.allow(newBalanceFrom, address(this));
        TFHE.allow(newBalanceFrom, from);
    }

    function _mint(address account, uint64 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _balances[account] = TFHE.add(_balances[account], value);
        TFHE.allow(_balances[account], address(this));
        TFHE.allow(_balances[account], account);
        _totalSupply += value;
    }

    function _requestBurn(address account, uint64 amount) internal virtual {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        ebool enoughBalance = TFHE.le(amount, _balances[account]);
        TFHE.allow(enoughBalance, address(this));
        uint256[] memory cts = new uint256[](1);
        cts[0] = Gateway.toUint256(enoughBalance);
        // Store burn request
        uint256 requestID = Gateway.requestDecryption(
            cts,
            this._burnCallback.selector,
            0,
            block.timestamp + 100,
            false
        );

        burnRqs[requestID] = BurnRq(account, amount);
    }

    function _burnCallback(uint256 requestID, bool decryptedInput) public virtual onlyGateway {
        BurnRq memory burnRequest = burnRqs[requestID];
        address account = burnRequest.account;
        uint64 amount = burnRequest.amount;
        if (!decryptedInput) {
            revert("Decryption failed");
        }
        _totalSupply = _totalSupply - amount;
        _balances[account] = TFHE.sub(_balances[account], amount);
        TFHE.allow(_balances[account], address(this));
        TFHE.allow(_balances[account], account);
        delete burnRqs[requestID];
    }

    function _approve(address owner, address spender, euint64 value) internal {
        _approve(owner, spender, value, true);
    }


    function _approve(address owner, address spender, euint64 value, bool emitEvent) internal virtual {
        if (owner == address(0)) {
            revert ERC20InvalidApprover(address(0));
        }
        if (spender == address(0)) {
            revert ERC20InvalidSpender(address(0));
        }
        _allowances[owner][spender] = value;
        if (emitEvent) {
            emit Approval(owner, spender, value);
        }
        TFHE.allow(value, address(this));
        TFHE.allow(value, owner);
        TFHE.allow(value, spender);
    }

    function _decreaseAllowance(address owner, address spender, euint64 amount) internal virtual returns (ebool) {
        euint64 currentAllowance = _allowances[owner][spender];

        ebool allowedTransfer = TFHE.le(amount, currentAllowance);

        ebool canTransfer = TFHE.le(amount, _balances[owner]);
        ebool isTransferable = TFHE.and(canTransfer, allowedTransfer);
        _approve(owner, spender, TFHE.select(isTransferable, TFHE.sub(currentAllowance, amount), currentAllowance));
        return isTransferable;
    }

    function _increaseAllowance(address spender, euint64 addedValue) internal virtual returns (ebool) {
        require(TFHE.isSenderAllowed(addedValue));
        address owner = _msgSender();
        ebool isTransferable = TFHE.le(addedValue, _balances[owner]);
        euint64 newAllowance = TFHE.add(_allowances[owner][spender], addedValue);
        TFHE.allow(newAllowance, address(this));
        TFHE.allow(newAllowance, owner);
        _approve(owner, spender, newAllowance);
        return isTransferable;
    }

    function increaseAllowance(address spender, euint64 addedValue) public virtual returns (ebool) {
        return _increaseAllowance(spender, addedValue);
    }

    function increaseAllowance(
        address spender,
        einput encryptedAmount,
        bytes calldata inputProof
    ) public virtual returns (ebool) {
        return increaseAllowance(spender, TFHE.asEuint64(encryptedAmount, inputProof));
    }

    function decreaseAllowance(address spender, euint64 subtractedValue) public virtual returns (ebool) {
        require(TFHE.isSenderAllowed(subtractedValue));
        return _decreaseAllowance(_msgSender(), spender, subtractedValue);
    }

    function decreaseAllowance(
        address spender,
        einput encryptedAmount,
        bytes calldata inputProof
    ) public virtual returns (ebool) {
        return decreaseAllowance(spender, TFHE.asEuint64(encryptedAmount, inputProof));
    }
}
`;

export const wrapCode = `
    function wrap(uint64 amount) external {
        uint256 _amount = uint256(amount);
        uint256 allowance = baseERC20.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Not enough allowance");
        baseERC20.safeTransferFrom(msg.sender, address(this), _amount);
        _mint(msg.sender, uint64(amount));
        emit Wrap(msg.sender, amount);
    }
`;

export const unwrapCode = `
    function unwrap(uint256 amount) external {
        if (unwrapDisabled[msg.sender]) {
            revert UnwrapNotAllowed(msg.sender);
        }

        _requestBurn(msg.sender, uint64(amount));
    }

    function _burnCallback(uint256 requestID, bool decryptedInput) public virtual override onlyGateway {
        BurnRq memory burnRequest = burnRqs[requestID];
        address account = burnRequest.account;
        uint64 amount = burnRequest.amount;

        if (!decryptedInput) {
            revert("Decryption failed");
        }

        // Call base ERC20 transfer and emit Unwrap event
        baseERC20.safeTransfer(account, amount);
        emit Unwrap(account, amount);

        // Continue with the burn logic
        _totalSupply -= amount;
        _balances[account] = TFHE.sub(_balances[account], amount);
        TFHE.allow(_balances[account], address(this));
        TFHE.allow(_balances[account], account);
        delete burnRqs[requestID];
    }
`;

export const wrapperCode = `
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";
import { ConfidentialToken } from "./ConfidentialERC20/ConfidentialToken.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
interface IERC20extended is IERC20 {
    function decimals() external view returns (uint8);
}

contract ConfidentialERC20Wrapper is ConfidentialToken {
    using SafeERC20 for IERC20;
    IERC20 public baseERC20;
    mapping(address => bool) public unwrapDisabled;
    uint8 private _decimals;
    event Wrap(address indexed account, uint64 amount);
    event Unwrap(address indexed account, uint64 amount);
    event Burn(address indexed account, uint64 amount);

    error UnwrapNotAllowed(address account);

    constructor(address _baseERC20) ConfidentialToken("Wrapped cUSDC", "wcUSDC") {
        uint8 baseERCdecimals = IERC20extended(_baseERC20).decimals();
        require(baseERCdecimals <= 6, "Base ERC20 token must have 6 or less decimals");
        baseERC20 = IERC20(_baseERC20);
        _decimals = baseERCdecimals;
        // set the wrapper decimals to be the same as the base token
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function wrap(uint64 amount) external {
        uint256 _amount = uint256(amount);
        uint256 allowance = baseERC20.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Not enough allowance");
        baseERC20.safeTransferFrom(msg.sender, address(this), _amount);
        _mint(msg.sender, uint64(amount));
        emit Wrap(msg.sender, amount);
    }

    function unwrap(uint256 amount) external {
        if (unwrapDisabled[msg.sender]) {
            revert UnwrapNotAllowed(msg.sender);
        }

        _requestBurn(msg.sender, uint64(amount));
    }

    function _burnCallback(uint256 requestID, bool decryptedInput) public virtual override onlyGateway {
        BurnRq memory burnRequest = burnRqs[requestID];
        address account = burnRequest.account;
        uint64 amount = burnRequest.amount;

        if (!decryptedInput) {
            revert("Decryption failed");
        }

        // Call base ERC20 transfer and emit Unwrap event
        baseERC20.safeTransfer(account, amount);
        emit Unwrap(account, amount);

        // Continue with the burn logic
        _totalSupply -= amount;
        _balances[account] = TFHE.sub(_balances[account], amount);
        TFHE.allow(_balances[account], address(this));
        TFHE.allow(_balances[account], account);
        delete burnRqs[requestID];
    }
}

`;
