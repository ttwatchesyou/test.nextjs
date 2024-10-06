import Link from "next/link";
import React, { Children } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Dashboardlayout({ children }: Props) {
  return (
    <div>
      <nav>
        <Link href="/examples/dashboard/">Dashboard</Link> |
        <Link href="/examples/aboutus/">AboutUs</Link>
      </nav>
      {children}
    </div>
  );
}
