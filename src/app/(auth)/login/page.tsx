"use client";
import { Image, Input, Button, Alert, Row, Col, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/src/app/store/store";
import { add, signIn, userSelector } from "@/src/app/store/slices/userSlice";

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
        <Form.Item
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <StyledInput
                {...field}
                placeholder="Username"
                prefix={<UserOutlined />}
              />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <StyledPasswordInput
                {...field}
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            )}
          />
        </Form.Item>

        {reducer.status == "failed" && (
          <Alert message="Login Unsuccessful" type="error" />
        )}
        {reducer.status == "success" && (
          <Alert message="Login Successfully" type="success" />
        )}

        <Row gutter={[8, 8]}>
          <Col span={12}>
            <LoginButton
              htmlType="submit"
              loading={reducer.status == "fetching"}
            >
              Login
            </LoginButton>
          </Col>
          <Col span={12}>
            <RegisButton
              onClick={() => {
                dispatch(add());
                router.push("/register");
              }}
            >
              Register
            </RegisButton>
          </Col>
        </Row>
      </form>
    );
  };

  return (
    <LoginSection>
      <LoginCard>
        <WrapLogoImge>
          <Image
            src="/static/img/20004111-D8E0-4B50-831F-F86FFBC2E817.jpeg"
            preview={false}
          />
        </WrapLogoImge>
        <StyledLoginBox>
          <LoginTypo>Login</LoginTypo>
          {showForm()}
        </StyledLoginBox>
      </LoginCard>
    </LoginSection>
  );
}

const StyledLoginBox = styled.div`
  max-width: 500px;
  justify-content: center;
  align-items: center;
  padding: 40px;
  padding-top: 0px;
  gap: 30px;
`;
const LoginCard = styled.div`
  max-width: 700px;
  border-radius: 32px;
  background: #fff;
`;
const LoginSection = styled.div`
  min-height: 100vh;
  margin: 0;
  background-size: cover;
  background-image: url("/static/img/image-from-rawpixel-id-4026746-original.jpg");
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;
const LoginTypo = styled.h1`
  padding: 10px;
  margin: 0px;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const WrapLogoImge = styled.div`
  max-width: 500px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
`;

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
`;

const StyledPasswordInput = styled(Input.Password)`
  margin-bottom: 16px;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
`;

const LoginButton = styled(Button)`
  width: 100%;
  color: #fff;
  background: #dd9237;
`;

const RegisButton = styled(Button)`
  width: 100%;
  color: #dd9237;
  background: #fff;
`;
