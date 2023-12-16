import React, { useEffect, useState } from 'react'
import { Button, Dialog, Drawer } from "@mui/material";
import { makeStyles } from '@mui/styles';
import AddBoxIcon from "@mui/icons-material/AddBox";

import './bookmark.scss'
import { useWindowDimensions } from '../../../core/custom-hooks/getWindowDimensions';
import { useLoadingContext } from "../../../core/contexts/loading/loading";
import { toast } from 'react-toastify';
import { apiCaller } from '../../../core/custom-hooks/useApi';
import { bookmark_apiCalls } from '../../../core/services/agent';
import { Folder } from '@mui/icons-material';

const useStyles = makeStyles(() => {
    return {
        root: {
            transition: ".3s",
            "& .MuiPaper-root": {
                maxWidth: "800px",
                margin: "0 auto",
                padding: "1rem",
                overflowY: "hidden !important",
                minHeight: (props) => props.minHeight,
                maxHeight: (props) => props.minHeight,
                "*": {
                    transition: ".3s",
                },
                transition: ".3s !important",
            },
        },
    };
});

const BookMarkDrower = ({
    isDrawer,
    toggleDrawer,
    question
}) => {


    const { handleOpen: handleOpenLoading, handleClose: handleCloseLoading } =
        useLoadingContext();
    const { width } = useWindowDimensions()
    const styles = useStyles();
    const [bookmarks, setBookmarks] = useState();
    ///// add folder states
    const [showModal, setShoModal] = useState(false);
    const [inputTitle, setInputTitle] = useState('')
    ///// add question to folder states
    const [selectedFolder, setSelectedFolder] = useState(false);

    ///// handle Add Question To Folder
    const handleSetSelectedFolder = (folder) => {
        setSelectedFolder(folder)
    }
    const handleClearSelectedFolder = () => {
        setSelectedFolder(null)
    }
    const handleAddQuestionToFolder = async () => {
        const argumentsValue = {
            Title: question.title,
            BookmarkId: selectedFolder.id,
            QuestionId: question.id,
            QuestionType: question.questionType
        }
        apiCaller({
            api: bookmark_apiCalls.apiCall_addquestion,
            apiArguments: argumentsValue,
            onSuccess: res => {
                if (res.status === 200 && res.data.status == 1) {
                    setSelectedFolder(null)
                }
            },
            toastMessage: true,
            onSuccessMessage: 'سوال مورد نظر شما با موفقیت به لیست بوک مارک اضافه شد',
            onStart: handleOpenLoading,
            onEnd: handleCloseLoading,
        })
    }


    ////
    const getAllBookmarks = async () => {
        apiCaller({
            api: bookmark_apiCalls.apiCall_getbookmarks,
            onSuccess: res => {
                if (res.status === 200 && res.data.status == 1) {
                    setBookmarks(res.data.data);
                }
            },
            onErrorMessage: ' دریافت لیست بوکمارک ها با خطا مواجه شد ',
            toastMessage: true,
        })
    }

    useEffect(getAllBookmarks, []);

    const handelShowModal = () => {
        setShoModal(!showModal)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        apiCaller({
            api: bookmark_apiCalls.apiCall_createbookmark,
            apiArguments: inputTitle,
            onSuccess: res => {
                if (res.status === 200 && res.data.status == 1) {
                    getAllBookmarks();
                    setInputTitle('');
                    setShoModal(false);
                }
            },
            toastMessage: true,
            onSuccessMessage: 'پوشه با موفقیت اضافه شد',
            onStart: handleOpenLoading,
            onEnd: handleCloseLoading,
        })
    }
    /////////////////

    /////////////////
    return (
        <>
            <Drawer
                classes={styles}
                anchor={"bottom"}
                open={isDrawer}
                onOpen={toggleDrawer}
                onClose={toggleDrawer}
            >
                <h6 className='mx-2'>لطفا پوشه موردنظر خود را انتخاب نمایید</h6>
                <ul
                    className='w-100 list-unstyled p-0 m-0 tiny-scrollbar d-flex flex-row justify-content-start align-items-center'
                    style={{
                        overflowX: 'auto'
                    }}>
                    {bookmarks?.length > 0 && bookmarks.map(item => {
                        return (
                            <li
                                onClick={() => {
                                    handleSetSelectedFolder(item)
                                }}
                                className='bookmark-folder d-flex flex-column justify-content-center align-items-center'
                                style={{
                                    width: `calc(${width > 800 ? '800px' : '100vw'} / 4)`,
                                    height: `calc(${width > 800 ? '800px' : '100vw'} / 4)`,
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                    aspectRatio: '1/1',
                                    cursor: 'pointer'
                                }}
                                key={item.id}>
                                <Folder color='primary' sx={{
                                    fontSize:'3rem'
                                }} />
                                <span className='mt-2'>{item.name}</span>
                            </li>
                        )
                    })}
                    <Button
                        onClick={handelShowModal}
                    >
                        <AddBoxIcon
                            style={{ fontSize: "45px" }}
                            color="primary"
                            fontSize="large"
                        />
                    </Button>
                </ul>
            </Drawer>
            {/* Add Folder Dialog */}
            <Dialog open={showModal} onClose={handelShowModal}>
                <form
                    onSubmit={handleSubmit}
                    className="m-0 p-3 w-100 d-flex flex-column justify-content-start align-items-stretch"
                >
                    <label className="mb-2">عنوان پوشه</label>
                    <input
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        type='text'
                        placeholder='عنوان را وارد نمایید'
                        className="m-0 py-2 px-3 border rounded"
                    />
                    <Button
                        className="mt-3"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        ثبت
                    </Button>
                </form>
            </Dialog>
            {/* Add Question To Folder Dialog */}
            <Dialog open={selectedFolder ? true : false} onClose={handleClearSelectedFolder}>
                <div
                    className="m-0 p-4 w-100 d-flex flex-column justify-content-start align-items-stretch"
                >
                    <h6>برای اضافه کردن سوال در این پوشه مطمئن هستید؟</h6>
                    <div className='d-flex justify-content-center'>
                        <Button
                            className="mt-3"
                            variant="contained"
                            color="success"
                            onClick={handleAddQuestionToFolder}
                        >
                            بله اضافه شود
                        </Button>
                        <Button
                            className="mt-3 mx-2"
                            variant="contained"
                            color='error'
                            onClick={handleClearSelectedFolder}
                        >
                            خیر
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default BookMarkDrower