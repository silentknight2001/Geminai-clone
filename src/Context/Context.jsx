import { createContext, useState } from "react";
import runChat from "../Config/Geminai";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPtompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {   //typing effect added
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const newChat =()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt)
            setRecentPtompt(prompt)
        } else {
            setPrevPrompt(prev => [...prev, input])
            setRecentPtompt(input)
                response = await runChat(input)
        }

        let responseArray = response.split("**");
        let newRespons = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newRespons += responseArray[i];
            }
            else {
                newRespons += "<b>" + responseArray[i] + "</b>"
            }
        }

        let newRespons2 = newRespons.split("*").join("</br>");
        let newResponsArray = newRespons2.split(" ");
        for (let i = 0; i < newResponsArray.length; i++) {
            const nextWord = newResponsArray[i]
            delayPara(i, nextWord + " ")
        }
        setLoading(false);
        setInput("");
    }





    // const onSent = async (prompt) => {
    //     setResultData("");
    //     setLoading(true);
    //     setShowResult(true);

    //     let response;

    //     try {
    //         if (prompt !== undefined) {
    //             response = await runChat(prompt);
    //             setRecentPtompt(prompt);
    //         } else {
    //             setPrevPrompt((prev) => [...prev, input]);
    //             response = await runChat(input); // Assuming you handle `input` properly
    //             setRecentPtompt(input);
    //         }

    //         if (!response) {
    //             console.error("Response is undefined");
    //             setLoading(false);
    //             return;
    //         }

    //         let responseArray = response.split("**");
    //         let newRespons = "";
    //         for (let i = 0; i < responseArray.length; i++) {
    //             if (i === 0 || i % 2 !== 1) {
    //                 newRespons += responseArray[i];
    //             } else {
    //                 newRespons += "<b>" + responseArray[i] + "</b>";
    //             }
    //         }

    //         let newRespons2 = newRespons.split("*").join("</br>");
    //         let newResponsArray = newRespons2.split(" ");

    //         for (let i = 0; i < newResponsArray.length; i++) {
    //             const nextWord = newResponsArray[i];
    //             delayPara(i, nextWord + " ");
    //         }
    //     } catch (error) {
    //         console.error("Error in onSent:", error);
    //     } finally {
    //         setLoading(false);
    //         setInput("");
    //     }
    // };


    const contextValue = {
        onSent,
        prevPrompt,
        setPrevPrompt,
        recentPrompt,
        setRecentPtompt,
        showResult,
        loading,
        input,
        setInput,
        resultData,
        setResultData,
        newChat
    }

    return (
        <Context.Provider value={contextValue} >
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider