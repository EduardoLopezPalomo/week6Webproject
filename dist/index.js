"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class GreetingMessage {
    constructor(message) {
        this.message = message;
    }
}
class Vehicle {
    constructor(model, color, year, power) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
    }
}
class Car {
    constructor(model, color, year, power, bodyType, wheelCount) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
        this.bodyType = bodyType;
        this.wheelCount = wheelCount;
    }
}
class Boat {
    constructor(model, color, year, power, draft) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
        this.draft = draft;
    }
}
class Plane {
    constructor(model, color, year, power, wingspan) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
        this.wingspan = wingspan;
    }
}
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/hello', (req, res) => {
    const greeting = new GreetingMessage('Hello world');
    res.send({ message: 'Hello world' });
});
let vehicleList = [];
app.post('/vehicle/add', (req, res) => {
    const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;
    if (model && color && year && power) {
        if (bodyType !== undefined && wheelCount !== undefined) {
            const newCar = { model, color, year, power, bodyType, wheelCount };
            vehicleList.push(newCar);
            res.status(201).json({ message: 'Car added' });
        }
        else if (draft !== undefined) {
            const newBoat = { model, color, year, power, draft };
            vehicleList.push(newBoat);
            res.status(201).json({ message: 'Boat added' });
        }
        else if (wingspan !== undefined) {
            const newPlane = { model, color, year, power, wingspan };
            vehicleList.push(newPlane);
            res.status(201).json({ message: 'Plane added' });
        }
        else {
            const newVehicle = { model, color, year, power };
            vehicleList.push(newVehicle);
            res.status(201).json({ message: 'Vehicle added' });
        }
    }
    else {
        res.status(400).json({ message: 'Missing or invalid vehicle data' });
    }
});
app.get('/vehicle/search/:model', (req, res) => {
    const { model } = req.params;
    const foundVehicle = vehicleList.find((vehicle) => vehicle.model === model);
    if (foundVehicle) {
        console.log(foundVehicle);
        if (foundVehicle instanceof Car) {
            let responseVehicle = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
                bodyType: foundVehicle.bodyType,
                wheelCount: foundVehicle.wheelCount
            };
            res.status(200).json(responseVehicle);
        }
        else if (foundVehicle instanceof Boat) {
            let responseVehicle = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
                draft: foundVehicle.draft,
            };
            res.status(200).json(responseVehicle);
        }
        else if (foundVehicle instanceof Plane) {
            let responseVehicle = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
                wingspan: foundVehicle.wingspan,
            };
            res.status(200).json(responseVehicle);
        }
        else if (foundVehicle instanceof Vehicle) {
            let responseVehicle = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
            };
            res.status(200).json(responseVehicle);
        }
    }
    else {
        res.status(404).json({ message: 'Vehicle not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
