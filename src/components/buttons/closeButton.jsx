import React, { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import MaterialTheme from "../../core/material-theme/materialTheme";
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


// make mui styles for close button
const useStyles = makeStyles({
    root: {
        width: "35px !important",
        height: "35px",
        borderWidth: "1px",
        minWidth: "35px !important"
    },
});

const CloseButton = ({ onClick = null }) => {
    const closeBtnClasses = useStyles();

    return (
        <MaterialTheme>
            <Button onClick={onClick} classes={closeBtnClasses} variant="outlined" color="primary" >
                <CloseIcon className="p-0 m-0" />
            </Button>
        </MaterialTheme>
    )
};

export default CloseButton;