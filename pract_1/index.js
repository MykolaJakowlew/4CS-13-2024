// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import { ORDERS, USERS } from './db.js';

const app = express();
app.use(bodyParser.json());

/**
 * http://localhost:8080
 */
app.listen(8080, () => {
 console.log(`Server was started`);
});


/**
 * POST http://localhost:8080/users
 * 
 * req - input data
 * res - output data
 */
app.post('/users', (req, res) => {
 const { body } = req;
 console.log(`body`, body);
 const isUserExists = USERS.find(el => el.login === body.login);

 if (isUserExists) {
  return res.status(400).send({
   message: `User with login ${body.login} already exists`
  });
 }

 USERS.push(body);

 return res.status(200).send({ message: 'User was created' });
});

/**
 * GET http://localhost:8080/users
 */
app.get('/users', (req, res) => {
 return res.status(200).send(USERS.data);
});

app.post('/login', (req, res) => {
 const { body } = req;

 const user = USERS.find(el => el.login === body.login && el.password === body.password);

 if (!user) {
  return res.status(400).send({ message: "User not found" });
 }

 const token = crypto.randomUUID();

 USERS.save(user.login, { token });

 return res.status(200).send({
  token,
  message: "User was successfully logged in"
 });
});

app.post('/orders', (req, res) => {
 const { body, headers } = req;

 const token = headers.authorization;

 if (!token) {
  return res.status(401).send();
 }

 const user = USERS.find(el => el.token === token);
 if (!user) {
  return res.status(400).send({
   message: "user was not found"
  });
 }

 const order = { ...body, login: user.login };

 ORDERS.push(order);

 res.status(200).send(order);
});

app.get('/orders', (req, res) => {
 const { headers } = req;

 const token = headers.authorization;

 if (!token) {
  return res.status(401).send();
 }

 const user = USERS.find(el => el.token === token);
 if (!user) {
  return res.status(400).send({
   message: "user was not found"
  });
 }

 const history = ORDERS.filter(el => el.login === user.login);

 return res.status(200).send(history);
});