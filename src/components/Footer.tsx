import React from 'react';
import { Box, Tooltip } from '@mui/material';

export const Copyright = () => {
    return (
        <div>
            <Tooltip title="Contact me for any request" placement="top">
                <span>
                    Made with ❤️ by{' '}
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
            <Box textAlign="left">
                <a href="https://buymeacoffee.com/yardenporat" target="_blank" rel="noreferrer">
                    Buy me a coffee ☕
                </a>
            </Box>
        </div>
    );
};
