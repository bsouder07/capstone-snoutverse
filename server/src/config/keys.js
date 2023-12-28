export default {
    port: process.env.PORT || 3001,
    db_uri:
      process.env.DB_URI ||
      "mongodb+srv://bsoudee007:Redners07!@cluster0.azbrnse.mongodb.net/snoutverse?retryWrites=true&w=majority",
    api_url: process.env.API_URL || "/api",
    jwt_secret: process.env.JWT_SECRET || "peterpiperpickedapeckofpickledpeppers",
    jwt_ttl: "7d",
  };