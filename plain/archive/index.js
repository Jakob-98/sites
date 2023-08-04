import React from 'react';
import { Helmet } from 'react-helmet';
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8');

const JakobsdevPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default JakobsdevPage;
