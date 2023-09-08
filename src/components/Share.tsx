import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export const Share = ({ setSnackbarMessage }: { setSnackbarMessage: (message: string) => void }) => {
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.toString());
        setSnackbarMessage('Link copied to clipboard');
    };

    return (
        <Tooltip title="Share" placement="top">
            <IconButton onClick={handleShare} color="default">
                <ShareIcon />
            </IconButton>
        </Tooltip>
    );
};
