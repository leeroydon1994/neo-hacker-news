import "../styles/globals.css";
// Only _app.js can import the global CSS file

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
