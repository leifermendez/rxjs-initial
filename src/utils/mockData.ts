import { BehaviorSubject, from, of } from "rxjs";

const car = {
  name: "Model 3",
  description: "Model 3 Gran autonomia con motor dual y traccion integral",
  highlight: [
    {
      amount: 115,
      symbol: "km",
      short: "Autonomia (WLTP)",
    },
    {
      amount: 500,
      symbol: "km",
      short: "Autonomia (WLTP)",
    },
    {
      amount: 899,
      symbol: "km",
      short: "Autonomia (WLTP)",
    },
  ],
  colors: [
    {
      name: "white",
      img: "Paint_White.png",
    },
    {
      name: "gray",
      img: "Paint_White.png",
    },
    {
      name: "blue",
      img: "Paint_Blue.png",
    },
    {
      name: "black",
      img: "Paint_Black.png",
    },
    {
      name: "red",
      img: "Paint_Red.png",
    },
  ],
  features: [
    "Color multicapas blanco perla",
    "Llantas Aero de 18’’",
    "Interior totalmente en negro Premium",
    "Asientos delanteros y traseros calefactados",
    "Capacidad de conducción autónoma total",
    "Prueba de conectividad premium de 30 días",
  ],
};

const carFrom$ = new BehaviorSubject<any>(car);

const state$ = new BehaviorSubject<{ color: string }>({ color: "white" });

export { carFrom$, state$ };
