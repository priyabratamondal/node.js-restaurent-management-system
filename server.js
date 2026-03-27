const express = require("express");
const path = require("path");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/catgeoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Food API Server</title>
      <style>
        body { font-family: Arial; margin: 40px; background: #f0f0f0; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
        h1 { color: #333; }
        .status { background: #4CAF50; color: white; padding: 10px; border-radius: 4px; margin-bottom: 20px; }
        .section { margin-top: 30px; }
        .endpoint { background: #f5f5f5; padding: 8px; margin: 5px 0; border-left: 4px solid #667eea; font-family: monospace; }
        .method { display: inline-block; background: #667eea; color: white; padding: 2px 6px; border-radius: 3px; margin-right: 8px; font-weight: bold; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
        th { background: #667eea; color: white; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✓ Restaurant Food API Server</h1>
        <div class="status">Server is running and connected to MongoDB</div>
        
        <div class="section">
          <h2>Base URL</h2>
          <p><code>http://localhost:8080/api/v1</code></p>
        </div>

        <div class="section" style="background: #e8f5e9; padding: 15px; border-radius: 4px; border-left: 4px solid #4CAF50;">
          <h3>📝 UPDATE (PUT) Operations Available In:</h3>
          <ul>
            <li><b>Users</b> - PUT /user/updateUser</li>
            <li><b>Categories</b> - PUT /category/update/:id</li>
            <li><b>Food Items</b> - PUT /food/update/:id</li>
          </ul>
          <p style="font-size: 12px; color: #666;"><em>Restaurants do not have an update (PUT) endpoint</em></p>
        </div>

        <div class="section">
          <h2>Authentication (Public)</h2>
          <table>
            <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
            <tr><td>POST</td><td>/auth/register</td><td>Register new user</td></tr>
            <tr><td>POST</td><td>/auth/login</td><td>Login user, get token</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Test (Public)</h2>
          <table>
            <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
            <tr><td>GET</td><td>/test/test-user</td><td>Test endpoint to verify server</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Users (Protected - need token)</h2>
          <table>
            <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
            <tr><td>GET</td><td>/user/getUser</td><td>Get user info</td></tr>
            <tr><td>PUT</td><td>/user/updateUser</td><td>Update user profile</td></tr>
            <tr><td>POST</td><td>/user/updatePassword</td><td>Update password</td></tr>
            <tr><td>POST</td><td>/user/resetPassword</td><td>Reset password</td></tr>
            <tr><td>DELETE</td><td>/user/deleteUser/:id</td><td>Delete account</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Restaurants</h2>
          <table>
            <tr><th>Method</th><th>Endpoint</th><th>Protected</th><th>Description</th></tr>
            <tr><td>GET</td><td>/resturant/getAll</td><td>No</td><td>Get all restaurants</td></tr>
            <tr><td>GET</td><td>/resturant/get/:id</td><td>No</td><td>Get restaurant by ID</td></tr>
            <tr><td>POST</td><td>/resturant/create</td><td>Yes</td><td>Create restaurant</td></tr>
            <tr><td>DELETE</td><td>/resturant/delete/:id</td><td>Yes</td><td>Delete restaurant</td></tr>
          </table>
          <p style="color: #666; font-size: 12px; margin-top: 10px;"><em>Note: PUT endpoint for update is not implemented for restaurants</em></p>
        </div>

        <div class="section">
          <h2>Categories</h2>
          <table>
            <tr><th>Method</th><th>Endpoint</th><th>Protected</th><th>Description</th></tr>
            <tr><td>GET</td><td>/category/getAll</td><td>No</td><td>Get all categories</td></tr>
            <tr><td>POST</td><td>/category/create</td><td>Yes</td><td>Create category</td></tr>
            <tr><td>PUT</td><td>/category/update/:id</td><td>Yes</td><td>Update category</td></tr>
            <tr><td>DELETE</td><td>/category/delete/:id</td><td>Yes</td><td>Delete category</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>Food Items</h2>
          <table>
            <tr><th>Method</th><th>Endpoint</th><th>Protected</th><th>Description</th></tr>
            <tr><td>GET</td><td>/food/getAll</td><td>No</td><td>Get all foods</td></tr>
            <tr><td>GET</td><td>/food/get/:id</td><td>No</td><td>Get food by ID</td></tr>
            <tr><td>GET</td><td>/food/getByResturant/:id</td><td>No</td><td>Get foods by restaurant</td></tr>
            <tr><td>POST</td><td>/food/create</td><td>Yes</td><td>Create food item</td></tr>
            <tr><td>PUT</td><td>/food/update/:id</td><td>Yes</td><td>Update food item</td></tr>
            <tr><td>DELETE</td><td>/food/delete/:id</td><td>Yes</td><td>Delete food item</td></tr>
            <tr><td>POST</td><td>/food/placeorder</td><td>Yes</td><td>Place order</td></tr>
            <tr><td>POST</td><td>/food/orderStatus/:id</td><td>Yes (Admin)</td><td>Update order status</td></tr>
          </table>
        </div>

        <div class="section">
          <h2>How to Use</h2>
          <p>For <b>protected routes</b>, add this header:</p>
          <code>Authorization: Bearer YOUR_JWT_TOKEN</code>
          <p>Get your token from <code>/api/v1/auth/login</code></p>
        </div>

        <div class="section" style="background: #ffe0e0; padding: 15px; border-radius: 4px;">
          <h3>Test Endpoint</h3>
          <p>Try this first (no token needed):</p>
          <code style="background: #fff; display: block; padding: 10px; margin: 10px 0;">GET http://localhost:8080/api/v1/test/test-user</code>
        </div>
      </div>
    </body>
    </html>
  `;
  return res.status(200).send(html);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
