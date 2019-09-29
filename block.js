const {GENESIS_DATA} = require('./config')
const cryptoHash = require('./crypto-hash')
class Block{
    constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp;
        this.hash = hash
        this.lastHash = lastHash
        this.data = data;
    }
    static genesis(){
        return new Block(GENESIS_DATA);
    }

    static mineBlock({lastBlock,data}){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new Block({
            timestamp,
            data,
            lastHash,
            hash:cryptoHash(timestamp,data,lastHash)


        });
    }
    
}

module.exports = Block;