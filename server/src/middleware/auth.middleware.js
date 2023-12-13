import { verifyJwt } from "../utils/auth.utils";

export function requireAuth(requiredRole = 3) {
  return (req, res, next) => {
    // Parse the token out of the request header
    const auth = req.get("authorization");

    if (!auth) {
      return res.status(401).json({ error: "You must be logged in." });
    }

    const accessToken = auth.replace("Bearer ", "");

    verifyJwt(accessToken)
      .then((user) => {
        console.log(user);
        console.log(requiredRole);
        if (user.role > requiredRole) {
          return res
            .status(403)
            .json({ error: "Unauthorized, insufficient role." });
        }

        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(401).json({ error: "Unauthorized" });
      });
  };
}