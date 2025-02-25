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
git clone https://github.com/Tayyab3344/MeatSolutions.git
cd MeatSolutions
```

### Backend Setup
1. Install dependencies:
   ```sh
   cd ms-backend-server-master
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
   cd ms-frontend-client
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

## Screenshots

![MERN Working 10](https://github.com/user-attachments/assets/9b0d5d09-e142-4616-8715-06f1bb82cbdd)
![MERN Working 9](https://github.com/user-attachments/assets/35b82d0e-e613-41cc-b032-05fd29da0602)
![MERN Working 8](https://github.com/user-attachments/assets/0d532541-d1ed-4383-a896-65410c2d891d)
![MERN Working 7](https://github.com/user-attachments/assets/368ebde7-68c9-42e8-9f52-a545e4bf02d1)
![MERN Working 6](https://github.com/user-attachments/assets/bf669da7-4df9-4432-9631-6de106411e11)
![MERN Working 5](https://github.com/user-attachments/assets/e8fd6281-d546-46aa-ab4c-781eec14fae3)
![MERN Working 4](https://github.com/user-attachments/assets/00126c93-d3e9-4e8f-aa3d-9da9fbc37476)
![MERN Working 3](https://github.com/user-attachments/assets/f3c0467d-d277-49bb-ad5d-35a3ceb56a61)
![MERN Working 2](https://github.com/user-attachments/assets/32e0fcc2-22ae-43b6-9cac-f1d33c2b72c4)
![MERN Working 1](https://github.com/user-attachments/assets/9d15662c-db19-485c-8225-7244f954f5e5)
![MERN Working 11](https://github.com/user-attachments/assets/6b325e0e-f7ba-4e78-aa76-23e1e97442e6)
