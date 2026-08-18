const Products = require('../Models/Products');

// create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, size, description, price, quantity, colour } = req.body;
        const product = new Products({ name, size, description, price, quantity, colour });

        await product.save();
        res.status(201).json({ message: 'Product created successful', product });
    } catch (error) {
        res.status(500).json({ message: 'error creating product', error: error.message });
    }
};

// update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // where id is the product id to be updated
        const { name, size, description, price, quantity, colour } = req.body;

        const product = await Products.findByIdAndUpdate(
            id,
            { name, size, description, price, quantity, colour },
            { new: true } // returns the updated document instead of the old one
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'product updated successful', product });
    } catch (error) {
        res.status(500).json({ message: 'error updating product', error: error.message });
    }
};

exports.getAllProductsById = async (req, res) => {
    try {
        const { id } = req.params; // where id is the product id to be updated)
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product retrieved successful', product });
    } catch (error) {
        res.status(500).json({ message: 'error retrieving product', error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ message: 'Products retrieved successful', products });
    } catch (error) {
        res.status(500).json({ message: 'error retrieving products', error: error.message });
    }
};