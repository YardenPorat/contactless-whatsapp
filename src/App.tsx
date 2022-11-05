import classes from './App.module.css';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { countryCodesOptions, ISRAEL, Option } from './constants/country-codes';
import Autocomplete from '@mui/material/Autocomplete';
import { getPhoneWithPrefix } from './utils/sanitize-phone';
import Button from '@mui/material/Button';
import { localStorageService } from './services/local-storage';

const isHebrew = (str: string) => /[\u0590-\u05FF]/.test(str);
function App() {
    const [phone, setPhone] = useState(localStorageService.getPhone());
    const [message, setMessage] = useState(localStorageService.getMessage());
    const dir = isHebrew(message) ? 'rtl' : 'ltr';
    const [countryCode, setCountryCode] = useState(localStorageService.getCountryCode() || ISRAEL);

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

    return (
        <div className={classes.app}>
            123
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
                    />
                    {/* <Button className={classes.whatsapp} variant="contained">
                        Add
                    </Button> */}
                </div>
                <InputLabel>Output number: +{getPhoneWithPrefix(phone, countryCode?.value)}</InputLabel>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={handleMessageChange}
                    dir={dir}
                    className={classes.input}
                    placeholder="Type your message here"
                />
                <Button
                    className={classes.whatsapp}
                    href={`https://api.whatsapp.com/send?phone=${getPhoneWithPrefix(
                        phone,
                        countryCode?.value
                    )}&text=${encodeURIComponent(message)}`}
                    sx={{ bgcolor: 'unset' }}
                    target="_blank"
                    variant="contained"
                >
                    Send
                </Button>
            </div>
            <footer className={classes.copyright}>
                Made by{' '}
                <a
                    className="button button-secondary"
                    href="https://www.linkedin.com/in/yarden-porat/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Yarden Porat
                </a>
            </footer>
        </div>
    );
}

export default App;
