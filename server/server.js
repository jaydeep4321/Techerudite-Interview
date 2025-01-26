import 'dotenv/config';
import express from 'express';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

// start the server.
startServer();

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  sequelize
    .close()
    .then(() => {
      console.log('Database connection closed');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error closing the database connection:', err);
      process.exit(1);
    });
});
