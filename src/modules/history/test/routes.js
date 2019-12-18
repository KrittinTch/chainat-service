'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    History = mongoose.model('History');

var credentials,
    token,
    mockup;

describe('History CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            historyname: 'ประวัติความเป็นมา',
            historydescription: 'รายละเอียดความเป็นมา',
            historyimage: 'www.ggg.com'
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be History get use token', (done)=>{
        request(app)
        .get('/api/historys')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be History get by id', function (done) {

        request(app)
            .post('/api/historys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/historys/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.historyname, mockup.historyname);
                        assert.equal(resp.data.historydescription, mockup.historydescription);
                        assert.equal(resp.data.historyimage, mockup.historyimage);
                        done();
                    });
            });

    });

    it('should be History post use token', (done)=>{
        request(app)
            .post('/api/historys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.historyname, mockup.historyname);
                assert.equal(resp.data.historydescription, mockup.historydescription);
                assert.equal(resp.data.historyimage, mockup.historyimage);
                done();
            });
    });

    it('should be history put use token', function (done) {

        request(app)
            .post('/api/historys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    historyname: 'ประวัติความเป็นมา1',
                    historydescription: 'รายละเอียดความเป็นมา1',
                    historyimage: 'www.ggg1.com'
                }
                request(app)
                    .put('/api/historys/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.historyname, update.historyname);
                        assert.equal(resp.data.historydescription, update.historydescription);
                        assert.equal(resp.data.historyimage, update.historyimage);
                        done();
                    });
            });

    });

    it('should be history delete use token', function (done) {

        request(app)
            .post('/api/historys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/historys/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    xit('should be history get not use token', (done)=>{
        request(app)
        .get('/api/historys')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    xit('should be history post not use token', function (done) {

        request(app)
            .post('/api/historys')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    xit('should be history put not use token', function (done) {

        request(app)
            .post('/api/historys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/historys/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    xit('should be history delete not use token', function (done) {

        request(app)
            .post('/api/historys')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/historys/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        History.remove().exec(done);
    });

});