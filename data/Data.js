import pg from 'pg';
const { Pool } = pg;
import { Parser } from 'hot-formula-parser';
import lodash from 'lodash';
const { filter } = lodash;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: 'localhost',
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

await ((async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS orders (
        id INT GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL
    )`);

    const tableCount = await pool.query('SELECT COUNT(*) FROM orders');

    if (Number(tableCount.rows[0].count) === 0) {
        await pool.query(`INSERT INTO orders (name, price, quantity)
            VALUES
                ('Pizza', 10.99, 2),
                ('Burger', 5.99, 1),
                ('Coke', 1.99, 1),
                ('Fries', 2.99, 4),
                ('Salad', 7.99, 1)`);
    }
})());

const parser = new Parser();

export const getOrders = async () => {
    return (await pool.query('SELECT * FROM orders')).rows;
}

export const getOrderById = async (id) => {
    const result = (await pool.query(`SELECT * FROM orders WHERE id = ${id}`));
    
    if (result.rowCount > 0) {
        return result.rows[0];
    } else {
        return null;
    }
}

export const getOrderSummary = async () => {
    const orders = await getOrders();
    const total = parser.parse(`SUM(${orders.map(order => order.price * order.quantity).join(',')})`);
    const orderThreshold = Number(process.env.ORDER_THRESHOLD);

    return {
        total: parseFloat(total.result.toFixed(2)),
        count: orders.length,
        orderThreshold: orderThreshold,
        ordersOverThreshold: filter(orders, order => order.price * order.quantity > orderThreshold).length
    };
}