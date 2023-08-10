const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const StudentRoutes = require('./Routes/StudentRoutes');
const ModeratorRoutes = require('./Routes/ModeratorRoutes');
const TeacherRoutes = require('./Routes/TeacherRoutes');
dotenv.config(); // Load environment variables from a .env file

mongoose.connect(process.env.MONGO_URL, { // Replace process.env.MONGODB_URI with your MongoDB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((e) => {
        console.log('Database connection error:', e);
    });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', StudentRoutes);
// Define your routes here
app.use('/moderator', ModeratorRoutes);
// Start the server
app.use('/teacher',TeacherRoutes);
const port = process.env.PORT || 3000; // Set the port number, or use 3000 as default
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
