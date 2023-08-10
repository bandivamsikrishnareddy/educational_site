const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Teacher, Request } = require('../Models/Teacher');
const dotenv = require('dotenv');

dotenv.config();

// Signup: Create a new Teacher
const Signup = async (req, res) => {
    const { name, email, password, school } = req.body;

    try {
        // Check if the Teacher already exists


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Teacher
        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            school
        });

        await newTeacher.save();

        return res.status(201).json({ message: 'Teacher created successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error in saving Teacher', message: error.message });
    }
};

// Login: Authenticate and generate JWT
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the Teacher exists
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, teacher.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JSON Web Token (JWT)
        const token = jwt.sign({ userId: teacher._id, role: 'teacher' }, process.env.JWT_SECRET_KEY);

        return res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Error in Teacher login', message: error.message });
    }
};

// addRequest: Add a new request to the teacher's requests array
const addRequest = async (req, res) => {
    try {
        const { teacherId, content } = req.body;

        // Check if the teacher with the given teacherId exists
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        // Create a new request with the provided content and isApproved set to false by default
        const newRequest = new Request({
            content: content,
        });

        // Save the request to the database
        await newRequest.save();

        // Associate the request with the teacher and save the teacher
        teacher.requests.push(newRequest);
        await teacher.save();

        return res.status(201).json({ message: 'Request added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to add request' });
    }
};
const fetchName = async (req, res) => {
    try {

        const { teacherId } = req.body;
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return res.status(200).json({ name: teacher.name });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch teacher name' });
    }
};

// fetchRequests: Fetch all requests for a teacher
const fetchRequests = async (req, res) => {
    try {
        const { teacherId } = req.body;

        // Find the teacher by ID and populate the 'requests' array with actual request documents
        const teacher = await Teacher.findById(teacherId).populate('requests');
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        // The 'requests' array is now populated with request documents
        const requests = teacher.requests;
        console.log(requests);
        return res.status(200).json({ requestis: requests });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch requests' });
    }
};


module.exports = {
    Signup,
    Login,
    addRequest,
    fetchName,
    fetchRequests
};
