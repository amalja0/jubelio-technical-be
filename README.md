# Analytics and Reporting Supermarket Sales
>This project is specifically created for Jubelio technical assessment

## Prerequisites
- Node v22.15.0
- PostgreSQL

## Getting Started

```
npm install
```

### Migrating Tables
1. Create a PostgreSQL Database with name of `sales_analytics`
2. Create `.env` file; File contains can be seen at `.env.example`
3. Run table migration with command below:
    ```
    npx sequelize-cli db:migrate
    ```
