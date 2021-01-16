// Enables the express web framework
const express = require("express");
// Gzip file format compression for faster network transfer.
const compression = require("compression");
// Creating file location paths.
const path = require("path");

module.exports = (app) => {
    // So we can use static (local) css/js/image files.
    app.use(express.static('public'));
    // Pulling data from html body.
    app.use(express.urlencoded());
    // Compresses files to improve speed server side.
    app.use(compression());

    console.log('Express server is Ready!');
}