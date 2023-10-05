import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

const Timer = ({ initialTime, onResend }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const handleResendClick = () => {
    setTime(initialTime);
    onResend();
  };

  return (
    <div style={{display:'flex',justifyContent:'end',alignContent:'end'}}>
      {time > 0 ? (
        <Typography  variant="body1" gutterBottom>
          Resend OTP in: {time}
        </Typography>
      ) : (
        <Button variant="text" size='small' onClick={handleResendClick}>
          Resend OTP
        </Button>
      )}
    </div>
  );
};

export default Timer;
