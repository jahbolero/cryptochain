const cryptoHash = require('./crypto-hash')

describe('Returns a hash',()=>{

    it('Generates a sha-256 output',()=>{
     expect(cryptoHash('foo')).toEqual("2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae")
    })

    it('Generates the same hash with input arguments in any order',()=>{
        expect(cryptoHash('1','2','3')).toEqual(cryptoHash('3','1','2'))
    })
    
})