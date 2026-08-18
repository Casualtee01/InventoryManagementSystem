const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // ✅ load env variables FIRST, before anything else uses them

const app = express();

const connectDB = require('./Config/DatabaseConfig');
connectDB(); // ✅ now MONGO_URI will be available

const productRoute = require('./Routes/ProductRoutes');
const userRoute = require('./Routes/UserRoutes');
app.use(express.json()); // middleware to parse JSON request bodies

app.use('/products', productRoute); // use the product route for all requests starting with /products
app.use('/users', userRoute); // use the user route for all requests starting with /users

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`); // ✅ backticks fix interpolation
});