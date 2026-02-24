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
  email: string;
  setEmail: (value: string) => void;
}

type FieldErrors = {
  fullName: string;
  email: string;
  password: string;
  form: string;
};

export default function Register({ setVerifyRegister, email, setEmail }: RegisterProps) {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({
    fullName: '',
    email: '',
    password: '',
    form: '',
  });

  const handleToggle = () => setShowPassword((prev) => !prev);

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: '', form: '' }));
  };

  const validateClientSide = (): FieldErrors => {
    const nextErrors: FieldErrors = {
      fullName: '',
      email: '',
      password: '',
      form: '',
    };

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedFullName.length < 2) {
      nextErrors.fullName = t('register_full_name_min_error');
    }

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

    if (normalizedMessage.includes('an account with this email already exists')) {
      nextErrors.email = t('register_email_exists_error');
      return nextErrors;
    }

    const ruleMatches = [...message.matchAll(/registerRequest\.(FullName|Email|Password).*?failed on the '(\w+)' tag/gi)];
    for (const match of ruleMatches) {
      const fieldName = match[1]?.toLowerCase();
      const rule = match[2]?.toLowerCase();

      if (fieldName === 'fullname' && rule === 'min') {
        nextErrors.fullName = t('register_full_name_min_error');
      }

      if (fieldName === 'email' && rule === 'email') {
        nextErrors.email = t('register_email_invalid_error');
      }

      if (fieldName === 'password' && rule === 'min') {
        nextErrors.password = t('register_password_min_error');
      }
    }

    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedFullName = fullName.trim();
    const clientErrors = validateClientSide();
    setErrors(clientErrors);

    const hasClientErrors = Object.values(clientErrors).some(Boolean);
    if (hasClientErrors) return;

    setLoading(true);

    try {
      setEmail(trimmedEmail);
      await authApi.register({ full_name: trimmedFullName, email: trimmedEmail, password });
      setVerifyRegister(true);
    } catch (err) {
      if (err instanceof ApiError) {
        const apiErrors = parseApiErrors(err.message);
        const hasMappedErrors = Object.values(apiErrors).some(Boolean);

        setErrors((prev) => ({
          ...prev,
          fullName: apiErrors.fullName || '',
          email: apiErrors.email || '',
          password: apiErrors.password || '',
          form: hasMappedErrors ? '' : t('generic_error'),
        }));
      } else {
        setErrors((prev) => ({ ...prev, form: t('generic_error') }));
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
          slotProps={{
            htmlInput: { minLength: 2 },
          }}
          label={t('full_name_label')}
          variant="standard"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            clearError('fullName');
          }}
          disabled={loading}
          error={!!errors.fullName}
          helperText={errors.fullName}
          required
        />
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
        <TextField
          autoComplete="new-password"
          id="Password"
          label={t('password_label')}
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          value={password}
          slotProps={{
            htmlInput: { minLength: 8 },  
            input: {
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
            },
          }}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError('password');
          }}
          disabled={loading}
          required
          error={!!errors.password}
          helperText={errors.password}
        />
      </div>
      <Button type="submit" className="primary sm-md block" loading={loading}>
        {t('register_button')}
      </Button>
    </form>
  );
};