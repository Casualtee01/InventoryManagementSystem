const user = require(`../Models/users`);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create a new user
exports.createUser = async (req, res) => {
    try {
        //resquest body validation
        const { name, email, password, gender, phone } = req.body;

        //check if all required fields are provided
        if (!name || !email || !password || !gender || !phone) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if the email already exists
        const existingUser = await user.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        //Phone number check
        const existingPhone = await user.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        //encrypt the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create a new user instance
        const newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            hasAtmCard: req.body.hasAtmCard || false,
            phone: req.body.phone,
            role: req.body.role || 'user'
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user exists
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        //check if the user exists in the database
        const existingUser = await user.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //compare passwords
        const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //generate a token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, name: existingUser.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', user: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};