import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import classes from './App.module.css';
import { Snackbar } from '@mui/material';
import { countryCodesOptions, ISRAEL, Option } from './constants/country-codes';
import { getPhoneWithPrefix } from './utils/sanitize-phone';
import { localStorageService } from './services/local-storage';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Share } from './components/Share';
import { isHebrew } from './utils/rtl';
import { SavedMessages } from './components/SavedMessages';
import { Copyright } from './components/Footer';

const labelProps = {
    sx: {
        '&.MuiInputLabel-shrink': {
            backgroundColor: 'rgba(239,242,245,.8)',
            border: '1px solid #ccc',
            p: '1px 5px',
            borderRadius: '10px',
        },
    },
};

function App() {
    const [phone, setPhone] = useState(localStorageService.getPhone());
    const [message, setMessage] = useState(localStorageService.getMessage());

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [countryCode, setCountryCode] = useState(localStorageService.getCountryCode() || ISRAEL);

    const dir = isHebrew(message) ? 'rtl' : 'ltr';

    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        localStorageService.savePhone(e.target.value);
    }, []);

    const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        localStorageService.saveMessage(e.target.value);
    }, []);

    const handleCountryCodeChange = useCallback((_e: React.SyntheticEvent<Element, Event>, option: Option | null) => {
        if (option) {
            setCountryCode(option);
            localStorageService.saveCountryCode(option);
        }
    }, []);

    const closeSnackbar = () => setSnackbarMessage('');

    const handleSend = () => {
        if (!phone) {
            setSnackbarMessage('Missing phone number');
            return;
        }

        const phoneNumber = getPhoneWithPrefix(phone, countryCode?.value);
        const whatsappUri = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUri, '_blank');
    };

    return (
        <>
            <div className={classes.app}>
                <div className={classes.inputs}>
                    <Autocomplete<Option>
                        id="country-code"
                        options={countryCodesOptions}
                        onChange={handleCountryCodeChange}
                        value={countryCode}
                        className={classes.input}
                        renderInput={(params) => <TextField {...params} label="Country Code" />}
                    />
                    <div className={classes.phoneContainer}>
                        <TextField
                            id="outlined-basic"
                            label="Phone number"
                            variant="outlined"
                            value={phone}
                            onChange={handlePhoneChange}
                            className={`${classes.phone} ${classes.input}`}
                            InputLabelProps={labelProps}
                        />
                    </div>
                    <InputLabel>Output number: +{getPhoneWithPrefix(phone, countryCode?.value)}</InputLabel>
                    <SavedMessages setSnackbarMessage={setSnackbarMessage} message={message} setMessage={setMessage} />
                    <TextField
                        label="Message"
                        multiline
                        rows={4}
                        value={message}
                        onChange={handleMessageChange}
                        dir={dir}
                        className={classes.input}
                        placeholder="Type your message here"
                        InputLabelProps={labelProps}
                    />
                    <Button
                        className={classes.whatsapp}
                        onClick={handleSend}
                        sx={{ bgcolor: 'unset' }}
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                    >
                        Send
                    </Button>
                    <footer className={classes.footer}>
                        <Copyright />
                        <Share setSnackbarMessage={setSnackbarMessage} />
                    </footer>
                </div>
            </div>

            <Snackbar
                open={!!snackbarMessage}
                onClose={closeSnackbar}
                autoHideDuration={3000}
                message={snackbarMessage}
            />
        </>
    );
}

export default App;
