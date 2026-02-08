"use client";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTranslations } from "next-intl";
import { useState } from 'react';
import Button from "../general/Button";
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

const SetNewPassword = () => {
    const [newPasswordShow, setNewPasswordShow] = useState(false);

    const handleToggle = () => setNewPasswordShow((prev) => !prev);

    const t = useTranslations();

    return (
        <div className="flex flex-col items-stretch gap-8">
            <div className="flex flex-col items-stretch gap-6 text-center">
                <h1 className="headline-06  text-gray-1">{t("set_new_password_title")}</h1>
                <h2 className="body-01 text-gray-7">{t("set_new_password_subtitle")}</h2>
            </div>
            <div className="flex flex-col items-stretch gap-12">
                <TextField
                    autoComplete="new-password"
                    id="Password"
                    label={t('enter_new_password_label')}
                    variant="standard"
                    type={newPasswordShow ? 'text' : 'password'}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            onClick={handleToggle}
                            edge="end"
                        >
                            {newPasswordShow ? <EyeIcon size={24} color={'var(--color-gray-5)'}/> 
                            : <EyeSlashIcon size={24} color={'var(--color-gray-5)'}
                            />}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
                <Button className="primary block md">{t("reset_password_label")}</Button>
            </div>
        </div>
    );
};

export default SetNewPassword;