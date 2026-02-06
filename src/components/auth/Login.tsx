"use client";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

export default function Login() {
  const t = useTranslations();
  const [loginShowPassword, setLoginShowPassword] = useState(false);

  const handleToggle = () => setLoginShowPassword((prev) => !prev);
  
  return (
    <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-8">
          <TextField id="Email" label={t('email_label')} variant="standard" />
          <TextField
            id="Password"
            label={t('password_label')}
            variant="standard"
            type={loginShowPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggle}
                    edge="end"
                  >
                    {loginShowPassword ? <EyeIcon size={24} color={'var(--color-gray-5)'}/> 
                    : <EyeSlashIcon size={24} color={'var(--color-gray-5)'}
                    />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <button type="submit" className="btn button-01 primary md block">
          {t('login_button')}
        </button>
    </form>
  );
};