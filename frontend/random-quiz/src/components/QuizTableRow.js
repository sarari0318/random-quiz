import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import { ApiContext } from '../context/ApiContext';

const QuizTableRow = ({ quiz }) => {
    const {
        quizTitle, quizMemo, quizUrl, isSolved,
        setSelectedQuiz, setQuizTitle, setQuizMemo, setQuizUrl,
        updateSolvedQuiz, updateUnsolvedQuiz, deleteQuiz, 
        switchUnsolvedToSolved, switchSolvedToUnsolved,
    } = useContext(ApiContext);

    const [isEditable, setEditable] = useState(false)
    const handleStartEdit = () => {
        setEditable(true)
        setSelectedQuiz(quiz)
        setQuizTitle(quiz.quizTitle)
        setQuizMemo(quiz.quizMemo)
        setQuizUrl(quiz.quizUrl)
    }
    const handleFinishEdit = () => {
        setEditable(false)
        // ApiContext.js のやつ！
        isSolved ?
        updateSolvedQuiz():
        updateUnsolvedQuiz()
    }
    const handleDelete = () => {
        setSelectedQuiz(quiz)
        deleteQuiz(quiz)
    }
    const handleChangeIsSolved = () => {
        setSelectedQuiz(quiz)
        isSolved ?
        switchSolvedToUnsolved(quiz)
        :
        switchUnsolvedToSolved(quiz)
    }

    return (
        <div>
            
            <TableRow>

                <TableCell style={{minWidth: 100, maxWidth: 100}} align="left">
                    { isEditable ?
                        <Button onClick={() => handleFinishEdit()}> <Check /></Button>
                    :
                        <Button onClick={() => handleStartEdit()}> <EditIcon /> </Button>
                    }
                    <Button onClick={() => handleDelete()}> <Delete /> </Button>
                </TableCell>
                

                { isEditable ? 
                    // もし、isEditable===Trueであれば、
                    (
                    <TableCell style={{minWidth: 200, maxWidth: 200}} align="left">
                        <TextField
                            type='text'
                            value={quizTitle}
                            onChange={(event) => {
                                setQuizTitle(event.target.value);
                            }}
                        />
                    </TableCell>
                    ) : (
                    <TableCell style={{minWidth: 200, maxWidth: 200}} align="left">
                        { quiz.quizTitle }
                    </TableCell>
                    )
                }
                { isEditable ? 
                    (
                    <TableCell style={{minWidth: 450, maxWidth: 450}} align="left">
                        <TextField
                            type='text'
                            value={quizMemo}
                            onChange={(event) => {
                                setQuizMemo(event.target.value)
                            }}
                        />
                    </TableCell>
                    ) : (
                    <TableCell style={{minWidth: 450, maxWidth: 450}} align="left">
                        { quiz.quizMemo }
                    </TableCell>
                    )
                }
                { isEditable ? 
                    (
                    <TableCell style={{minWidth: 250, maxWidth: 250}} align="left">
                        <TextField
                        type='url'
                        value={quizUrl}
                        onChange={(event) => {
                            setQuizUrl(event.target.value)
                        }}
                        />
                    </TableCell>
                    ) : (
                    <TableCell style={{minWidth: 250, maxWidth: 250}} align="left">
                        { quiz.quizUrl }
                    </TableCell>
                    )
                }

                <TableCell style={{minWidth: 100, maxWidth: 100}} align='left'>
                    { isSolved ?
                        <Button style={{color: 'orange', fontWeight: 'bold'}} onClick={handleChangeIsSolved}>Not Sure</Button>
                        :
                        <Button style={{color: "orange", fontWeight: 'bold'}} onClick={handleChangeIsSolved}>Perfect!!</Button>
                    }
                </TableCell>  

            </TableRow>

        </div>
    )
}

export default QuizTableRow


