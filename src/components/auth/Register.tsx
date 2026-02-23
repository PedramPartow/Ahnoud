"use client";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from "react";
import EyeIcon from '@/icons/EyeIcon';
import EyeSlashIcon from '@/icons/EyeSlashIcon';
import { authApi } from '@/services/api/auth';
import { ApiError } from '@/services/api/client';
import Button from '../general/Button';

interface RegisterProps {
  setVerifyRegister: (value: boolean) => void;
}

export default function Register({ setVerifyRegister }: RegisterProps) {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authApi.register({ fullName, email, password });
      setVerifyRegister(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(t('generic_error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <TextField
          autoComplete="nope"
          id="FullName"
          label={t('full_name_label')}
          variant="standard"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
        />
        <TextField
          autoComplete="nope"
          id="Email"
          label={t('email_label')}
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          autoComplete="new-password"
          id="Password"
          label={t('password_label')}
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
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
      <Button type="submit" className="primary sm-md block" loading={loading}>
        {t('register_button')}
      </Button>
    </form>
  );
};