const mongoose =require('mongoose');

const user =mongoose.Schema({

   
    

    userName: {
        type: String,
        require :true
       // default:Regular
    },
    
    email: {
        type: String,
        require :true
       // default:Regular
    },
    password: {
        type: String,
        require :true
       // default:Regular
    },
    pdate: {
        type: Date,
        default: Date.now
    }
});

module.exports =mongoose.model('Product',user);