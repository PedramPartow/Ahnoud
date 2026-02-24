"use client";

import EyeIcon from '@/icons/EyeIcon';
import EyeSlashIcon from '@/icons/EyeSlashIcon';
import { setAuthSession } from '@/services/auth/session';
import { authApi } from '@/services/api/auth';
import { ApiError } from '@/services/api/client';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { toastUtils } from "@/services/toast";
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';
import Button from '../general/Button';

interface ResetProps {
  setResetPassword: (value: boolean) => void;
}

type FieldErrors = {
  email: string;
  password: string;
  form: string;
};

type LoginResponse = {
  token?: string;
  user?: {
    is_admin?: boolean;
  };
};

export default function Login({ setResetPassword }: ResetProps) {
  const t = useTranslations();
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({
    email: '',
    password: '',
    form: '',
  });

  const handleToggle = () => setLoginShowPassword((prev) => !prev);

  const handleOpenResetPassword = () => {
    setResetPassword(true);
  };

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: '', form: '' }));
  };

  const validateClientSide = (): FieldErrors => {
    const nextErrors: FieldErrors = {
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

  const parseApiErrors = (message: string): Partial<FieldErrors> => {
    const nextErrors: Partial<FieldErrors> = {};
    const normalizedMessage = message.toLowerCase();

    const emailValidationFailed = normalizedMessage.includes('email') && normalizedMessage.includes("failed on the 'email' tag");
    if (emailValidationFailed) {
      nextErrors.email = t('register_email_invalid_error');
    }

    const passwordValidationFailed = normalizedMessage.includes('password') && normalizedMessage.includes("failed on the 'min' tag");
    if (passwordValidationFailed) {
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
      const response = (await authApi.login({ email: trimmedEmail, password })) as LoginResponse;
      setAuthSession(response);
      setErrors({ email: '', password: '', form: '' });
    } catch (err) {
      if (err instanceof ApiError) {
        toastUtils.error(err.message);
        setErrors({ email: '', password: '', form: '' });

        const apiErrors = parseApiErrors(err.message);
        const hasMappedErrors = Object.values(apiErrors).some(Boolean);

        setErrors({
          email: apiErrors.email || '',
          password: apiErrors.password || '',
          form: apiErrors.form || (hasMappedErrors ? '' : err.message || t('generic_error')),
        });
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