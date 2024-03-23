"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button, Space, DatePicker } from "antd";
import { blue } from "@ant-design/colors";
import { Breadcrumb } from "antd";

type Props = {
  searchParams: {
    id?: string;
    type?: string;
  };
};

export default function dashboard({ searchParams }: Props) {
  const router = useRouter();

  return (
    <div>
      <b>Dashboard</b>
      <Button type="primary">Go</Button>
      <br />
      id:{searchParams.id} | type:{searchParams.type}
      <br />
      <button
        onClick={() => {
          router.push("/examples/aboutus");
        }}
      >
        | About Us |
      </button>
    </div>
  );
}
