import { Grid } from "@mui/material";
import { useState } from "react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { SetUserData } from "../../features/users/UserReducer";
import ModalEditUser from "./ModalEditUser";
import EditProfileCard from "./EditProfileCard";
import { editUserDataApi } from "../../services/api";

import BoilerPlateCode from "../BoilerPlateCode";
function EditProfile({ edit, setEdit }) {
  const dispatch = useDispatch();
  const [errorToast, setErrorToast] = useState({});
  const user = useSelector((state) => state.user.user);
  const [isLoading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const coverPicREF = useRef();
  const profilePicREF = useRef();
  const image0 = useRef();
  const image1 = useRef();
  const image2 = useRef();
  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
    birthday: new Date(user.birthday),
    age: user.age,
    gender: user.gender || "Your Gender",
    location: user.location,
    phone: user.phone,
    Preference: user.Preference,
    profilePic: user.profilePic || "/avatar.jpg",
    coverPic: user.coverPic || "/cover-picture.png",
    faith: user.faith || "Your Religion",
    drinking: user.drinking || "Your Drinking Habit",
    smoking: user.smoking || "Your Smoking Habit",
    bio: user.bio,
    realationshipStatus: user.realationshipStatus || "Your RelationShip Status",
    image0: user.images[0],
    image1: user.images[1],
    image2: user.images[2],
  });

  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setEdit(true);
    if (user) {
      setLoading(false);
      setLoader(false);
    }
  }, []);

  const openModal = (data) => {
    setOption(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
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

    if (profilePicREF.current.files.length) {
      formData.append(
        "profilePic",
        profilePicREF.current.files[0],
        profilePicREF.current.files[0].name
      );
    }

    if (coverPicREF.current.files.length) {
      formData.append(
        "coverPic",
        coverPicREF.current.files[0],
        coverPicREF.current.files[0].name
      );
    }
    if (userData.image0) {
      if (image0.current.files.length) {
        formData.append(
          "image0",
          image0.current.files[0],
          image0.current.files[0].name
        );
      }
    }

    if (userData.image1) {
      if (image1.current.files.length) {
        formData.append(
          "image1",
          image1.current.files[0],
          image1.current.files[0].name
        );
      }
    }
    if (userData.image2) {
      if (image2.current.files.length) {
        formData.append(
          "image2",
          image2.current.files[0],
          image2.current.files[0].name
        );
      }
    }

    for (let i of formData.entries()) {
      console.log(i);
    }
    try {
      const { data } = await editUserDataApi(formData);
      dispatch(SetUserData(data));
      setLoader(false);
      setEdit(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  useEffect(() => {
    console.log(image0.current.files);
  }, [image0, image1, image2]);

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

    if (
      userData.fullName  &&
      userData.email  &&
      userData.birthday  &&
      userData.age>18  &&
      userData.gender  &&
      userData.Preference  &&
      userData.location  &&
      userData.drinking && userData.realationshipStatus&&
      userData.faith && userData.smoking&&userData.profilePic &&userData.coverPic
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


  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ my: { lg: 5 }, minHeight: "100vh" }}
      >
         <BoilerPlateCode
        success={errorToast.success}
        open={errorToast.open}
        data={errorToast.data}
        setToastClosed={() => setErrorToast({})}
      />
        <Grid item xs={12} sm={10} md={8} lg={6} xl={10}>
          <EditProfileCard
          validateInputs={validateInputs}
            userData={userData}
            setUserData={setUserData}
            error={error}
            coverPicREF={coverPicREF}
            profilePicREF={profilePicREF}
            image0={image0}
            image1={image1}
            image2={image2}
            openModal={openModal}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            loader={loader}
            setLoader={setLoader}
          />
        </Grid>
        <ModalEditUser
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          option={option}
          setModalOpen={setModalOpen}
          setUserData={setUserData}
        />
      </Grid>
    </>
  );
}

export default EditProfile;
