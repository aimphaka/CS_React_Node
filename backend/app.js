const express = require("express");
const fs = require("fs");
const cors = require("cors");
// var indexRouter = require("./routes/index.js");

var app = express();
app.use(express.json());
app.use(cors());
// app.use("/", indexRouter);

const readDatabase = () => {
    const rawData = fs.readFileSync("./db.json");
    return JSON.parse(rawData);
};

const writeDatabase = (data) => {
    fs.writeFileSync("./db.json", data);
};

app.get("/queues", (req, res) => {
    const db = readDatabase();
    return res.json({ status: 200, queues: db.queues }).status(200);
});

app.post("/queues", (req, res) => {
    const data = req.body;
    if (data.id && data.name) {
        const db = readDatabase();
        db.queues.push({ ...data });
        writeDatabase(JSON.stringify(db));
        return res.status(200).json(db.queues);
    }
    return res.status(400).send("Data need id and name.");
});

app.put("/queues/:id", (req, res) => {
    const db = readDatabase();
    const queues = db.queues;
    const q = queues.find((e) => e.id == req.params.id);
    const data = req.body;
    if (q && data.name) {
        q.name = data.name;
        writeDatabase(JSON.stringify(db));
        return res.json(q).status(200);
    }
    return res.status(400).send("bad request");
});

app.get("/queues/:id", (req, res) => {
    const db = readDatabase();
    const queues = db.queues;
    const q = queues.find((e) => e.id == req.params.id);
    if (q) {
        return res.json(q).status(200);
    }
    return res.status(400).send("bad request");
});

app.delete("/queues/:id", (req, res) => {
    const db = readDatabase();
    const queues = db.queues;
    const index = queues.findIndex((e) => e.id == req.params.id);
    if (index >= 0) {
        queues.splice(index, 1);
        writeDatabase(JSON.stringify(db));
        return res.send().status(200);
    }
    return res.status(400).send("bad request");
});

app.get("/counters", (req, res) => {
    const db = readDatabase();
    return res.json({ status: 200, counters: db.counters }).status(200);
});

module.exports = app;
