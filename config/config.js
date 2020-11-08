/**
 * Create and export configuration variables
 */

// Container for all the environments
const environments = {};

// Staging (default) environment
environments.staging = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'staging',
};

// Development environment
environments.development = {
  httpPort: 6000,
  httpsPort: 6001,
  envName: 'development',
};

// Production environment
environments.production = {
  httpPort: 4000,
  httpsPort: 4001,
  envName: 'production',
};

// Determine which environment was chosen
const currentEnvironment =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : environments.staging;

// Check if the current environment is one of the environments above
const environmentToExport =
  typeof environments[currentEnvironment] == 'object'
    ? environments[currentEnvironment]
    : environments.staging;

// Export this module
export default environmentToExport;
