const apiConfig = {
  apiUrl: {
    platform: '___NODEJS__',
    default: 'http://localhost:5000/api/v1/',
  },
};

export const environment = {
  production: false,
};

/**
 * Function to asign which platform are we using
 * @param key we asign a params from our object (name could have been toto or so doesn't mind ! we choose the word key)
 */
export function getConfig(key: string) {
  // 1) we make a const from our object
  const config = apiConfig;
  // 2) if we don't have any data from our object
  if (!config[key]) {
    // 3) we throw a simple error
    throw new Error('Unknown platform config key: ' + key);
  }

  // 4) but if we have the value in our object
  // 5) we made a value of our object params to indicate that it's work
  const value = config[key];
  // 6) if the platform startswith ---- then it's good
  if (value.platform.startsWith('___')) {
    // 7) simple return value
    return value.default;
  }

  // 8) platform value is all good
  return value.platform;
}
