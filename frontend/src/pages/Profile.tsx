import React, { useState } from "react";
import Welcome from "../components/welcome/welcome";

export const Profile: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userDetails")!)!;

  return (
    <div className="m-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-20">
      <div className="mt-6 border-gray-100 mx-10 grid items-center justify-center">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 mx-auto">
          User Information
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Personal details of the user
        </p>
      </div>
      <div className="mt-6 mx-auto max-w-7xl border-t border-gray-100 flex items-center justify-center">
        <dl className="divide-y divide-gray-100 w-1/2">
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
              {userInfo.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
              {userInfo.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Role
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
              {userInfo.type}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
