import React from 'react';
import { Tooltip } from '@mui/material';

export const Copyright = () => {
    return (
        <Tooltip title="Contact me for any request" placement="top">
            <span>
                Made by{' '}
                <a
                    className="button button-secondary"
                    href="https://www.linkedin.com/in/yarden-porat/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Yarden Porat
                </a>
            </span>
        </Tooltip>
    );
};
