import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Parser } from 'hot-formula-parser';
import lodash from 'lodash';
const { filter } = lodash;


// you would have to import / invoke this in another file
const db = await ((async () => {
    const db = await open({
        filename: ':memory:',
        driver: sqlite3.Database
    })

    await db.exec(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL
    )`);

    await db.exec(`INSERT INTO orders (name, price, quantity)
        VALUES
            ('Pizza', 10.99, 2),
            ('Burger', 5.99, 1),
            ('Coke', 1.99, 1),
            ('Fries', 2.99, 4),
            ('Salad', 7.99, 1)`);

    return db;
})());

const parser = new Parser();

export const getOrders = async () => {
    return await db.all('SELECT * FROM orders');
}

export const getOrderById = async (id) => {
    return await db.get(`SELECT * FROM orders WHERE id = ${id}`);
}

export const getOrderSummary = async () => {
    const orders = await getOrders();
    const total = parser.parse(`SUM(${orders.map(order => order.price * order.quantity).join(',')})`);

    return {
        total: parseFloat(total.result.toFixed(2)),
        count: orders.length,
        orderThreshold: process.env.ORDER_THRESHOLD,
        ordersOverThreshold: filter(orders, order => order.price * order.quantity > process.env.ORDER_THRESHOLD).length
    };
}