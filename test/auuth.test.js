const chai = require('chai')
const chaiHttp = require('chai-http')

const {app} =  require('../app.js')

chai.use(chaiHttp)




describe('Suite de pruebas de AUTH-JWT ',()=>{
    it('should return 400 if we do not provide credentials', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 400)
            done();
        })
    })

    it('should return 400 if we only provide userID ', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user:'Ema'})
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 400)
            done();
        })

    })

    it('should return 401 if the user provide invalid credentials ', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user:'Luis', passwd: 'Emas20202020' })
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 401)
            done();
        })

    })

    it('should return 200 if the user provide credentials ', (done)=>{
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user:'Ema', passwd: 'Emas23' })
        .end((err, res)=>{
            
            chai.assert.equal(res.statusCode, 200)
            done();
        })
    })

   it('should return 200 if  JWT is valid ' ,(done)=>{
    chai.request(app)
    .post('/auth/login')
    .set('content-type','application/json')
    .send({user:'Ema', passwd: 'Emas23' })
    .end((err, res)=>{
        chai.assert.equal(res.statusCode, 200)
        chai.request(app)
        .get('/team')
        .set('Authorization', `JWT ${res.body.token}`)
        .end((err, res)=>{
            chai.assert.equal(res.statusCode, 200)
            done()
        })
    })
   })
    


})