import Head from "next/head";
import React from "react";

export const metadata = {
  title: 'Blogs',
  description: 'Read our latest blogs and stay updated with the latest trends in cloud computing.',
}

const Blogs = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <section className="container blogs">
        <h1 className="my-20 text-5xl font-bold text-center ">
          <span className="text-gradient">Blogs</span>
        </h1>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          async
        ></script>
        <div
          className="elfsight-app-af200899-c2c6-4263-b2c7-ef1163330cbf"
          data-elfsight-app-lazy
        ></div>
      </section>
    </>
  );
};

export default Blogs;
