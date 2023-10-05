import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Phone from "../PhoneNumber/Phone";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, colors } from "@mui/material";
import {useDispatch} from 'react-redux'
import { SetNumber } from "../../features/users/PhoneReducer";
import { phoneNumberApi } from "../../services/api";
export default function Login() {
  const dispatch=useDispatch()
  const [phone, setphone] = useState();
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState(false)
  const navigate=useNavigate()
  
  
  const handleSubmit = (event) => {
    if(phone){
      if(!loading){
      setLoading(true) 
      const data = {
      phone,
    }
   phoneNumberApi(data).then((res) => {
        if(res.data.success){
          setLoading(false)
          dispatch(SetNumber(phone))
          navigate('/otp')
        }else{
          setError(res.data.message)
        }
      })
      .catch((err) =>{
        setLoading(false)
         console.log(err)
        })
    }
    }else{
      setError("Phone number is required")
    } 
  }
  const addPhone = (number) => {
    setphone(number);
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 6,
              backdropFilter: " blur(2rem)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <CardContent>
              <Box
                component="form"
                noValidate
                sx={{
                  my: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Phone changePhone={addPhone} error={error} setError={setError} />
               {error &&( <Typography variant="small" sx={{color:'red',fontSize:'12px',textAlign:'start',mt:'0.5rem'}}>
error
                </Typography>)}  
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                 {!loading?"Continue":"Loading"}
                </Button>
                <Grid container></Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
