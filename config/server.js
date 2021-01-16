// Enables the express web framework
const express = require("express");
// Gzip file format compression for faster network transfer.
const compression = require("compression");
const path = require("path");

module.exports = (app) => {
    // So we can use static (local) css/js/image files.
    app.use(express.static('public'));
    // Pulling data from html body.
    app.use(express.urlencoded({extended: true}));
    // Compresses files to improve speed server side.
    app.use(compression());

    console.log("--------------------------------------");
    console.log(`[   SERVER]: Express is ready!`);
}