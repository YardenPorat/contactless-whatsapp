import { useState } from 'react';
import { localStorageService } from '../services/local-storage';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse, Box, List, ListItem, ListItemButton, ListItemText, type SxProps } from '@mui/material';
import { isHebrew } from '../utils/rtl';

const collapseSx = { width: '100%', maxWidth: 360, bgcolor: 'background.paper' };
const listItemTextSx = { minHeight: '20px' };

export const SavedMessages = ({
    setSnackbarMessage,
    message,
    setMessage,
}: {
    setSnackbarMessage: (message: string) => void;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [messageStore, setMessageStore] = useState(localStorageService.getMessageFromStore());
    const [messagesPanelOpen, setMessagesPanelOpen] = useState(false);

    const handleSaveMessage = () => {
        localStorageService.saveToMessageStore(message);
        setSnackbarMessage('Message saved');
        setMessageStore(localStorageService.getMessageFromStore());
    };

    const handleMessageSelect = (message: string) => {
        setMessage(message);
        localStorageService.saveMessage(message);
        setMessagesPanelOpen(false);
    };

    const toggleMessagesPanel = () => {
        if (!messageStore.length) {
            setSnackbarMessage('No saved messages');
            return;
        }
        setMessagesPanelOpen((prev) => !prev);
    };

    const handleDelete = (message: string) => {
        const updatedStore = localStorageService.deleteFromMessageStore(message);
        setMessageStore(updatedStore);
    };

    return (
        <>
            <Box display="flex">
                <Tooltip title="Save message" placement="top">
                    <IconButton onClick={handleSaveMessage} size="small">
                        <SaveIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Open saved" placement="top">
                    <IconButton onClick={toggleMessagesPanel} size="small">
                        <FormatListNumberedIcon color="action" />
                    </IconButton>
                </Tooltip>
            </Box>
            <Collapse in={messagesPanelOpen} timeout="auto" unmountOnExit sx={collapseSx}>
                <List dense>
                    {messageStore.map((message, index) => {
                        const listItemButtonSx: SxProps = getListItemButtonStyles(isHebrew(message));
                        const onDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            event.stopPropagation();
                            handleDelete(message);
                        };
                        return (
                            <ListItem
                                key={message}
                                disablePadding
                                divider={index !== messageStore.length - 1}
                                onClick={() => handleMessageSelect(message)}
                            >
                                <ListItemButton sx={listItemButtonSx}>
                                    <ListItemText primary={message} sx={listItemTextSx} />
                                    <IconButton sx={{ visibility: 'hidden' }} onClick={onDelete} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};

function getListItemButtonStyles(isRtl: boolean): SxProps {
    return {
        '&:hover': {
            '& button': {
                visibility: 'visible',
            },
        },
        ...(isRtl ? { direction: 'rtl', textAlign: 'right' } : undefined),
    };
}
