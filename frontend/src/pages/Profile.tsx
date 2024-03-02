import React, { useState } from "react";
import Welcome from "../components/welcome/welcome";

export const Profile: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userDetails")!)!;

  return (
    <div className="m-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-10 lg:px-8 bg-white border-2 rounded-lg mt-12">
      <div className="px-4 sm:px-0 w-full mt-6 grid items-center justify-center">
        <h1 className="text-base font-bold leading-7 text-gray-900 mx-auto">
          User Information
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Personal details of the user
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100 mx-10">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userInfo.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userInfo.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Role
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {userInfo.type}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
