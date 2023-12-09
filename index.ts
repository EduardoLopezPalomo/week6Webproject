import express, { Request, Response } from 'express';
import {Greeting, IVehicle, ICar, IBoat, IPlane} from "./types";

class GreetingMessage implements Greeting {
  constructor(public message: string) {}
}

class Vehicle implements IVehicle{
    constructor(
        public model: string,
        public color: string,
        public year: number,
        public power: number
    ){}
}
class Car implements ICar{
    constructor(
        public model: string,
        public color: string,
        public year: number,
        public power: number,
        public bodyType: string,
        public wheelCount: number
    ){}
}
class Boat implements IBoat{
    constructor(
        public model: string,
        public color: string,
        public year: number,
        public power: number,
        public draft: number
    ){}
}
class Plane implements IPlane{
    constructor(
        public model: string,
        public color: string,
        public year: number,
        public power: number,
        public wingspan: number
    ){}
}

const app = express();
const port = 3000;
app.use(express.json());

app.get('/hello', (req: Request, res: Response) => {

  const greeting: Greeting = new GreetingMessage('Hello world');
  res.send({message: 'Hello world'});
});

let vehicleList: (Car | Boat | Plane | Vehicle)[] = [];

app.post('/vehicle/add', (req: Request, res: Response) => {
  const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;

  if (model && color && year && power) {
    if (bodyType !== undefined && wheelCount !== undefined) {

      const newCar: Car = { model, color, year, power, bodyType, wheelCount };
      vehicleList.push(newCar);
      res.status(201).json({ message: 'Car added' });
    } else if (draft !== undefined) {

      const newBoat: Boat = { model, color, year, power, draft };
      vehicleList.push(newBoat);
      res.status(201).json({ message: 'Boat added' });
    } else if (wingspan !== undefined) {

      const newPlane: Plane = { model, color, year, power, wingspan };
      vehicleList.push(newPlane);
      res.status(201).json({ message: 'Plane added' });
    } else {

      const newVehicle : Vehicle = {model, color, year, power};
      vehicleList.push(newVehicle);
      res.status(201).json({message:'Vehicle added'});
    }
  } else {
    res.status(400).json({ message: 'Missing or invalid vehicle data' });
  }
});

app.get('/vehicle/search/:model', (req: Request, res: Response) => {
    const { model } = req.params;
    const foundVehicle = vehicleList.find((vehicle) => vehicle.model === model);

    if (foundVehicle) {
        if(foundVehicle instanceof Car){
            let responseVehicle: Car = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
                bodyType: foundVehicle.bodyType,
                wheelCount: foundVehicle.wheelCount
            };
            res.status(200).json(responseVehicle);
        } else if(foundVehicle instanceof Boat){
            let responseVehicle: Boat = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
                draft: foundVehicle.draft,
            };
            res.status(200).json(responseVehicle);
        } else if(foundVehicle instanceof Plane){
            let responseVehicle: Plane = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
                wingspan: foundVehicle.wingspan,
            };
            res.status(200).json(responseVehicle);
        } else if(foundVehicle instanceof Vehicle){
            let responseVehicle: Vehicle = {
                model: foundVehicle.model,
                color: foundVehicle.color,
                year: foundVehicle.year,
                power: foundVehicle.power,
            };
            res.status(200).json(responseVehicle);
        }
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
