import api from "../utils/api.utils"


export const getUserProtectedResource = () => api.get("/protected/user")
export const getEmployeeProtectedResource = () => api.get("/protected/employee")
export const getAdminProtectedResource = () => api.get("/protected/admin")
