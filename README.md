# Node.js Restaurant Food App

A simple food delivery backend built with Node.js and Express. Users can browse restaurants, order food, and manage their accounts.

## What's included

- User registration and login with JWT
- Restaurant and food management
- Food categories
- Order placement and tracking
- User profile management
- Admin controls for order status

## Tech Stack

- Node.js + Express
- MongoDB Atlas
- JWT for auth
- bcryptjs for password hashing

## What you need

- Node.js installed
- MongoDB Atlas account (free tier is fine)
- npm

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Setup MongoDB

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Go to Clusters → Connect → Drivers → copy your connection string

### Create .env file

Copy `.env.example` and rename it to `.env`, then add your MongoDB connection:

```
MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/food-app
PORT=8080
JWT_SECRET=your_secret_key
```

### Run the server

```bash
npm run server
```

Server starts at `http://localhost:8080`

---

## API Routes

Base URL: `http://localhost:8080/api/v1`

### Auth

**Register**

```
POST /auth/register
{
  "userName": "john",
  "email": "john@gmail.com",
  "password": "pass123",
  "phone": "1234567890",
  "address": "123 Main St",
  "answer": "NYC"
}
```

**Login**

```
POST /auth/login
{
  "email": "john@gmail.com",
  "password": "pass123"
}
Returns: { token, user }
```

### Restaurants

- `GET /resturant/getAll` - List all restaurants
- `GET /resturant/get/:id` - Get single restaurant
- `POST /resturant/create` - Create restaurant (need token)
- `DELETE /resturant/delete/:id` - Delete restaurant (need token)

### Food

- `GET /food/getAll` - All foods
- `GET /food/get/:id` - Single food item
- `GET /food/getByResturant/:id` - Foods from restaurant
- `POST /food/create` - Create food item (need token)
- `PUT /food/update/:id` - Update food (need token)
- `DELETE /food/delete/:id` - Delete food (need token)

### Categories

- `GET /category/getAll` - List categories
- `POST /category/create` - Create category (need token)
- `PUT /category/update/:id` - Update category (need token)
- `DELETE /category/delete/:id` - Delete category (need token)

### Users (Protected routes - need JWT token)

- `GET /user/getUser` - Get your info
- `PUT /user/updateUser` - Update profile
- `POST /user/updatePassword` - Change password
- `DELETE /user/deleteUser/:id` - Delete account

---

## Testing with Postman

1. Download [Postman](https://www.postman.com/)
2. For protected routes, add header: `Authorization: Bearer your_token`
3. Test register → login → use the token for other requests

## Environment Variables

Need a `.env` file with:

```
MONGO_URL=your_mongodb_connection_string
PORT=8080
JWT_SECRET=some_secret_string
```

Don't commit the `.env` file!

## Troubleshooting

**"Cannot connect to database"**

- Check your MONGO_URL in .env
- Make sure your IP is whitelisted in MongoDB Atlas

**"JWT not working"**

- Check JWT_SECRET is set in .env
- Make sure token is in Authorization header

**"Port already in use"**

- Change PORT in .env or kill process on port 8080

## Notes

- Comments removed for cleaner code
- Uses JWT for authentication
- MongoDB Atlas for database
- Make sure to use nodemon for development

## License

ISC
