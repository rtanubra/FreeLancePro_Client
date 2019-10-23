export default {
  API_ENDPOINT: process.env.NODE_ENV==="development"?process.env.REACT_APP_BASE_URL_DEV:process.env.REACT_APP_BASE_URL,
  API_KEY: process.env.REACT_APP_API_KEY,
}