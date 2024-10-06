"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

export default function aboutus({}: Props) {
  const router = useRouter();

  return (
    <div>
      <b>About Us</b>
      <br />
      <button
        onClick={() => {
          router.push("/examples/dashboard");
        }}
      >
        | Dashboard |
      </button>
    </div>
  );
}
