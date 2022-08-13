const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const {app} = require('../app')

let allTeam = [{name:'Pikachu'}, {name:'Charizard'}]

describe('Suite de pruebas de teams', ()=>{
    it('should be retunr team of the user', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user:'Ema', passwd: 'Emas23' })
        .end((err, result)=>{
            chai.assert.equal(result.statusCode, 200)
            chai.request(app)
            .get('/team')
            .set('Authorization', `JWT ${result.body.token}`)
            .end((err, res)=>{
                chai.assert.equal(res.statusCode, 200)
                chai.assert.equal(res.body.trainer, 'Ema')
                chai.assert.equal(res.body.team.length, 0)
                done();
            })
        })
    })
    it('should be update team', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user:'Ema', passwd: 'Emas23' })
        .end((err, result)=>{
            const {token} = result.body;
            chai.assert.equal(result.statusCode, 200)
            chai.request(app)
            .put('/team')
            .set('Authorization', `JWT ${token}`)
            .send({ allTeam})
            .end((err, res)=>{
                chai.assert.equal(res.statusCode, 200)
                chai.request(app)
                .get('/team')
                .set('Authorization', `JWT ${token}`)
                .end((err, res)=>{
                    chai.assert.equal(res.statusCode, 200)
                    chai.assert.equal(res.body.trainer, 'Ema')
                    chai.assert.equal(res.body.team.length, allTeam.length)
                    chai.assert.equal(res.body.team[0].name, allTeam[0].name)
                    done();
                })
            })
        })
    })

    it('Should saved new pokemon name in the user team', (done)=>{
        let pokeName = {name: "ditto"};
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user:'ELE', passwd: '12324' })
        .end((err, res) => {
            const {token} = res.body
            chai.assert.equal(res.statusCode, 200)
            chai.request(app)
            .post('/team/pokemons')
            .set('Authorization', `JWT ${token}`)
            .send(pokeName)
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 201)
                chai.request(app)
                .get('/team')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    chai.assert.equal(res.statusCode, 200)
                    chai.assert.equal(res.body.trainer, 'ELE')
                    chai.assert.equal(res.body.team[0].name, pokeName.name)
                    chai.assert.equal(res.body.team[0].pokedexnumber, 132)
                    done()
                })
            })

        })
    })

})