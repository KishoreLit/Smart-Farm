# 🌾 SmartFarm - Smart Agricultural Assistant

SmartFarm is a full-stack web application designed to assist farmers and agriculturists with essential tools including:

- ✅ Crop calendar
- ✅ Organic practices
- ✅ Soil health tips
- ✅ Pest detection
- ✅ Community forum
- ✅ Contact form with admin panel
- ✅ Secure login & signup system

---

## 🚀 Features

- 💬 Contact form saving messages to MongoDB
- 🔐 Secure login & signup (with form validation)
- 📥 Admin panel to view submitted contact messages
- 🌱 Frontend: HTML, CSS, JavaScript
- 🛠️ Backend: Node.js, Express.js
- 🗄️ Database: MongoDB Atlas

---

## 📁 Folder Structure

```
Smart-Farm/
├── public/              # All frontend files (HTML, CSS, JS)
├── server.js            # Main server file (Node.js + Express)
├── .env                 # MongoDB URI & secrets (not uploaded)
├── package.json         # Project dependencies
```

---

## 🛠️ How to Run Locally

1. Clone the repo:

```bash
git clone https://github.com/KishoreLit/Smart-Farm.git
cd Smart-Farm
```

2. Install dependencies:

```bash
npm install
```

3. Add your `.env` file:

```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=5000
```

4. Start the server:

```bash
node server.js
```

5. Visit in browser:

```
http://localhost:5000
```

---

## 📬 Contact

Built by **Sai Kishore Adapa**  
📧 Reach me at: [saikishore2806@gmail.com]  
🌐 Project link: [https://github.com/KishoreLit/Smart-Farm](https://github.com/KishoreLit/Smart-Farm)

---

> 💡 Tip: Don’t forget to exclude `node_modules` and `.env` in `.gitignore`.
