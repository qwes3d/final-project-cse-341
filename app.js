const express = require ('express');
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const cors = require ('cors');
const passport = require ('passport');
const session = require ('express-session');
const YAML = require ('yamljs');
const swaggerUI = require ('swagger-ui-express');


const authRoutes = require ('./routes/auth.js');
const clubRoutes = require ('./routes/clubs.js');
const userRoutes = require ('./routes/users.js');
const postRoutes = require ('./routes/posts.js');
const errorHandler = require ('./middleware/errorHandler.js');


dotenv.config();


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// Passport + session (for OAuth flow)
app.use(session({ secret: process.env.SESSION_SECRET || 'devsecret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// mount routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/posts', postRoutes);


// Swagger
const swaggerDocument =  require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// health
app.get('/', (req, res) => res.json({ success: true, message: 'CampusConnect API running' }));


// Error handler (last middleware)
app.use(errorHandler);


const PORT = process.env.PORT || 3000;


async function start() {
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusconnect';
try {
await mongoose.connect(uri, { dbName: 'campusconnect' });
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
console.error('Failed to connect to MongoDB', err);
process.exit(1);
}
}

