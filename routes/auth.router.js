const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const { models } = require('../libs/sequelize');
const { removePassword } = require('../services/servicesUsers');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/demo-login:
 *   post:
 *     summary: Demo login - Get JWT token without credentials
 *     tags: [Auth]
 *     description: |
 *       🚀 **QUICK ACCESS** - No credentials needed!
 *       
 *       Use this endpoint to get a valid JWT token instantly.
 *       Perfect for testing protected routes.
 *       
 *       **How to use:**
 *       1. Click "Execute" below
 *       2. Copy the returned token
 *       3. Click "Authorize" button at the top of this page
 *       4. Paste token as: Bearer <your_token>
 *     responses:
 *       200:
 *         description: Returns JWT token for demo user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       404:
 *         description: Demo user not found
 */
router.post('/demo-login', async (req, res, next) => {
    try {
        const demoUser = await models.User.findOne({ where: { email: 'demo@test.com' } });
        if (!demoUser) {
            return res.status(404).json({ message: 'Demo user not found. Please run database seeds.' });
        }
        const user = removePassword(demoUser);
        const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful - returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized - invalid credentials
 */
router.post('/login', 
    passport.authenticate('local', { session: false }), 
    async (req, res, next) => {
        try {
            const token = jwt.sign({ sub: req.user.id, role: req.user.role }, config.jwtSecret, { expiresIn: '20m' });
            res.json({ token });
        } catch (error) {
            next(error);
        }
    });

module.exports = router;