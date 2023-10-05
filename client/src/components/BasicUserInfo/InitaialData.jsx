import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth_user } from "../../features/users/AuthReducer";
import { createAccountApi } from "../../services/api";
import FirstData from "./FirstData";
import BoilerPlateCode from "../BoilerPlateCode";
import SecondData from "./SecondData";
import { Card, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRef } from "react";
import PreviewData from "./PreviewData";
const steps = ["Basic Infos", "Add Your Photos", "Preview Account","All Set"];
export default function InitialData() {
  const dispatch = useDispatch();
  const Phone = useSelector((state) => state.phone);
  const { user } = useSelector((state) => state.google);
  const [loading, setloading] = useState(false);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    birthday: null,
    age: null,
    gender: "",
    location: "",
    phone: "",
    Preference: "",
    isVerified: false,
    faith: '',
    realationshipStatus: '',
    drinking: '',
    smoking: '',
    profilePic: "",
    coverPic: "",
    profilePicFile:{},
    coverPicFile:{},
    image0File:{},
    image1File:{},
    image2File:{}
  });
  const [errorToast, setErrorToast] = useState({});
  const [error, setError] = useState({});
  const coverPicREF = useRef();
  const profilePicREF = useRef();
  const image0 = useRef();
  const image1 = useRef();
  const image2 = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setUserData((prevState) => ({
        ...prevState,
        phone: Phone.number,
        isVerified: true,
        email: user.email,
        fullName: user.fullName,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        phone: Phone.number,
        isVerified: true,
      }));
    }
  }, []);

  const validateInputs = () => {
    console.log('inHere to validate',error);
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // setUserData((prev) => ({
    //   ...prev,
    //   firstData: true,
    // }));
    if (!userData.fullName) {
      setError((prevState) => ({
        ...prevState,
        fullName: "*FullName is required",
      }));
    } else setError((prevState) => ({ ...prevState, fullName: null }));

    if (!userData.email) {
      setError((prevState) => ({ ...prevState, email: "*Email is required" }));
    } else if (!regexEmail.test(userData.email)) {
      setError((prevState) => ({
        ...prevState,
        email: "*Enter a valid email",
      }));
    } else setError((prevState) => ({ ...prevState, email: null }));

    if (!userData.birthday) {
      setError((prevState) => ({
        ...prevState,
        birthday: "*Birthdate is required",
      }));
    } 
     if (userData.birthday&&userData.age < 18) {
      setError((prevState) => ({ ...prevState, birthday: "*Should be  18+" }));
    } else setError((prevState) => ({ ...prevState, birthday: null }));

    if (!userData.gender) {
      setError((prevState) => ({
        ...prevState,
        gender: "*Gender is required",
      }));
    } else setError((prevState) => ({ ...prevState, gender: null }));

    if (!userData.Preference) {
      setError((prevState) => ({
        ...prevState,
        Preference: "*Preference is required",
      }));
    } else setError((prevState) => ({ ...prevState, Preference: null }));
    if (!userData.faith) {
      setError((prevState) => ({
        ...prevState,
        faith: "*this field is required",
      }));
    } else setError((prevState) => ({ ...prevState, faith: null }));
    if (!userData.realationshipStatus) {
      setError((prevState) => ({
        ...prevState,
        realationshipStatus: "*this field is required",
      }));
    } else
      setError((prevState) => ({ ...prevState, realationshipStatus: null }));
    if (!userData.smoking) {
      setError((prevState) => ({
        ...prevState,
        smoking: "*this field is required",
      }));
    } else setError((prevState) => ({ ...prevState, smoking: null }));
    if (!userData.drinking) {
      setError((prevState) => ({
        ...prevState,
        drinking: "*this field is required",
      }));
    } else setError((prevState) => ({ ...prevState, drinking: null }));
    if (!userData.bio) {
      setError((prevState) => ({
        ...prevState,
        bio: "*Bio is required",
      }));
    } else setError((prevState) => ({ ...prevState, bio: null }));

    if (!userData.location) {
      setError((prevState) => ({
        ...prevState,
        location: "*Location is required",
      }));
    } else setError((prevState) => ({ ...prevState, location: null })); 
    
    if (
      userData.fullName  &&
      userData.email  &&
      userData.birthday  &&
      userData.age>18  &&
      userData.gender  &&
      userData.Preference  &&
      userData.location  &&
      userData.drinking && userData.realationshipStatus&&
      userData.faith && userData.smoking
    ) {
      setError({});
      return true;
    }else{
       setErrorToast({});
      setErrorToast({
        data: "Please check the form for errors.",
        success: false,
        open: true,
    })

    return false;
    }
   
   
  };

  const validateImageInput = () => {
    if (!userData.profilePic) {
      setError((prevState) => ({
        ...prevState,
        profilePic: "*Location is required",
      }));
    } else setError((prevState) => ({ ...prevState, profilePic: null }));

    if (!userData.coverPic) {
      setError((prevState) => ({
        ...prevState,
        profilePic: "*Location is required",
      }));
    } else setError((prevState) => ({ ...prevState, profilePic: null }));

    if (!userData.profilePic || !userData.coverPic) {
      setErrorToast({});
      setErrorToast({
        data: "Please add a profile pic and a cover pic atleast!",
        success: false,
        open: true,
      });
    } else {
      setError(false);
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if(!loading){
      setloading(true);
      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("email", userData.email);
      formData.append("birthday", userData.birthday);
      formData.append("age", userData.age);
      formData.append("gender", userData.gender);
      formData.append("location", userData.location);
      formData.append("faith", userData.faith);
      formData.append("drinking", userData.drinking);
      formData.append("smoking", userData.smoking);
      formData.append("bio", userData.bio);
      formData.append("phone", userData.phone);
      formData.append("Preference", userData.Preference);
      formData.append("realationshipStatus", userData.realationshipStatus);
      console.log('j');
      if (userData.profilePicFile) {
        console.log('hlo',userData.profilePicFile);
        formData.append(
          "profilePic",
          userData.profilePicFile,
          userData.profilePicFile.name
        );
      }
  
      if (userData.coverPicFile) {
        console.log('bye',userData.coverPicFile);
        formData.append(
          "coverPic",
          userData.coverPicFile,
          userData.coverPicFile.name
        );
      }
      if (userData.image0) {
        console.log('hi');
        if (userData.image0File) {
          formData.append(
            "image0",
            userData.image0File,
            userData.image0File.name
          );
        }
      }
  
      if (userData.image1) {
        if (userData.image1File) {
          formData.append(
            "image1",
            userData.image1File,
            userData.image1File.name
          );
        }
      }
      if (userData.image2) {
        if (userData.image2File) {
          formData.append(
            "image2",
            userData.image2File,
            userData.image2File.name
          );
        }
      }
  
      createAccountApi(formData)
        .then((res) => {
          if (res.data.success) {
            setloading(false);
            localStorage.setItem(
              "authorization.user",
              JSON.stringify(res.data.token)
            );
            dispatch(Auth_user());
            navigate(res.data.redirect);
          }
        })
        .catch((err) => {
          setloading(false);
          setErrorToast({
            data: "Failed to create an account. Please try again later.",
            success: false,
            open: true,
          });
          console.log(err);
        });
    }
  };

  const validateImageSize=(fileSize)=>{
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB

    if(fileSize>MAX_FILE_SIZE){
      setErrorToast({});
      setErrorToast({
        data: "The image you provide is greater than 2 mb",
        success: false,
        open: true,
      });
      return false
    }
    return true
  }

  return (
    <>
      <BoilerPlateCode
        success={errorToast.success}
        open={errorToast.open}
        data={errorToast.data}
        setToastClosed={() => setErrorToast({})}
      />
      <Grid container>
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              my: 5,
              minHeight: "70vh",
              borderRadius: 6,
              backdropFilter: "brightness(0.9) blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {step === 0 && (
              <FirstData
                setUserData={setUserData}
                userData={userData}
                validateInputs={validateInputs}
                error={error}
                loading={loading}
                setStep={setStep}
              />
            )}
            {step === 1 && (
              <SecondData
                setUserData={setUserData}
                userData={userData}
                loading={loading}
                validateImageInput={validateImageInput}
                coverPicREF={coverPicREF}
                profilePicREF={profilePicREF}
                image0={image0}
                image1={image1}
                image2={image2}
                handleSubmit={handleSubmit}
                setStep={setStep}
                validateImageSize={validateImageSize}
              />
            )}
            {step === 2 && <PreviewData user={userData} setStep={setStep} handleSubmit={handleSubmit}    coverPicREF={coverPicREF}
                profilePicREF={profilePicREF}
                image0={image0}
                image1={image1}
                image2={image2}
                loading={loading} />}

            <Box sx={{ width: "100%", my: 5 }}>
              <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
