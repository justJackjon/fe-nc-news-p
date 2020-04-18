import { createClient } from 'contentful';

import { store } from '../index';
import { setCMSclient } from '../actions/cmsActions';

// Add instructions to modify config and env variables in README
// Refer to create-react-app documentation available here for test and dev environments:
// https://create-react-app.dev/docs/adding-custom-environment-variables/

export const initCMS = () => {
  const clientConfig = {
    space: process.env.REACT_APP_CTF_SPACE_ID,

    development: {
      host: 'preview.contentful.com',
      accessToken: process.env.REACT_APP_CTF_CPA_TOKEN
    },

    test: {
      host: 'preview.contentful.com',
      accessToken: process.env.REACT_APP_CTF_CPA_TOKEN
    },

    // Prod env uses the delivery token (CDA) as opposed to the preview token (CPA), and is set to use the contentful CDN.
    production: {
      host: 'cdn.contentful.com',
      accessToken: process.env.REACT_APP_CTF_CDA_TOKEN
    }
  };

  const contentfulClient = createClient({
    space: clientConfig.space,
    ...clientConfig[process.env.NODE_ENV || 'development']
  });

  store.dispatch(setCMSclient(contentfulClient));

  return contentfulClient;
};
