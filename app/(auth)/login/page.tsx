"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/store/store";
import { add, signIn, userSelector } from "@/app/store/slices/userSlice";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import KeyTwoToneIcon from "@mui/icons-material/KeyTwoTone";
import LoginIcon from "@mui/icons-material/Login";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

interface User {
  username: string;
  password: string;
}
type Props = {};
export default function Login({}: Props) {
  const router = useRouter();
  const initialValue: User = { username: "", password: "" };
  const formValidateSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").trim(),
    password: Yup.string().required("Password is required").trim(),
  });
  const reducer = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema),
  });
  const showForm = () => {
    return (
      <form
        onSubmit={handleSubmit(async (value: User) => {
          const result = await dispatch(signIn(value));
          if (signIn.fulfilled.match(result)) {
            router.push("/stock");
          }
        })}
      >
        {/* Username */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={(errors.username?.message ?? "") != ""}
              helperText={errors.username?.message?.toString()}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
              label="Username"
              autoComplete="email"
              autoFocus
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              error={(errors.password?.message ?? "") != ""}
              helperText={errors.password?.message?.toString()}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              label="Password"
              autoComplete="password"
              autoFocus
            />
          )}
        />

        {reducer.status == "failed" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Login Unsuccessfull
          </Alert>
        )}
        {reducer.status == "success" && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Login successfully
          </Alert>
        )}

        <Button
          className="mt-8"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={reducer.status == "fetching"}
        >
          <LoginIcon />
          Login
        </Button>

        <Button
          className="mt-4"
          onClick={() => {
            dispatch(add());
            router.push("/register");
          }}
          type="button"
          fullWidth
          variant="outlined"
        >
          <AddCircleOutlineRoundedIcon />
          Register
        </Button>
      </form>
    );
  };
  return (
    <Box className="flex justify-center items-center">
      <Card className="max-w-[345px] mt-[100px]">
        <CardMedia
          sx={{ height: 200 }}
          image="/static/img/20004111-D8E0-4B50-831F-F86FFBC2E817.jpeg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Login
          </Typography>

          {showForm()}
        </CardContent>
      </Card>
      <style jsx global>
        {`
          body {
            min-height: 100vh;
            position: relative;
            margin: 0;
            background-size: cover;
            background-image: url("/static/img/image-from-rawpixel-id-4026746-original.jpg");
            text-align: center;
          }
        `}
      </style>
    </Box>
  );
}
