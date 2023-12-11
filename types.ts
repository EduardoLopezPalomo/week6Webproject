export interface IVehicle {
    model: string;
    color: string;
    year: number;
    power: number;
}
export interface ICar extends IVehicle {
    bodyType: string;
    wheelCount: number;
}
export interface IBoat extends IVehicle {
    draft: number;
}
export interface IPlane extends IVehicle {
    wingspan: number;
}