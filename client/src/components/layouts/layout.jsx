import React from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title = "AG Realtors - Real Estate Agency",
  description = "Best Real Estate Agency in Dwarka | AG Realtors",
  keywords = "real estate, best real estate agency, real estate agency in dwarka, ag realtors, best real estate agency in dwarka",
  author = "Gagan Jain",
  image = "https://www.agrealtorsdwarka.com/logo.jpg",
  url = "https://www.agrealtorsdwarka.com",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>

        {/* Open Graph Meta Tags (for Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
    </>
  );
};

export default Layout;
