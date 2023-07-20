import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import generateSudoku from "./utils/generateSudoku";
import api from "./services/api";

function App() {
  const [count, setCount] = useState(0);
  const [sudoku, setSudoku] = useState([]);
  const [userInput, setUserInput] = useState({});
  const newSudoku = () => {
    let localSudo = generateSudoku();
    let twoDArray = [];
    let splitString = localSudo.split("");

    let temp = [];
    for (let i = 0; i <= 81; i++) {
      if (temp.length < 9) {
        temp.push(splitString[i]);
      } else {
        twoDArray.push(temp);
        temp = [];
        temp.push(splitString[i]);
      }
    }
    setSudoku(twoDArray);
  };
  async function  CheckSudoku() {
    let string = "";
    sudoku.map((row, rowIndex) => {
      row.map((cell, cellIndex) => {
        if (cell == ".") {
          string += userInput?.[rowIndex]?.[cellIndex] || ".";
        } else {
          string += cell;
        }
      });
    });
    console.log(string)
    await api.post.checkSudoku({sudoku:[string]}).then((res)=>{console.log(res.data.data[0].solution===string,res.data.data[0].solution,string)
    
    
    
    
      if(res.data.data[0].solution===string){
        alert("you won")
      }else{
        alert("wrong")
      }
    })
  }
  useEffect(() => {
    newSudoku();
  }, []);
  return (
    <div className=" w-[500px]  h-[500px]">
      {sudoku.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex + "s"}
            className={`grid h-[50px] grid-cols-9 content-center  border-solid border-black ${
              rowIndex % 3 == 2 ? "border-b-2" : "border-0"
            } ${rowIndex == 0 && "border-t-2"}`}
          >
            {row.map((cell, colIndex) => {
              if (cell != ".")
                return (
                  <div
                    key={colIndex}
                    className={`flex items-center justify-center h-[50px] border-solid border-black ${
                      colIndex % 3 == 0 ? "border-l-2" : "border-0"
                    } ${colIndex == 8 && "border-r-2"}`}
                  >
                    <div
                      className={`border border-dashed flex w-full h-full items-center ${
                        rowIndex % 3 == 0 && "border-t-0"
                      } font-bold justify-center`}
                    >
                      {cell}
                    </div>
                  </div>
                );
              else {
                return (
                  <div
                    className={`flex items-center justify-center h-[50px] border-solid border-black ${
                      colIndex % 3 == 0 ? "border-l-2" : "border-0"
                    } ${colIndex == 8 && "border-r-2"}`}
                  >
                    <div
                      className={`border border-dashed flex w-full h-full items-center ${
                        rowIndex % 3 == 0 && "border-t-0"
                      } font-bold justify-center`}
                    >
                      <input
                        value={userInput?.[rowIndex]?.[colIndex] || ""}
                        onChange={(e) => {
                          let newInput = {
                            [rowIndex]: {
                              ...userInput[rowIndex],
                              [colIndex]: e.target.value,
                            },
                          };
                          let temp = { ...userInput, ...newInput };

                          setUserInput(temp);
                        }}
                        type="number"
                        className="text-pink-500 flex text-center border border-solid border-gray-500 h-[45px] w-[90%]"
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
      <div className="mt-5 flex gap-2 items-center justify-center ">
        <button
          className="border border-solid border-black"
          onClick={() => {
            CheckSudoku();
          }}
        >
          Check
        </button>
        <button
          className="border border-solid border-green-500"
          onClick={() => {
            newSudoku();
          }}
        >
          New
        </button>
        <button
          className="border border-solid border-red-500"
          onClick={() => {
            setUserInput({});
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
