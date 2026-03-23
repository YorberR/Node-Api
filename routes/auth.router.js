const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
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
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', 
    passport.authenticate('local', { session: false }), 
    async (req, res, next) => {
        try {
            res.send(req.user);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;