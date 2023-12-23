export const PORT = process.env.PORT || 3001;
export const API_URL = process.env.API_URL || "/api";
export default{ 
  jwt_secret: process.env.JWT_SECRET || "peterpiperpickedapeckofpickledpeppers",
  jwt_ttl: "7d",
}