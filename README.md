# FreeFlow Finance

FreeFlow Finance is a smart financial tracking system tailored for **freelancers & small businesses**. It helps users manage **income, expenses, tax estimations, and financial insights** all in one place.

## 🚀 Features

### 🌟 Core Functionalities

- **📊 Real-Time Dashboard** – Get a clear snapshot of your finances with interactive charts.
- **🧾 Automatic Tax Estimation** – Monthly tax calculations based on earnings, helping you stay tax-compliant.
- **🏷 Categorized Transactions** – Log and classify expenses (subscriptions, office supplies, software, etc.).
- **📄 Exportable Reports** – Download financial summaries as PDFs for easy tax filing.
- **🔒 Secure Authentication** – JWT-based authentication to keep your data safe.
- **📆 Smart Budgeting Tools** – Set income goals, track expenses, and plan ahead.
- **🔍 Advanced Filters** – Filter transactions by type (Credit/Debit), category, and date range.

## 🛠️ Tech Stack

- **Frontend:** Angular (TypeScript, RxJS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **UI Charts:** Chart.js for interactive financial visualization
- **Styling:** CSS & TailwindCSS

## 📂 Project Structure

```
FreeFlow-Finance/
│-- frontend/                # Angular frontend
│   ├── src/
│   │   ├── app/           # Angular components & services
│   ├── angular.json       # Angular configuration
│   ├── package.json       # Dependencies
│
│-- server/               # Node.js backend
│   ├── models/            # MongoDB Schemas
│   ├── routes/            # Express API routes
│   ├── middleware/        # JWT auth & security
│   ├── server.js          # Main entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies
│
│-- README.md              # Documentation
│-- .gitignore             # Ignore unnecessary files
```

## 🏗️ Setup & Installation

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/nivas1907/freeflow-finance.git
cd freeflow-finance
```

### **2️⃣ Backend Setup**

```sh
cd backend
npm install      # Install dependencies
npm start        # Run the server on http://localhost:5000
```

Create a **.env** file in the backend folder with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **3️⃣ Frontend Setup**

```sh
cd frontend
npm install      # Install dependencies
npm start        # Run Angular app on http://localhost:4200
```

## 📌 Usage Guide

- **Sign Up / Login** to access the dashboard.
- **Add Transactions** with categories & types (Credit/Debit).
- **Filter & Export Reports** for tax filing.
- **Track Monthly/Quarterly Taxes** automatically.

## 📜 API Endpoints (Backend)

| Method | Endpoint                      | Description                        |
| ------ | ----------------------------- | ---------------------------------- |
| POST   | `/api/users/register`         | Register new users                 |
| POST   | `/api/users/login`            | Authenticate users                 |
| GET    | `/api/users/me`               | Get logged-in user details         |
| POST   | `/api/transaction/add`        | Add a transaction                  |
| GET    | `/api/transaction/view`       | View all transactions              |
| DELETE | `/api/transaction/delete/:id` | Delete a transaction               |
| GET    | `/api/transaction/taxSummary` | Get tax details for selected month |

## 🤝 Contributing

Pull requests are welcome! Please open an issue first for major changes.

## 📜 License

This project is **MIT Licensed**.

---

**📢 FreeFlow Finance – Helping freelancers take control of their finances!** 🚀

