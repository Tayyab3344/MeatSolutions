# MeatSolutions

## Overview
MS is a web-based service for finding and buying halal meat. Users can locate nearby butcher shops, purchase animals, pre-book premium meat, rate sellers, pay cash on delivery or online, and opt for home delivery.

## Features
- User authentication using JWT.
- Secure password hashing with bcrypt.
- Real-time order tracking via Socket.io.
- Email notifications using Nodemailer & SendGrid.
- Image uploads for food items using Multer.
- Form validation using Express Validator.
- Database management with Mongoose and MongoDB.

## Technologies Used
### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Socket.io
- Nodemailer
- Multer
- Express Validator

### Frontend
- React.js
- Material-UI
- Redux
- React Router

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository
```sh
git clone https://github.com/your-username/io.foodapp.git
cd io.foodapp
```

### Backend Setup
1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Configure environment variables in `nodemon.json`:
   ```json
   {
     "env": {
       "MONGO_USER": "your_username",
       "MONGO_PASSWORD": "your_password",
       "MONGO_DATABASE": "your_database",
       "SENDGRID_KEY": "your_sendgrid_key"
     }
   }
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage
1. Sign up or log in to your account.
2. Browse available restaurants and food items.
3. Add items to your cart and place an order.
4. Track your order in real-time.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit changes:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## License
This project is licensed under the ISC License.

