import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Theme from "../../core/material-theme/materialTheme";

const MaterialButton = ({ variant = "contained", color = "primary", children = null, className = "", type = "button", startIcon: StartIcon = null, endIcon: EndIcon = null }) => {
    return (
        <Theme>
            <Button
                variant={variant}
                color={color}
                className={className}
                // type="button"
                startIcon={<StartIcon />}
                // endIcon={<EndIcon /> || null}
                >
                {children}
            </Button>
        </Theme>
    );
}


export default MaterialButton;