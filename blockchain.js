const Block = require('./block')
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash')

class Blockchain{
   constructor(){
       this.chain = [Block.genesis()];
   } 

    addBlock({data}){
    const block = Block.mineBlock({
        lastBlock: this.chain[this.chain.length - 1],
        data: data
    })
    this.chain.push(block);
    }

    static isValidChain(chain){

    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))return false;

    for(let i = 1; i < chain.length; i++){
        const block = chain[i];
        const actualLastHash = chain[i-1].hash;
        const {timestamp, lastHash,hash,data} = block;
        if(lastHash != actualLastHash){
            return false
        };
        const validatedHash = cryptoHash(timestamp,lastHash,data);
        if(validatedHash != hash) {
            return false
        };
    }
    return true

    }

    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error("The chain must longer")
            return this.chain;
        }else{
            if(Blockchain.isValidChain(chain) != true){
                console.error("The chain must be valid")
                return this.chain;
            }else{
                this.chain = chain;
                return this.chain;
            }
        }



    

    }
   
}

module.exports = Blockchain;