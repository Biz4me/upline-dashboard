import { Pool } from 'pg'

export const pool = new Pool({
  host: process.env.DB_HOST || '172.16.4.2',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ZhnKpovqAtFoNZtW',
  user: process.env.DB_USER || 'OeXA5Cqvw7ehK7yY',
  password: process.env.DB_PASSWORD,
  ssl: false,
})
