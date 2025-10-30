# 🚀 Quick Setup Guide - Vibe Commerce

This guide will help you get the application up and running in minutes!

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js (v14+) installed - Check with `node --version`
- [ ] npm installed - Check with `npm --version`
- [ ] MongoDB installed and running - Check with `mongod --version`

## Step-by-Step Setup

### 1. Install MongoDB (if not already installed)

#### Windows
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will run as a Windows service automatically

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 2. Backend Setup (Terminal 1)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# The .env file is optional - defaults work fine
# If you want custom settings, copy .env.example to .env
cp .env.example .env

# Start the backend server
npm start
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
✅ Products seeded successfully
🚀 Server running on port 5000
📍 API available at http://localhost:5000/api
```

### 3. Frontend Setup (Terminal 2)

Open a **new terminal window/tab**:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# The .env file is optional - defaults work fine
# If you want custom settings, copy .env.example to .env
cp .env.example .env

# Start the React app
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view vibe-commerce-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

The application will automatically open in your browser at `http://localhost:3000`

## Verify Installation

### Test Backend
Open http://localhost:5000/api/health in your browser. You should see:
```json
{
  "success": true,
  "message": "Vibe Commerce API is running",
  "timestamp": "2025-10-28T..."
}
```

### Test Frontend
Your browser should show the Vibe Commerce homepage with 10 products displayed in a grid.

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Error:** `MongoDB Connection Error: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
# Windows:
sc query MongoDB

# macOS/Linux:
sudo systemctl status mongod

# If not running, start it:
# Windows: Start "MongoDB" service from Services app
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue: Port Already in Use
**Error:** `Port 5000 is already in use` or `Port 3000 is already in use`

**Solution:**
- Kill the process using the port or change the port in `.env` files
```bash
# Find and kill process on port 5000 (backend)
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: Module Not Found
**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Error
**Error:** `Access-Control-Allow-Origin` error in browser console

**Solution:**
- Ensure backend is running on port 5000
- Check that `REACT_APP_API_URL` in frontend/.env points to correct backend URL
- Restart both servers after making changes

## Testing the Application

### Quick Test Workflow
1. ✅ **Browse Products** - Should see 10 products on homepage
2. ✅ **Add to Cart** - Click "Add to Cart" on any product
3. ✅ **View Cart** - Click cart icon in header (should show count)
4. ✅ **Update Quantity** - Use +/- buttons in cart
5. ✅ **Remove Item** - Click remove button
6. ✅ **Checkout** - Click "Proceed to Checkout" button
7. ✅ **Complete Order** - Fill in name and email, submit
8. ✅ **View Receipt** - See order confirmation modal

### Sample Test Data
```
Name: John Doe
Email: john.doe@example.com
```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Changes to React components reload automatically
- **Backend**: Use `npm run dev` with nodemon for auto-restart

### Viewing Database
Install MongoDB Compass (GUI) to view your data:
- Download: https://www.mongodb.com/try/download/compass
- Connect to: `mongodb://localhost:27017`
- Database: `vibe-commerce`

### API Testing
Use Postman or Thunder Client to test API endpoints:
- Import the API endpoints from README.md
- Base URL: `http://localhost:5000/api`

## Production Deployment

### Environment Variables to Set
**Backend:**
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Set to "production"

**Frontend:**
- `REACT_APP_API_URL`: Your deployed backend API URL

### Build Commands
```bash
# Frontend production build
cd frontend
npm run build

# Deploy the 'build' folder to your hosting service
```

## Need Help?

If you encounter any issues not covered here:
1. Check the main README.md for detailed documentation
2. Verify all prerequisites are installed correctly
3. Ensure both servers are running simultaneously
4. Check browser console and terminal for error messages

---

**Ready to code!** 🎉 Your development environment is now set up!

