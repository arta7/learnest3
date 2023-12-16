import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';

import { useLoadingContext } from "../../core/contexts/loading/loading";
import { apiCaller } from '../../core/custom-hooks/useApi';
import { bookmark_apiCalls } from '../../core/services/agent';

import './styles/folderQuestions.scss'

const FolderQuestions = () => {
    const { bid } = useParams();
    const { handleOpen: handleOpenLoading, handleClose: handleCloseLoading } =
        useLoadingContext();

    ///State Set Data For Questions
    const [questionsData, setQuestionsData] = useState()
    const [selectedDeleteQuestion, setSelectedDeleteQuestion] = useState(false);

    ///Handle Delete Question Drawer
    const handleSetSelectedDeleteQuestion = (question) => {
        setSelectedDeleteQuestion(question)
    }
    const handleClearSelectedDeleteQuestion = () => {
        setSelectedDeleteQuestion(false)
    }

    const getQuestionsForFolder = async () => {
        apiCaller({
            api: bookmark_apiCalls.apiCall_getqauestions,
            apiArguments: bid,
            onSuccess: res => {
                if (res.status === 200 && res.data.status == 1) {
                    console.log('List question',res)
                    setQuestionsData(res.data.data);


                }
            },
            onErrorMessage: ' دریافت لیست سوالات با خطا مواجه شد ',
            toastMessage: true,
            onStart: handleOpenLoading,
            onEnd: handleCloseLoading,
        })
    }

    useEffect(getQuestionsForFolder, [bid]);

    const deleteHandlerQuestion = () => {
        apiCaller({
            api: bookmark_apiCalls.apiCall_deletequestion,
            apiArguments: selectedDeleteQuestion.questionId,
            onSuccess: res => {
                console.log('res',res)
                if (res.status === 200 && res.data.status == 1) {
                    getQuestionsForFolder();
                    setSelectedDeleteQuestion(false)
                }
                else
                {
                    setSelectedDeleteQuestion(false)
                }
            },
            toastMessage: true,
            onErrorMessage: ' حذف  سوال با خطا مواجه شد ',
            onSuccessMessage: 'سوال مورد نظر با موفقیت حذف شد',
            onStart: handleOpenLoading,
            onEnd: handleCloseLoading,
        })
    }
   
    if (questionsData?.length == 0) {
        return (
            <div className='container'>
                <h3 className='text-center mt-4'>سوالی برای این پوشه ذخیره نشده است</h3>
            </div>
        )
    }
    return (
        <div className='container'>
            <div className='row mt-4'>
                {questionsData?.length > 0 && questionsData.map(item => {
                    return (
                        <div className='folder-question-item d-flex align-items-center justify-content-between'><h6>{item.title}</h6> <Button
                            variant="contained"
                            color="error"
                            className='px-1'
                            style={{ minWidth: '35px' }}
                            title='حذف'
                            onClick={() => {
                                handleSetSelectedDeleteQuestion(item)
                            }}><DeleteOutlineOutlined /></Button></div>
                    )
                })}
            </div>
            <Dialog open={selectedDeleteQuestion ? true : false} onClose={handleClearSelectedDeleteQuestion}>
                <div
                    className="m-0 p-4 w-100 d-flex flex-column justify-content-start align-items-stretch"
                >
                    <h6>برای حذف سوال مورد نظر مطمئن هستید</h6>
                    <div className='d-flex justify-content-center'>
                        <Button
                            className="mt-3"
                            variant="contained"
                            color="success"
                            onClick={deleteHandlerQuestion}
                        >
                            بله حذف شود
                        </Button>
                        <Button
                            className="mt-3 mx-2"
                            variant="contained"
                            color='error'
                            onClick={handleClearSelectedDeleteQuestion}
                        >
                            خیر
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default FolderQuestions