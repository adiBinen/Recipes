const userService = require('../services/user.service');

const BASE = '/api';

module.exports = (app) => {
    app.get(`${BASE}/user/:userId`, async (req, res) => {
        const {userId} = req.params;
        const user = await userService.getById(userId);
        if (user) res.json(user);
        else res.status(404).end();
    });

    app.post(`${BASE}/signup`, async (req, res) => {
        const newUser = req.body;
        try {
            const user = await userService.signup(newUser)
            req.session.user = user;
            res.json(user);
        } catch (err) {
            if (err === 409) return res.status(409).end();
            else if (err === 401) return res.status(401).end();
        }
    });

    app.post(`${BASE}/login`, async (req, res) => {
        const credentials = req.body;
        let user = await userService.login(credentials)
        if (!user) return res.status(401).end();
        req.session.user = user;
        res.json(user)
    });

    app.post(`${BASE}/logout`, (req, res) => {
        delete req.session.user;
        res.status(200).end();
    });
}