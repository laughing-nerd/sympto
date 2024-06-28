import Nav from "@/components/Navigation/Nav";
import { ReactNode } from "react";
import React from "react";
type Props = {
  children?: ReactNode;
};
const Layout = ({ children }: Props) => {
  return <>
    <div className="max-w-7xl mx-auto py-5">
      <Nav />
      {children}
    </div>
  </>;
};

export default Layout;
