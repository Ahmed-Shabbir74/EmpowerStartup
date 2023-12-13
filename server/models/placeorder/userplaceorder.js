// userplaceorder.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userTypeEnum = ['candidate'];

const placeorderSchema = new Schema({

    selectedProducts: [
        {
            productName: String,
            quantity: Number,
            productname2: String,
            quantity2: Number,
            productname3: String,
            quantity3: Number,
            productname4: String,
            quantity4: Number,
        }
    ],
    userId:{
        type:String,
        required:true,
    },
});

const User = mongoose.model('Placeorder', placeorderSchema);

module.exports = User;
