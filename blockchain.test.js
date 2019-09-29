const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', ()=>{
    const blockchain = new Blockchain();
    it('Contains a chain array', ()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    })

    it('Starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('Adds a block to the chain',()=>{
        const newData = 'foo-data'
        blockchain.addBlock({data:newData});
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData)
    })

})


describe('isValidChain()',()=>{

    describe('Does not start with a genesis block',()=>{
        it('Returns false',()=>{
            let blockchain;
            blockchain = new Blockchain();
            blockchain.chain[0] = {data:"NOTGENESIS"}
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
        })

    })

    describe('When the chain starts with the genesis block and has multiple blocks',()=>{
        describe('When the last hash has been tampered with',()=>{
            let blockchain;
            blockchain = new Blockchain();
            blockchain.addBlock({data:"Apple"})
            blockchain.addBlock({data:"Banana"})
            blockchain.addBlock({data:"Orange"})
            blockchain.chain[2].lastHash = "Tampered-hash"
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        })

        describe('When the data has been tampered with',()=>{
            let blockchain;
            blockchain = new Blockchain();
            blockchain.addBlock({data:"Apple"})
            blockchain.addBlock({data:"Banana"})
            blockchain.addBlock({data:"Orange"})
            blockchain.chain[2].data = "Dirty data"
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

        })

        describe('When the chain is valid',()=>{
            let blockchain;
            blockchain = new Blockchain();
            blockchain.addBlock({data:"Apple"})
            blockchain.addBlock({data:"Banana"})
            blockchain.addBlock({data:"Orange"})
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        })
    })
})

describe('replaceChain()',()=>{
    describe('When the new chain is not longer',()=>{
        it('does not replace the old chain',()=>{
            const blockchain = new Blockchain();
            const newChain = new Blockchain();
            blockchain.addBlock({data:"Apple"});
            blockchain.addBlock({data:"Banana"})
            blockchain.addBlock({data:"Cabbage"})
            newChain.addBlock({data:"Apple"});
            newChain.addBlock({data:"Banana"});
            originalChain = blockchain.chain;
            expect(blockchain.replaceChain(newChain.chain)).toBe(originalChain);
        })
    })
    describe('When the new chain is longer',()=>{

        describe('When the new chain is valid',()=>{
            it('Replaces the old chain',()=>{
                const blockchain = new Blockchain();
                const newChain = new Blockchain();
                blockchain.addBlock({data:"Apple"});
                blockchain.addBlock({data:"Banana"})
                blockchain.addBlock({data:"Cabbage"})
                newChain.addBlock({data:"Apple"});
                newChain.addBlock({data:"Banana"});
                newChain.addBlock({data:"Cabbage"});
                newChain.addBlock({data:"Durian"});
                newChain.addBlock({data:"Guava"});
                expect(blockchain.replaceChain(newChain.chain)).toEqual(newChain.chain);
            })
        })

        describe('When the new chain is not valid',()=>{
            const blockchain = new Blockchain();
            const newChain = new Blockchain();
            blockchain.addBlock({data:"Apple"});
            blockchain.addBlock({data:"Banana"})
            blockchain.addBlock({data:"Cabbage"})
            newChain.addBlock({data:"Apple"});
            newChain.addBlock({data:"Banana"});
            newChain.addBlock({data:"Cabbage"});
            newChain.addBlock({data:"Durian"});
            newChain.addBlock({data:"Guava"});
            newChain.chain[3].data = "MANIPULATED DATA"
            it('does not replace the old chain', ()=>{
                originalChain = blockchain.chain;
                expect(blockchain.replaceChain(newChain.chain)).toBe(originalChain);
            })

        })
    })
})