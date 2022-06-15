import React from "react";
import Layout from "./Layout";
import Form from "../components/Form";

const Signup = () => {
  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
        </div>
      </div>
      <Form register />
    </Layout>
  );
};

export default Signup;
