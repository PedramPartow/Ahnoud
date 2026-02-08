"use client";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from "react";
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

interface RegisterProps {
  setVerifyRegister: (value: boolean) => void;
}

export default function Register({ setVerifyRegister }: RegisterProps) {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyRegister(true);
  }

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <TextField autoComplete="nope" id="FullName" label={t('full_name_label')} variant="standard" />
        <TextField autoComplete="nope" id="Email" label={t('email_label')} variant="standard" />
        <TextField
          autoComplete="new-password"
          id="Password"
          label={t('password_label')}
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggle}
                  edge="end"
                >
                  {showPassword ? <EyeIcon size={24} color={'var(--color-gray-5)'}/> 
                  : <EyeSlashIcon size={24} color={'var(--color-gray-5)'}
                  />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <button type="submit" className="btn button-01 primary md block">
        {t('register_button')}
      </button>
    </form>
  );
};