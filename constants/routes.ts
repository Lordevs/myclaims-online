export const ROUTES = {
  HOME: "/",
  CLAIM_TYPES: {
    CAR_ACCIDENT: "/claim-types/car-accident-claims",
    TAXI: "/claim-types/taxi-claims",
    MOTORBIKE: "/claim-types/motorbike-claims",
    CYCLE_ESCOOTER: "/claim-types/cycle-escooter-claims",
    ELECTRIC_VEHICLE: "/claim-types/electric-vehicle-claims",
  },
  START_MY_CLAIM: "/start-my-claim",
  ABOUT: "/about",
  CONTACT: "/contact",
  LEGAL: {
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_OF_SERVICE: "/terms-of-service",
    COOKIE_POLICY: "/cookie-policy",
    COMPLAINTS: "/complaints",
  },
} as const;