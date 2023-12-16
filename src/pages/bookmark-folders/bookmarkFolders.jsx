import React, { useState, useEffect } from 'react';
import { Button, Dialog } from '@mui/material';
import { DeleteOutlineOutlined, Folder } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useLoadingContext } from "../../core/contexts/loading/loading";
import { apiCaller } from '../../core/custom-hooks/useApi';
import { bookmark_apiCalls } from '../../core/services/agent';

import './styles/bookmarkFolder.scss'

const BookMarkFolders = () => {

    const { handleOpen: handleOpenLoading, handleClose: handleCloseLoading } =
        useLoadingContext();

    const [bookMarkFolders, setBookMarkFolders] = useState();
    const [selectedDeleteFolder, setSelectedDeleteFolder] = useState(false);

    const handleSetSelectedDeleteFolder = (folder) => {
        setSelectedDeleteFolder(folder)
    }

    const handleClearSelectedDeleteFolder = () => {
        setSelectedDeleteFolder(null)
    }

    const getAllBookmarks = async () => {
        apiCaller({
            api: bookmark_apiCalls.apiCall_getbookmarks,
            onSuccess: res => {
                if (res.status === 200 && res.data.status == 1) {
                    setBookMarkFolders(res.data.data);
                }
            },
            onErrorMessage: ' دریافت لیست بوکمارک ها با خطا مواجه شد ',
            toastMessage: true,
            onStart: handleOpenLoading,
            onEnd: handleCloseLoading,
        })
    }

    useEffect(getAllBookmarks, []);

    const deleteHandlerBookmark = () => {
        apiCaller({
            api: bookmark_apiCalls.apiCall_deletebookmark,
            apiArguments: selectedDeleteFolder.id,
            onSuccess: res => {
                if (res.status === 200 && res.data.status == 1) {
                    getAllBookmarks();
                    setSelectedDeleteFolder(null)
                }
            },
            toastMessage: true,
            onSuccessMessage: 'پوشه مورد نظر با موفقیت حذف شد',
            onStart: handleOpenLoading,
            onEnd: handleCloseLoading,
        })
    }

    if (bookMarkFolders?.length == 0) {
        return <div className='container'>
            <h3 className='text-center mt-4'>شما هیچ پوشه ای ندارید</h3>
        </div>
    }

    return (
        <div className='container text-center'>
            <div className='row mt-4'>
                {bookMarkFolders?.length > 0 && bookMarkFolders.map(item => {
                    return (
                        <div className='col-sm-6' key={item.id}>
                            <div className='bookmark-item'>
                                <Folder color='primary' sx={{
                                    fontSize: '2.8rem'
                                }} />
                                <Link className='nav-link text-dark' to={`/folder-questions/${item.id}`}><h4>{item.name}</h4></Link>
                                <Button
                                    variant="contained"
                                    color="error"
                                    className='px-1'
                                    style={{ minWidth: '35px' }}
                                    onClick={() => {
                                        handleSetSelectedDeleteFolder(item)
                                    }}
                                    title='حذف'
                                >
                                    <DeleteOutlineOutlined />
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Dialog open={selectedDeleteFolder ? true : false} onClose={handleClearSelectedDeleteFolder}>
                <div
                    className="m-0 p-4 w-100 d-flex flex-column justify-content-start align-items-stretch"
                >
                    <h6>برای حذف پوشه مورد نظر مطمئن هستید</h6>
                    <div className='d-flex justify-content-center'>
                        <Button
                            className="mt-3"
                            variant="contained"
                            color="success"
                            onClick={deleteHandlerBookmark}
                        >
                            بله حذف شود
                        </Button>
                        <Button
                            className="mt-3 mx-2"
                            variant="contained"
                            color='error'
                            onClick={handleClearSelectedDeleteFolder}
                        >
                            خیر
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default BookMarkFolders;