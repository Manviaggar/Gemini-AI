import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };
//applying newchat functionality
  const newChat=()=>{
    setLoading(false)
    setShowResult(false);
  }

//   const onSent = async (prompt) => {
//     setResultData(""); //previous result is removed from state variable
//     setLoading(true);
//     setShowResult(true);
//     setRecentPrompt(input);

//     setPrevPrompts((prev) => [...prev, input]);
    
//     const response = await runChat(input);
//     let responseArray = response.split("**");
//     let newResponse = "";
//     for (let i = 0; i < responseArray.length; i++) {
//       if (i === 0 || i % 2 !== 1) {
//         newResponse += responseArray[i];
//       } else {
//         newResponse += "<b>" + responseArray[i] + "</b>";
//       }
//     }
//     let newResponse2 = newResponse.split("*").join("</br>");
//     let newResponseArray = newResponse2.split(" ");
//     for (let i = 0; i < newResponseArray.length; i++) {
//       const nextWord = newResponseArray[i];
//       delayPara(i, nextWord + " ");
//     }
//     setResultData(newResponse2);
//     setLoading(false);
//     setInput("");
//   };
const onSent = async (prompt) => {
    setResultData(""); // Clear previous result
    setLoading(true);
    setShowResult(true);
    let response;

    if(prompt!==undefined){
        response=await runChat(prompt);
        setRecentPrompt(prompt)
    }else{
        setPrevPrompts(prev=>[...prev,input])
        setRecentPrompt(input);
        response=await runChat(input)
    }
    // setRecentPrompt(input);
    // setPrevPrompts((prev) => [...prev, input]);
  
    // const response = await runChat(input);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
  
    // Split newResponse2 into an array of words
    let wordsArray = newResponse2.split(" ");
    
    // Calculate the midpoint
    // let halfLength = Math.floor(wordsArray.length / 2);
    
    // // Extract the first half of the words
    // let firstHalfWords = wordsArray.slice(0, halfLength);
    
    // Join the first half back into a string
    let firstHalf = wordsArray.join(" ");
  
    setResultData(firstHalf);
    setLoading(false);
    setInput("");
  }
  

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
