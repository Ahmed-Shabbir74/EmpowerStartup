// userplaceorder.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userTypeEnum = ['candidate'];

const InputinventorySchema = new Schema({

    selectedProducts: [
        {
            productName1: String,
            quantity1: Number,
            productName2: String,
            quantity2: Number,
            productName3: String,
            quantity3: Number,
            productName4: String,
            quantity4: Number,
        }
    ],
    userId:{
        type:String,
        required:true,
    },
});

const User = mongoose.model('Inputinventory', InputinventorySchema);

module.exports = User;
