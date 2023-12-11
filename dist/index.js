"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
let vehicleList = [];
app.get("/", (req, res) => {
    res.send("Test express Typescript");
});
app.get('/hello', (req, res) => {
    res.send("Hello world");
});
app.post('/vehicle/add', (req, res) => {
    const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;
    if (model && color && year && power) {
        const vehicle = req.body;
        vehicleList.push(vehicle);
        res.status(201).send("Vehicle added");
    }
    else {
        res.status(400).json({ message: 'Missing or invalid vehicle data' });
    }
});
app.get('/vehicle/search/:model', (req, res) => {
    const model = req.params.model;
    const foundVehicle = vehicleList.find((vehicle) => vehicle.model === model);
    if (foundVehicle) {
        res.status(200).json(foundVehicle);
    }
    else {
        res.status(404).json({ message: 'Vehicle not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
