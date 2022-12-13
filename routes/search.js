const express = require('express');
const router = express.Router();
const {searchView} = require('../controllers/searchController');

router.get('/search', searchView);

module.exports = router;