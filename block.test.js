const Block = require('./block')
const cryptoHash = require('./crypto-hash')
const {GENESIS_DATA} = require('./config')
describe('Block',()=>{
    const timestamp = "foo-date";
    const lastHash ="foo-lastHash";
    const hash = "foo-hash";
    const data = ['blockchain','data'];
    const block = new Block({
      timestamp,
      lastHash,
      hash,
      data  
    });

    it('has a timestamp,lasthash, hash, and data property', ()=>{
    expect(block.timestamp).toEqual(timestamp)
    expect(block.lastHash).toEqual(lastHash)
    expect(block.hash).toEqual(hash)
    expect(block.data).toEqual(data)
    })

describe('genesis',()=>{
    const genesisBlock = Block.genesis();

    it('returns a block instance',()=>{
        expect(genesisBlock instanceof Block).toBe(true);       
    })

    it('returns genesis data',()=>{
        expect(genesisBlock).toEqual(GENESIS_DATA);
    })
})

describe('mineBlock',()=>{
    const lastBlock = Block.genesis();
    const data = 'mined block'
    const minedBlock = Block.mineBlock({lastBlock,data});

    it('returns a block instance',()=>{
        expect(minedBlock instanceof Block).toBe(true);       
    })

    it('sets the `lastHash` to be the hash of the last block',()=>{
        expect(minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it('sets the `data` to be equal to data',()=>{
        expect(minedBlock.data).toEqual(data);
    })

    it('sets the timestap', ()=>{
        expect(minedBlock.timestamp).not.toEqual(undefined)
    })

    it('creates the proper sha-256',()=>{
        expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.data, minedBlock.timestamp, minedBlock.lastHash))
    })

})
});
