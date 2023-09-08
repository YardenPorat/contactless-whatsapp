import { useState } from 'react';
import { localStorageService } from '../services/local-storage';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Collapse, Box, List, ListItem, ListItemButton, ListItemText, type SxProps } from '@mui/material';
import { isHebrew } from '../utils/rtl';
import { EMPTY_OBJECT } from '../constants/misc';

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
                        const ListItemButtonSx: SxProps = isHebrew(message)
                            ? { direction: 'rtl', textAlign: 'right' }
                            : EMPTY_OBJECT;
                        return (
                            <ListItem
                                key={message}
                                disablePadding
                                divider={index !== messageStore.length - 1}
                                onClick={() => handleMessageSelect(message)}
                            >
                                <ListItemButton sx={ListItemButtonSx}>
                                    <ListItemText primary={message} sx={listItemTextSx} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};
