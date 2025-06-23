# Jubelio Technical Assessment – Frontend

This repository serves as the **frontend project** for a **Fullstack Developer Technical Assessment** at **Jubelio**.

Built using **Vite** and **React**, this project demonstrates frontend development skills, component structuring, and integration readiness with backend services.

## 🛠️ Technologies Used

- Express
- Sequelize
- PostgreSQL
- JavaScript

## 🚀 Prerequisites

- Node v22.15.0

## 🚀 Getting Started

Follow the steps below to run the project locally:

### 1. Clone the Repository

```
https://github.com/amalja0/jubelio-technical-be.git
```

### 2. Create `.env` file
Create a new `.env` file under root project. The file contain can be seen at `.env.example` file.

### 3. Install Dependencies
```
npm install
```

### 4. Migrating Tables
1. Create a PostgreSQL Database with name of `sales_analytics`
2. Run table migration with command below:
    ```
    npx sequelize-cli db:migrate
    ```

### 5. Run ETL Worker
We will use a worker to perform ETL process. This process might take a longer time. Execute below command to start running the worker:
```
npm run etl:run
```
Once the worker is done, you will need to close it manually.

### 6. Running Backend Service
If you want to run the frontend service, please run this repository with command below
```
npm run start
```
