"use client";

import EyeIcon from '@/icons/EyeIcon';
import EyeSlashIcon from '@/icons/EyeSlashIcon';
import { authApi } from '@/services/api/auth';
import { ApiError } from '@/services/api/client';
import { setAuthSession } from '@/services/auth/session';
import { toastUtils } from '@/services/toast';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Button from '../general/Button';

interface ResetProps {
  setResetPassword: (value: boolean) => void;
}

export default function Login({ setResetPassword }: ResetProps) {
  const t = useTranslations();
  const router = useRouter();
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: '',
  });

  const handleToggle = () => setLoginShowPassword((prev) => !prev);

  const handleOpenResetPassword = () => {
    setResetPassword(true);
  };

  const clearError = (field: string) => {
    setErrors((prev: any) => ({ ...prev, [field]: '', form: '' }));
  };

  const validateClientSide = () => {
    const nextErrors = {
      email: '',
      password: '',
      form: '',
    };

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      nextErrors.email = t('register_email_invalid_error');
    }

    if (password.length < 8) {
      nextErrors.password = t('register_password_min_error');
    }

    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const clientErrors = validateClientSide();
    setErrors(clientErrors);

    const hasClientErrors = Object.values(clientErrors).some(Boolean);
    if (hasClientErrors) return;

    setLoading(true);
    try {
      const response = await authApi.login({ email: trimmedEmail, password });
      setAuthSession(response);
      setErrors({ email: '', password: '', form: '' });
      toastUtils.success(t('login_success_message'));
      router.push('/');
    } catch (err) {
      if (err instanceof ApiError) {
        const normalizedMessage = err.message.toLowerCase();

        if (normalizedMessage.includes('please confirm your email before logging in')) {
          toastUtils.error(err.message);
          setErrors({ email: '', password: '', form: '' });
          return;
        }

        if (normalizedMessage.includes('invalid email or password')) {
          setErrors({
            email: err.message,
            password: err.message,
            form: '',
          });
          return;
        }

        setErrors({ email: '', password: '', form: err.message || t('generic_error') });
      } else {
        setErrors({
          email: '',
          password: '',
          form: t('generic_error'),
        });
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
            id="Email"
            type="email"
            label={t('email_label')}
            variant="standard"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError('email');
            }}
            disabled={loading}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <div className="flex flex-col gap-4">
            <TextField
              autoComplete="new-password"
              id="Password"
              label={t('password_label')}
              variant="standard"
              type={loginShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError('password');
              }}
              disabled={loading}
              error={!!errors.password}
              helperText={errors.password}
              required
              slotProps={{
                htmlInput: { minLength: 8 }, 
                input: {
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
                },
              }}
            />
            <div className='flex justify-between items-center'>
              <span className='text-gray-7 body-03'>{t("need_help_label")}</span>
              <span onClick={handleOpenResetPassword} className='button-01 text-gray-1 cursor-pointer'>{t("reset_password_label")}</span>
            </div>
          </div>
        </div>
        <Button type="submit" className="primary sm-md block" loading={loading}>
          {t('login_button')}
        </Button>
    </form>
  );
};