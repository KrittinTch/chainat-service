'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HistorySchema = new Schema({
    historyname: {
        type: String,
    },
    historydescription: {
        type: String,
    },
    historyimage: {
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

mongoose.model("History", HistorySchema);