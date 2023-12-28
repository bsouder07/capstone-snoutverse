import { verifyJwt } from "../utils/auth.utils";

export function requireAuth(requiredRole = 3) {
  return (req, res, next) => {
    // Parse the token out of the request header
    const auth = req.header("authorization");

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
        console.log(req)
        next();
      })
      .catch((error) => {
        console.log(error)
        res.status(401).json({ error: "Unauthorized" });
      });
  };
}


//user token for testing123@gmail.com
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg4Nzk4NGQzYTlhMTBjNDk0MzhjOTIiLCJlbWFpbCI6InRlc3RpbmcxMjNAZ21haWwuY29tIiwiaWF0IjoxNzAzNDQzMjgwLCJleHAiOjE3MDQwNDgwODB9.-7WLayrgDoM2Y3ujn7wR-YUtPgYKeAzF4xiWsMu4WAA




