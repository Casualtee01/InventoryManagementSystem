const mongoose = require(`mongoose`);
const Productsschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required:true
    },
    colour: {
        type: String,
        required: true
    }

},
 {timestamps:true} //DATE CREATED AND DATE UPDATED AT

);

//create model from schema
const Products = mongoose.model('Products', Productsschema);

module.exports = Products;   //export the model to be used in other files
