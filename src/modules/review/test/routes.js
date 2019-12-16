'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Review = mongoose.model('Review');

var credentials,
    token,
    mockup;

describe('Review CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "ชื่อรีวิว",
            description: "รายละเอียดรีวิว",
            location: "สถานที่",
            imageurl: "www.ggg.com"

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

    it('should be Review get use token', (done)=>{
        request(app)
        .get('/api/reviews')
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

    it('should be Review get by id', function (done) {

        request(app)
            .post('/api/reviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/reviews/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.location, mockup.location);
                        assert.equal(resp.data.imageurl, mockup.imageurl);
                        done();
                    });
            });

    });

    it('should be Review post use token', (done)=>{
        request(app)
            .post('/api/reviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.location, mockup.location);
                assert.equal(resp.data.imageurl, mockup.imageurl);
                done();
            });
    });

    it('should be review put use token', function (done) {

        request(app)
            .post('/api/reviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "ชื่อรีวิว1",
                    description: "รายละเอียดรีวิว1",
                    location: "สถานที่1",
                    imageurl: "www.ggg1.com"
                }
                request(app)
                    .put('/api/reviews/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.location, update.location);
                        assert.equal(resp.data.imageurl, update.imageurl);
                        done();
                    });
            });

    });

    it('should be review delete use token', function (done) {

        request(app)
            .post('/api/reviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/reviews/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be review get not use token', (done)=>{
        request(app)
        .get('/api/reviews')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be review post not use token', function (done) {

        request(app)
            .post('/api/reviews')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be review put not use token', function (done) {

        request(app)
            .post('/api/reviews')
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
                    .put('/api/reviews/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be review delete not use token', function (done) {

        request(app)
            .post('/api/reviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/reviews/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Review.remove().exec(done);
    });

});