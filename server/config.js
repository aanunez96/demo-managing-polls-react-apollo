module.exports = {
    db: process.env.MONDODB || "mongodb://mongo/polls",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "oneelephant",
};