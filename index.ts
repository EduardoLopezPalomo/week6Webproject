import express, { Request, Response } from 'express';
import { IVehicle, ICar, IBoat, IPlane} from "./types";

const app = express();
const port = 3000;
app.use(express.json());

type Vehicle = IBoat | ICar | IPlane ; 

let vehicleList: Vehicle[] = [];

app.get("/", (req: Request, res: Response) => {
	res.send("Test express Typescript");
});

app.get('/hello', (req: Request, res: Response) => {
  res.send("Hello world");
});


app.post('/vehicle/add', (req: Request, res: Response) => {
  const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;

  if (model && color && year && power) {
    const vehicle: Vehicle = req.body;
    vehicleList.push(vehicle);
    res.status(201).send("Vehicle added")
  } else {
    res.status(400).json({ message: 'Missing or invalid vehicle data' });
  }
});

app.get('/vehicle/search/:model', (req: Request, res: Response) => {
    const  model  = req.params.model;
    const foundVehicle = vehicleList.find((vehicle) => vehicle.model === model);

    if (foundVehicle) {
        res.status(200).json(foundVehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});