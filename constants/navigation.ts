import { NavLink } from "@/types"
import { ROUTES } from "./routes"
import {
  Car,
  CarTaxiFront,
  Motorbike,
  Bike,
  TruckElectric
} from "lucide-react"

export const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: ROUTES.HOME },
  {
    label: "CLAIM TYPES",
    subItems: [
      { label: "Car Accident Claims", href: ROUTES.CLAIM_TYPES.CAR_ACCIDENT, icon: Car },
      { label: "Taxi Claims", href: ROUTES.CLAIM_TYPES.TAXI, icon: CarTaxiFront },
      { label: "Motorbike Claims", href: ROUTES.CLAIM_TYPES.MOTORBIKE, icon: Motorbike },
      { label: "Cycle / E-Scooter Claims", href: ROUTES.CLAIM_TYPES.CYCLE_ESCOOTER, icon: Bike },
      { label: "Electric Vehicle Claims", href: ROUTES.CLAIM_TYPES.ELECTRIC_VEHICLE, icon: TruckElectric },
    ]
  },
  { label: "START MY CLAIM", href: ROUTES.START_MY_CLAIM },
  { label: "ABOUT US", href: ROUTES.ABOUT },
  { label: "CONTACT US", href: ROUTES.CONTACT },
]
