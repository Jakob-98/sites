import React from 'react';

const GoogleAnalytics = () => (
  <>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HN73K8D8VQ"></script>
    <script dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HN73K8D8VQ');
      `
    }}>
    </script>
  </>
);

export default GoogleAnalytics;
