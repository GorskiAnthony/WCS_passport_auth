import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="bg-white min-h-full flex flex-col lg:relative">
        <div className="flex-grow flex flex-col">
          <main className="flex-grow flex flex-col bg-white">
            <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0 my-auto py-16 sm:py-32">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  404 error
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
