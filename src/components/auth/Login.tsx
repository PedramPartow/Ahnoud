"use client";

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword((prev) => !prev);
  
  return (
    <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
      <TextField id="FullName" label="Full Name" variant="standard" />
      <TextField id="Email" label="Email" variant="standard" />
      <TextField
        id="Password"
        placeholder="Password"
        variant="standard"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center justify-center p-0 cursor-pointer"
          >
            {showPassword ? <EyeIcon size={20}/> : <EyeSlashIcon size={20}/>}
          </button>
        }
      />







      
      {/* <button type="submit" className="btn button-01 primary md block">
        Log In
      </button> */}
      {/* <div className="relative flex items-center justify-center">
        <span className="absolute h-px w-full bg-gray-9" aria-hidden />
        <span className="relative z-10 bg-gray-13 px-3 text-sm text-gray-5">
          Or
        </span>
      </div> */}
      {/* <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="btn button-01 dark md flex items-center justify-center gap-2"
        >
          <GoogleIcon size={20} color="#fff" />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="btn button-01 dark md flex items-center justify-center gap-2"
        >
          <AppleIcon size={20} color="#fff" />
          <span>Apple</span>
        </button>
      </div> */}
    </form>
  );
}
