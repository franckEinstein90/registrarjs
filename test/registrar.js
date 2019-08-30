'use strict';

const registrar = require('../src/registrar').registrar

const validator = require('validator')
const uuidv4 = require('uuid/v4')

const expect = require('chai').expect

describe('registrar module', function() {
    it("rocks", function() {
        expect(1).to.eql(1)
    })
})

describe('registrar::Registrar object', function() {
    beforeEach(function() {

    })
    afterEach(function() {

    })
    context('Construction', function() {
        let reg = new registrar.Registrar
        it('is an object', function() {
            expect(reg).to.be.an('object')
        })
        it('is an instance of registrar.Registrar', function() {
            expect(reg).to.be.an.instanceOf(registrar.Registrar)
        })
        it('has the following methods and properties', function() {
            ["remove", "filter",
                "forEach",
                "size", "flush",
                "register", "get"
            ].forEach(x =>
                expect(reg).to.have.property(x));
        })
    })

    context('registrar.Registrar::register()', function() {
        let reg = new registrar.Registrar();
        let regSize = 0; 

        it('add objects in the registrar, and assigns a unique ID to each registered object', function() {
            let objID = reg.register(1)
            expect(validator.isUUID(objID)).to.equal(true);
            expect(reg.size).to.eql(1)
            regSize = reg.size
        })

        it('it can be made to use a pre-assigned unique ID', function() {
            let newID = uuidv4(); 
            let objID = reg.register({uuid:newID, value:2})
            expect(validator.isUUID(objID)).to.equal(true);
            expect(reg.size).to.eql(regSize + 1)
            expect(reg.get(newID)).to.eql(2)
            regSize = reg.size
        })

        it('is a store of objects', function() {
            [1, "dsa", {
                x: 1,
                y: 2
            }].forEach(x => reg.register(x))
            expect(reg.size).to.equal(regSize + 3)
        })
    })

    context('registrar.Registrar::flush()', function() {
        it('empties the registrar', function() {
			let reg = new registrar.Registrar()
			reg.register(1)
			expect(reg.size).to.equal(1); 
            reg.flush();
            expect(reg.size).to.equal(0);
        })
    })
})
