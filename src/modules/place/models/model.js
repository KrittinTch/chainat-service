'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PlaceSchema = new Schema({
    history: {
        topic: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        }
    },
    temple: {
        type: [
            {
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                image: {
                    type: String
                }
            }
        ]
    },
    restaurant: {
        type: [
            {
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                image: {
                    type: String
                }
            }
        ]
    },
    cafe: {
        type: [
            {
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                image: {
                    type: String
                }
            }
        ]
    },
    otherplace: {
        type: [
            {
                name: {
                    type: String
                },
                description: {
                    type: String
                },
                image: {
                    type: String
                }
            }
        ]
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

mongoose.model("Place", PlaceSchema);