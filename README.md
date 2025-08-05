# Library Management System

A full-stack web application for managing library operations including book management, user management, borrowing/returning books, and comprehensive reporting.

## 🚀 Features

### For Administrators
- **Dashboard**: Comprehensive overview with statistics, charts, and quick actions
- **Book Management**: Add, view, and delete books with detailed information
- **User Management**: View all users and add new administrators
- **Borrow Management**: Track all borrowed books and manage returns
- **Catalog Management**: Full control over book availability and returns

### For Users
- **User Dashboard**: Personal statistics and recent activity
- **Book Catalog**: Browse and search available books
- **Borrow Books**: Request books for borrowing
- **My Borrowed Books**: Track borrowed books, due dates, and fines
- **Account Management**: Profile management and password updates

### General Features
- **Authentication**: Secure login/register with email verification
- **Role-based Access**: Different interfaces for admins and users
- **Real-time Notifications**: Toast notifications for all actions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Lucide React** - Icon library
- **React Toastify** - Toast notifications
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email notifications
- **Cloudinary** - File uploads
- **Node-cron** - Scheduled tasks

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd library-management-system
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

### 3. Create Admin User and Sample Data
```bash
cd server
node createAdmin.js
node addSampleBooks.js
```

### 4. Environment Configuration

#### Backend Configuration
Create/update `server/config/config.env`:
```env
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017
SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRE=3d
COOKIE_EXPIRE=3
CLOUDINARY_CLIENT_NAME=your-cloudinary-name
CLOUDINARY_CLIENT_API=your-cloudinary-api-key
CLOUDINARY_CLIENT_SECRET=your-cloudinary-secret
```

### 5. Start MongoDB
```bash
# On Windows
mongod --dbpath C:\data\db

# On macOS/Linux
sudo systemctl start mongod
```

### 6. Run the Application

#### Start Backend Server
```bash
cd server
npm start
```
The server will run on `http://localhost:4000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173`

## 📖 Usage Guide

### Quick Start - Test the System

1. **Access the Application**: Open `http://localhost:5173` in your browser
2. **Test Admin Login**: 
   - Go to `/login`
   - Use credentials: `admin@library.com` / `admin123`
   - You'll have access to all admin features
3. **Test User Registration**: 
   - Go to `/register`
   - Create a new user account
   - Verify email with OTP
   - Access user features

### For Administrators

1. **Login**: Use admin credentials to access the system
2. **Dashboard**: View system statistics and recent activity
3. **Book Management**: 
   - Add new books with title, author, description, price, and quantity
   - View all books in a table format
   - Delete books as needed
4. **User Management**:
   - View all registered users
   - Add new administrators
5. **Catalog**: Manage book returns and availability

### For Users

1. **Registration**: Create a new account with email verification
2. **Login**: Access your personal dashboard
3. **Browse Catalog**: Search and view available books
4. **Borrow Books**: Request books for borrowing
5. **My Borrowed Books**: Track your borrowed books and due dates

### Test Route

Visit `http://localhost:5173/test` to see a comprehensive test page showing:
- Authentication status
- User information
- Role-based features
- Available functionality

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-otp` - Email verification
- `GET /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### Books
- `POST /api/v1/book/admin/add` - Add new book (Admin only)
- `GET /api/v1/book/all` - Get all books
- `DELETE /api/v1/book/delete/:id` - Delete book (Admin only)

### Borrowing
- `POST /api/v1/borrow/record-borrow-book/:id` - Record book borrow (Admin only)
- `GET /api/v1/borrow/borrowed-books-by-users` - Get all borrowed books (Admin only)
- `GET /api/v1/borrow/my-borrowed-books` - Get user's borrowed books
- `PUT /api/v1/borrow/return-borrowed-book/:bookId` - Return book (Admin only)

### Users
- `GET /api/v1/user/all` - Get all users (Admin only)
- `POST /api/v1/user/add/new-admin` - Add new admin (Admin only)

## 🎨 UI Components

### Pages
- **Login/Register**: Authentication pages with form validation
- **Dashboard**: Role-specific dashboards with statistics and charts
- **Book Management**: Admin interface for book operations
- **Catalog**: Book browsing and borrowing interface
- **User Management**: Admin interface for user operations
- **My Borrowed Books**: User's borrowed books tracking

### Features
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Modern dark theme for better UX
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Comprehensive error messages
- **Form Validation**: Client and server-side validation
- **Search Functionality**: Real-time search in catalogs

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Email Verification**: OTP-based email verification
- **Role-based Access**: Different permissions for admins and users
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper CORS setup for security

## 📊 Data Models

### User Model
- Name, email, password
- Role (User/Admin)
- Verification status
- Timestamps

### Book Model
- Title, author, description
- Price, quantity
- Availability status
- Timestamps

### Borrow Model
- User reference
- Book reference
- Borrow date, due date, return date
- Fine calculation
- Notification status

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Set up email service
4. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] Book reservations system
- [ ] Advanced search filters
- [ ] Book reviews and ratings
- [ ] Digital book uploads
- [ ] Mobile app development
- [ ] Advanced reporting
- [ ] Integration with external book APIs
- [ ] Multi-language support

---