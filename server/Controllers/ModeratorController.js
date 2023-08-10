const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Moderator } = require('../Models/Moderator');
const { Request } = require('../Models/Teacher')
const dotenv = require('dotenv');
dotenv.config();

const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingModerator = await Moderator.findOne({ email });

        if (existingModerator) {
            return res.status(409).json({ error: 'Moderator already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newModerator = new Moderator({
            name,
            email,
            password: hashedPassword,
        });

        await newModerator.save();

        return res.status(201).json({ message: 'Moderator created successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error in saving moderator', message: error });
    }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const moderator = await Moderator.findOne({ email });

        if (!moderator) {
            return res.status(404).json({ error: 'Moderator not found' });
        }

        const passwordMatch = await bcrypt.compare(password, moderator.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: moderator._id, role: 'moderator' }, process.env.JWT_SECRET_KEY);

        return res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Error in Moderator login', message: error });
    }
};

const approverequests = async (req, res) => {
    try {
        const { moderatorId, requestId } = req.body;
        const moderator = await Moderator.findById(moderatorId);

        if (!moderator) {
            throw new Error('Moderator not found');
        }

        const request = await Request.findById(requestId);

        if (!request) {
            throw new Error('Request not found');
        }

        request.status = 'approved';
        request.approved_by = moderator._id;
        await request.save();

        moderator.requests.push(request);
        await moderator.save();

        return res.status(200).json({ message: 'Request approved successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error in approving request', message: error });
    }
};

module.exports = {
    Signup,
    Login,
    approverequests
};
