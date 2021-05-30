import React, { createContext, useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';
import axios from 'axios';
export const ApiContext = createContext()

const ApiContextProvider = (props) => {

    const token = props.cookies.get('current-token')
    // Youtubeの講座のメモ、setSelectedVideoを参考に！
    const [selectedQuiz, setSelectedQuiz] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [quizTitle, setQuizTitle] = useState("")
    const [quizUrl, setQuizUrl] = useState("")
    const [quizMemo, setQuizMemo] = useState("")
    const [isSolved, setIsSolved] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const getUnsolvedQuizzes = async() => {
            try {
                const resquiz = await axios.get('http://localhost:8000/api/unsolved/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                setQuizzes(resquiz.data)
            }
            catch {
                console.log('error')
            }
        }

        const getSolvedQuizzes = async() => {
            try {
                const resquiz = await axios.get('http://localhost:8000/api/solved/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                setQuizzes(resquiz.data)
            }
            catch {
                console.log('error')
            }
        }

        isSolved ? getSolvedQuizzes() : getUnsolvedQuizzes()

    }   , [token, isSolved, quizzes])

    const createQuiz = async() => {
        const createData = new FormData();
        // 空欄のデータを保存！(空欄のデータを作り、そこに内容を加えて保存していくイメージ)
        // つまり、updateしながら内容を記入していく！
        
        createData.append('quizTitle', quizTitle)
        createData.append('quizUrl', quizUrl)
        createData.append('quizMemo', quizMemo)

        try{
            const res = await axios.post('http://localhost:8000/api/unsolved/', createData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            
            setQuizzes([...quizzes, res.data])
        }
        catch {
            console.log('error')
        }
    }

    const updateUnsolvedQuiz = async() => {
        const updateData = new FormData()
        // ここのtitle, url, memoといったStateは、Tableのところで書く！
        // setTitle(event.target.value) みたいなやつ！
        updateData.append('quizTitle', quizTitle)
        updateData.append('quizUrl', quizUrl)
        updateData.append('quizMemo', quizMemo)
        try {
            const res = await axios.patch(`http://localhost:8000/api/unsolved/${selectedQuiz.id}/`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setQuizzes(
                quizzes.map((quiz) => (quiz.id === selectedQuiz.id ? res.data : quiz))
            );
            setQuizTitle('')
            setQuizUrl('')
            setQuizMemo('')
            setSelectedQuiz([])          
        }
        catch(error) {
            const displayErrorMessage = error.response.request.responseText;
    
            setIsError(true)
            setErrorMessage(displayErrorMessage)
        }
    }

    const updateSolvedQuiz = async() => {
        const updateData = new FormData()
        // ここのtitle, url, memoといったStateは、Tableのところで書く！
        // setTitle(event.target.value) みたいなやつ！
        updateData.append('quizTitle', quizTitle)
        updateData.append('quizUrl', quizUrl)
        updateData.append('quizMemo', quizMemo)
        try {
            const res = await axios.patch(`http://localhost:8000/api/solved/${selectedQuiz.id}/`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setQuizzes(
                quizzes.map((quiz) => (quiz.id === selectedQuiz.id ? res.data : quiz))
            );
            setQuizTitle('')
            setQuizUrl('')
            setQuizMemo('')
            setSelectedQuiz([])
        }
        catch(error) {
            const displayErrorMessage = error.response.request.responseText;
    
            setIsError(true)
            setErrorMessage(displayErrorMessage)
        }
    }

    const switchUnsolvedToSolved = async(selectedQuiz) => {
        const updateData = new FormData()
        updateData.append('is_solved', true)
    
        try {
            const res = await axios.patch(`http://localhost:8000/api/unsolved/${selectedQuiz.id}/`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setQuizzes(
                quizzes.map((quiz) => (quiz.id === selectedQuiz.id ? res.data : quiz))
            );

            setSelectedQuiz([])
        }
        catch {
            console.log('error')
        }
    }

    const switchSolvedToUnsolved = async(selectedQuiz) => {
        const updateData = new FormData()
        updateData.append('is_solved', false)
    
        try {
            const res = await axios.patch(`http://localhost:8000/api/solved/${selectedQuiz.id}/`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setQuizzes(
                quizzes.map((quiz) => (quiz.id === selectedQuiz.id ? res.data : quiz))
            );

            setSelectedQuiz([])
        }
        catch {
            console.log('error')
        }
    }

    const deleteQuiz = async(selectedQuiz) => {
        try {
            isSolved ?
    
                await axios.delete(`http://localhost:8000/api/solved/${selectedQuiz.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                })
            :
                await axios.delete(`http://localhost:8000/api/unsolved/${selectedQuiz.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                })
            setQuizzes(quizzes.filter(quiz => quiz.id !== selectedQuiz.id))
            setSelectedQuiz([])  
        }
        catch {
            console.log('error')
        }
    }

    const getRandomUnsolvedQuiz = async() => {
        try {
            const resquiz = await axios.get('http://localhost:8000/api/unsolved/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })

            var index = 0
            var quiz_window;

            // solved のデータを格納したres のデータを１つずつ取り出し、そのindexを１つずつ配列indiceに追加！
            if (resquiz.data){
                index = Math.floor(Math.random() * resquiz.data.length)
                // ランダムに選んできたindexに対応するquiz_urlのリンク先を新しいタブで開く
                quiz_window = window.open(resquiz.data[index].quizUrl, 'random_quiz')
            }else{
                console.log('error1')
            }      
        }
        catch {
            console.log('error')
        }
    }

    const getRandomSolvedQuiz = async() => {
        try {
            const resquiz = await axios.get('http://localhost:8000/api/solved/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })

            var index = 0
            var quiz_window;

            // solved のデータを格納したres のデータを１つずつ取り出し、そのindexを１つずつ配列indiceに追加！
            if (resquiz.data){
                index = Math.floor(Math.random() * resquiz.data.length)
                // ランダムに選んできたindexに対応するquiz_urlのリンク先を新しいタブで開く
                quiz_window = window.open(resquiz.data[index].quizUrl, 'random_quiz')
            }else{
                console.log('error1')
            }      
        }
        catch {
            console.log('error')
        }
    }

    return (
        <ApiContext.Provider
            value={{
                selectedQuiz,
                isSolved,
                isError,
                errorMessage,
                quizzes,
                quizTitle,
                quizUrl,
                quizMemo,
                setSelectedQuiz,
                setIsSolved,
                setIsError,
                setErrorMessage,
                setQuizzes,
                setQuizTitle,
                setQuizUrl,
                setQuizMemo,
                createQuiz,
                updateSolvedQuiz,
                updateUnsolvedQuiz,
                switchUnsolvedToSolved,
                switchSolvedToUnsolved,
                deleteQuiz,
                getRandomUnsolvedQuiz,
                getRandomSolvedQuiz,
            }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}

export default withCookies(ApiContextProvider)
