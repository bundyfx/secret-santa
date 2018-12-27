const express = require('express');

const routes = () => {
    const homeRouter = express.Router();

    homeRouter.get('/:status', (req, res) => {
        const {
            status
        } = req.params
        res.render('home', {
            status: status
        });
    });

    return homeRouter;
};

module.exports = routes;