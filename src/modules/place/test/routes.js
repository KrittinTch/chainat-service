'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Place = mongoose.model('Place');

var credentials,
    token,
    mockup;

describe('Place CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            temple: [{
                name: "ชื่อวัด",
                description: "รายละเอียดวัด",
                image: "www.fff.com"
            }],
            restaurant: [{
                name: "ชื่อร้านอาหาร",
                description: "รายละเอียดร้านอาหาร",
                image: "www.fff.com"
            }],
            cafe: [{
                name: "ชื่อร้านกาแฟ",
                description: "รายละเอียดร้านกาแฟ",
                image: "www.fff.com"
            }],
            otherplace: [{
                name: "ชื่อสถานที่อื่นๆ",
                description: "รายละเอียดสถานที่",
                image: "www.fff.com"
            }]
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

    it('should be Place get use token', (done) => {
        request(app)
            .get('/api/places')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Place get by id', function (done) {

        request(app)
            .post('/api/places')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/places/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;

                        assert.equal(resp.status, 200);

                        assert.equal(resp.data.temple[0].name, mockup.temple[0].name);
                        assert.equal(resp.data.temple[0].description, mockup.temple[0].description)
                        assert.equal(resp.data.temple[0].image, mockup.temple[0].image)

                        assert.equal(resp.data.restaurant[0].name, mockup.restaurant[0].name);
                        assert.equal(resp.data.restaurant[0].description, mockup.restaurant[0].description)
                        assert.equal(resp.data.restaurant[0].image, mockup.restaurant[0].image)

                        assert.equal(resp.data.cafe[0].name, mockup.cafe[0].name);
                        assert.equal(resp.data.cafe[0].description, mockup.cafe[0].description)
                        assert.equal(resp.data.cafe[0].image, mockup.cafe[0].image)

                        assert.equal(resp.data.otherplace[0].name, mockup.otherplace[0].name);
                        assert.equal(resp.data.otherplace[0].description, mockup.otherplace[0].description)
                        assert.equal(resp.data.otherplace[0].image, mockup.otherplace[0].image)
                        done();
                    });
            });

    });

    it('should be Place post use token', (done) => {
        request(app)
            .post('/api/places')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);

                assert.equal(resp.data.temple[0].name, mockup.temple[0].name);
                assert.equal(resp.data.temple[0].description, mockup.temple[0].description)
                assert.equal(resp.data.temple[0].image, mockup.temple[0].image)

                assert.equal(resp.data.restaurant[0].name, mockup.restaurant[0].name);
                assert.equal(resp.data.restaurant[0].description, mockup.restaurant[0].description)
                assert.equal(resp.data.restaurant[0].image, mockup.restaurant[0].image)

                assert.equal(resp.data.cafe[0].name, mockup.cafe[0].name);
                assert.equal(resp.data.cafe[0].description, mockup.cafe[0].description)
                assert.equal(resp.data.cafe[0].image, mockup.cafe[0].image)

                assert.equal(resp.data.otherplace[0].name, mockup.otherplace[0].name);
                assert.equal(resp.data.otherplace[0].description, mockup.otherplace[0].description)
                assert.equal(resp.data.otherplace[0].image, mockup.otherplace[0].image)
                done();
            });
    });

    it('should be place put use token', function (done) {

        request(app)
            .post('/api/places')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    temple: [{
                        name: "ชื่อวัด1",
                        description: "รายละเอียดวัด1",
                        image: "www.fff1.com"
                    }],
                    restaurant: [{
                        name: "ชื่อร้านอาหาร1",
                        description: "รายละเอียดร้านอาหาร1",
                        image: "www.fff1.com"
                    }],
                    cafe: [{
                        name: "ชื่อร้านกาแฟ1",
                        description: "รายละเอียดร้านกาแฟ1",
                        image: "www.fff1.com"
                    }],
                    otherplace: [{
                        name: "ชื่อสถานที่อื่นๆ1",
                        description: "รายละเอียดสถานที่1",
                        image: "www.fff1.com"
                    }]
                }
                request(app)
                    .put('/api/places/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);

                        assert.equal(resp.data.temple[0].name, update.temple[0].name);
                        assert.equal(resp.data.temple[0].description, update.temple[0].description)
                        assert.equal(resp.data.temple[0].image, update.temple[0].image)

                        assert.equal(resp.data.restaurant[0].name, update.restaurant[0].name);
                        assert.equal(resp.data.restaurant[0].description, update.restaurant[0].description)
                        assert.equal(resp.data.restaurant[0].image, update.restaurant[0].image)

                        assert.equal(resp.data.cafe[0].name, update.cafe[0].name);
                        assert.equal(resp.data.cafe[0].description, update.cafe[0].description)
                        assert.equal(resp.data.cafe[0].image, update.cafe[0].image)

                        assert.equal(resp.data.otherplace[0].name, update.otherplace[0].name);
                        assert.equal(resp.data.otherplace[0].description, update.otherplace[0].description)
                        assert.equal(resp.data.otherplace[0].image, update.otherplace[0].image)
                        done();
                    });
            });

    });

    it('should be place delete use token', function (done) {

        request(app)
            .post('/api/places')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/places/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    xit('should be place get not use token', (done) => {
        request(app)
            .get('/api/places')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    xit('should be place post not use token', function (done) {

        request(app)
            .post('/api/places')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    xit('should be place put not use token', function (done) {

        request(app)
            .post('/api/places')
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
                    .put('/api/places/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    xit('should be place delete not use token', function (done) {

        request(app)
            .post('/api/places')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/places/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Place.remove().exec(done);
    });

});