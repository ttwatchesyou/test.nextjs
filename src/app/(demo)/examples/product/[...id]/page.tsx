"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string[] };
};

export default function Product({ params }: Props) {
  const router = useRouter();
  return (
    <div>
      <b>Product</b>
      <br />
      <button
        onClick={() => {
          router.push("/examples/aboutus");
        }}
      >
        | About Us |
      </button>
      <br />
      <button
        onClick={() => {
          router.push("/examples/dashboard");
        }}
      >
        | Dashboard |
      </button>

      <ul>
        {params.id.map((v) => (
          <li key={v}>Product Tag:{v}</li>
        ))}
      </ul>
    </div>
  );
}
