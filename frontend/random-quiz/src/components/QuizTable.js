import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import QuizTableRow from './QuizTableRow';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useAlert } from 'react-alert';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const QuizTable = () => {
    const classes = useStyles();
    const alert = useAlert();

    const { quizzes, isSolved, isError, errorMessage, setIsError, createQuiz, getRandomUnsolvedQuiz, getRandomSolvedQuiz} = useContext(ApiContext);
    const tableTitle = isSolved  ? "Achived Tasks" : "Challenge Tasks"
    const listOfQuizzes = quizzes.map((quiz) => (
        <QuizTableRow key={quiz.id} quiz={quiz} />
    ));

    const columns = [
        { id: 'actions', label: 'Actions', minWidth: 100, maxWidth: 100},
        { id: 'quizTitle', label: 'Title', minWidth: 200, maxWidth: 200},
        { id: 'quizMemo', label: 'Memo', minWidth: 450, maxWidth: 450},
        { id: 'quizUrl', label: 'URL', minWidth: 250, maxWidth: 250},
    ]

    const handleDisplayErrorMessage = () => {
        alert.error(errorMessage)
        setIsError(false)
    }

    return (
        <div>
            { isSolved ?
                <Button style={{color: 'orange', fontWeight: 'bold'}} onClick={getRandomSolvedQuiz}>Push!!</Button>
                    :
                <Button style={{color: 'orange', fontWeight: 'bold'}} onClick={getRandomUnsolvedQuiz}>Push!!</Button>
            }   
            <TableContainer component={Paper}> 
                    <Table  title={tableTitle} aria-label='simple table'>
                        { isError &&
                        handleDisplayErrorMessage()
                        }
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                        align="left"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {listOfQuizzes}
                        </TableBody>
                    </Table>
            </TableContainer>
            { !isSolved &&
                <button className='add' onClick={createQuiz}>

                          {/* ここのボタンの装飾の設定(色など)は、App.cssでできる！
                          udemy.com/course/sns-react-hooks-django-restframework-api-web/learn/lecture/20030122?start=1015#notes */}
                    <Add />
                </button>
            }
        </div>
    )
}

export default QuizTable
