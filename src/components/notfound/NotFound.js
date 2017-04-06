import React from 'react';

const NotFound = () => {
  return (
    <div className="aligner">
      <div className="aligner-item center">
        <img className="maven-the-raven" src="/img/404.svg" alt="404" />
        <hr className="s5" />
        <h1 className="center">Maven the Raven is lost...</h1>
        He can't seem to find the page you're looking for.
        <hr className="s2" />
        <a className="error-link" href="/"> Return Home </a>
      </div>
    </div>
  );
};

export default NotFound;
