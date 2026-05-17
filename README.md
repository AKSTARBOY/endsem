# 🚀 AI Todo App

A modern, student-friendly todo app with AI integration, authentication, and a beautiful UI. Ready to connect with your Express backend!

## ✨ Features

- 🔐 **Authentication** - Login & Sign Up (mock API, ready for Express backend)
- ✅ **Todo Management** - Create, edit, complete, delete, and prioritize tasks
- 🤖 **AI Integration** - Smart suggestions and task improvements
- 📊 **Progress Tracking** - Visual progress bar and statistics
- 🎨 **Beautiful UI** - Built with Tailwind CSS
- 📱 **Responsive Design** - Works on all devices
- 🔌 **Backend Ready** - Easy to integrate with Express

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Your app will run at `http://localhost:5173`

### 3. Test Credentials
- Email: `test@email.com`
- Password: `test1234`

## 📁 Project Structure

```
src/
├── api/
│   └── mockApi.js         # Mock API (replace with real API calls later)
├── contexts/
│   ├── AuthContext.jsx    # Authentication state
│   └── TodoContext.jsx    # Todo and AI state
├── pages/
│   ├── LoginPage.jsx      # Login/Sign up page
│   └── TodoPage.jsx       # Main todo page
├── components/
│   ├── TodoForm.jsx       # Add todo input
│   ├── TodoList.jsx       # Display todos
│   └── AIAssistant.jsx    # AI suggestions
├── App.jsx                # Main app component
└── main.jsx               # Entry point
```

## 🔧 How It Works (For Students)

### Authentication
- `AuthContext.jsx` stores user login info
- `mockApi.js` has login/register functions (uses localStorage)
- When user logs in, they can access the todo app

### Todos
- `TodoContext.jsx` manages all todo state
- `useTodo()` hook lets components access todos
- CRUD operations: Create, Read, Update, Delete

### AI Features
- AI suggestions based on your tasks
- Task improvement tips
- Smart priority recommendations

## 🔌 Connecting to Express Backend

When you're ready to connect to Express:

### 1. Update `src/api/mockApi.js`

Replace mock functions with real API calls using axios:

```javascript
import axios from 'axios'

export const authAPI = {
  login: async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    })
    return response.data
  },
  // ... other methods
}
```

### 2. Update API Base URL

Add to your `.env` file:
```
VITE_API_URL=http://localhost:5000
```

### 3. Expected Express Endpoints

Your Express backend should have these routes:

```
POST   /api/auth/login       - Login user
POST   /api/auth/register    - Register user
GET    /api/auth/user        - Get current user
POST   /api/todos            - Create todo
GET    /api/todos            - Get all todos
PUT    /api/todos/:id        - Update todo
DELETE /api/todos/:id        - Delete todo
POST   /api/ai/suggestions   - Get AI suggestions
POST   /api/ai/improve-title - Improve task title
```

## 📚 Learning Concepts

This app teaches you:

- **React Hooks**: useState, useEffect, useContext
- **Context API**: State management without Redux
- **Component Composition**: Breaking UI into components
- **Custom Hooks**: useAuth(), useTodo()
- **Async/Await**: Handling API calls
- **localStorage**: Persisting data
- **Tailwind CSS**: Modern styling

## 🎨 UI Components

- **Gradient Background** - Modern color schemes
- **Input Fields** - With focus states
- **Buttons** - With hover and disabled states
- **Cards** - Clean information display
- **Progress Bar** - Visual feedback
- **Responsive Grid** - Mobile-friendly layout

## 🔐 Security Note

This is a learning project. For production:
- Use proper JWT tokens (not Base64)
- Hash passwords (bcrypt on backend)
- Add HTTPS
- Validate on backend
- Add CORS properly

## 📝 Tips for Students

1. **Understand the flow**: Login → TodoPage → TodoContext provides data
2. **Try changing things**: Modify colors in Tailwind classes
3. **Add more features**: Task categories, due dates, etc.
4. **Read the comments**: Code explains how things work
5. **Use browser DevTools**: Check console for errors

## 🚀 Next Steps

1. ✅ Get this running locally
2. Build an Express backend
3. Replace mock API with real API
4. Add JWT authentication
5. Add a database (MongoDB, PostgreSQL)
6. Deploy to production!

## 💡 Questions?

Read the code comments - they explain everything for beginners!

---

**Happy Coding!** 🎉
# endsem
