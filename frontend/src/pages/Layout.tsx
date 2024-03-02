import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/Navbar";

export const Layout = () => {
  const [userDetails, setUserDetails] = useState<any>(
    JSON.parse(localStorage.getItem("userDetails")!),
  );

  return (
    <div className="">
      {userDetails ? (
        <>
          <div className="flex flex-col space-y-6">
            <div>
              <NavBar />
            </div>
            <div className="mt-5">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </div>
  );
};
