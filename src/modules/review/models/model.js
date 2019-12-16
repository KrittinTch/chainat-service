'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReviewSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    imageurl: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Review", ReviewSchema);