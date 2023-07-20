import axios from "axios";

//Custom enviroment variable that sets the stage of the app
// const isProduction = process.env.REACT_APP_STAGE === "prod";

//Conditional endpoints in different enviroments 'prod' or 'dev'
const endpoints = {
  checkSudoku: false ? "" : "http://localhost:5000",
};

const api = {
  post: {
    checkSudoku: async ({ sudoku }) => {
      try {
        const response = await axios.post(endpoints.checkSudoku, {
          sudoku,
        });
        return response
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default api;
