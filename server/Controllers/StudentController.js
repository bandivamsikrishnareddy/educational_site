const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student, Achievement } = require('../Models/Student');
const dotenv = require('dotenv');
dotenv.config();

const Signup = async (req, res) => {
  const { name, email, password, school } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(409).json({ error: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      school
    });

    await newStudent.save();

    return res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error in saving student', message: error });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the student exists
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JSON Web Token (JWT)
    const token = jwt.sign({ userId: student._id, role: 'student' }, process.env.JWT_SECRET_KEY);

    return res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Error in student login', message: error });
  }
};

const fetchname = async (req, res) => {
  const { userId } = req.body;
  try {
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    return res.json({ success: true, name: student.name });
  } catch (error) {
    return res.status(500).json({ error: 'Error in fetching student name', message: error });
  }
};

const addachievement = async (req, res) => {
  const { userId, name, date } = req.body;
  try {
    const newachievement = await Achievement.create({ name, date });
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }

    student.achievements.push(newachievement);
    await student.save(); // Save the updated student with the new achievement
    res.json({ success: true, message: 'Achievement added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, message: 'Failed to add achievement' });
  }
};

const fetchachievements = async (req, res) => {
  try {
    const { userId } = req.body;
    const student = await Student.findById(userId).populate('achievements');
    const achievements = student.achievements;
    res.json({ success: true, achievements });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, message: 'Failed to fetch achievements' });
  }
};

const removeachievement = async (req, res) => {
  const { userId, date } = req.body;
  console.log('-----------', userId, '--we023---', typeof(date));
  try {

    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }



    const removedAchievement = await Achievement.findOneAndRemove({ date: date });

    await student.save();
    
    if (removedAchievement) {
      return res.json({ success: true, message: 'Achievement removed successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, message: 'Failed to remove achievement' });
  }
};

module.exports = {
  Signup,
  Login,
  fetchname,
  addachievement,
  fetchachievements,
  removeachievement,
};
