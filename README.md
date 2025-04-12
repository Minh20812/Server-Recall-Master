# RecallMaster - Spaced Repetition Learning Platform

RecallMaster is an interactive learning platform that helps users master concepts through spaced repetition technique. Create, manage and review questions efficiently with smart scheduling based on difficulty levels.

## 🌐 Live Demo

- Frontend: [RecallMaster App](https://recallmaster.vercel.app)
- Backend API: [RecallMaster Server](https://server-recall-master.onrender.com)

## 📸 Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Question Management

![Questions](./screenshots/questions.png)

### Review System

![Review](./screenshots/review.png)

## ✨ Features

- **Smart Review System**: Spaced repetition based on question difficulty
- **Multiple Question Types**: Support for multiple choice, true/false, and essay questions
- **Topic Organization**: Group questions by topics for better organization
- **Progress Tracking**: Monitor your learning progress over time
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- React + Vite
- Redux Toolkit for state management
- Tailwind CSS + Shadcn/ui for styling
- RTK Query for API integration

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- RESTful API

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/RecallMaster.git
cd RecallMaster
```

2. Install dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables

```bash
# In backend directory, create .env file
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# In frontend directory, create .env file
VITE_API_URL=http://localhost:5001/api
```

4. Run the application

```bash
# Run backend (from backend directory)
npm start

# Run frontend (from frontend directory)
npm run dev
```

## 📖 API Documentation

Base URL: `https://server-recall-master.onrender.com/api`

### Main Endpoints

- `/api/auth` - Authentication routes
- `/api/questions` - Question management
- `/api/topics` - Topic management
- `/api/users` - User management

For detailed API documentation, please visit [API Docs](your-api-docs-link)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Render](https://render.com/) for hosting the backend
- [Vercel](https://vercel.app/) for hosting the frontend
