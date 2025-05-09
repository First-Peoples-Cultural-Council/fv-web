const GlobalConfiguration = {
  API_URL: process.env.API_URL_OVERRIDE || process.env.API_URL || '/api/1.0',
  APP_ENV: process.env.APP_ENV || 'dev',
  AWS_CLIENT_ID: process.env.AWS_CLIENT_ID || '',
  BUILD_STRING: process.env.BUILD_STRING || 'local',
  OIDC_AUTHORITY_URL: process.env.OIDC_AUTHORITY_URL || '',
  OAUTH2_REDIRECT_URL: process.env.OAUTH2_REDIRECT_URL || '',
  END_SESSION_URL: process.env.END_SESSION_URL || '',
  SENTRY_DSN: process.env.SENTRY_DSN ? process.env.SENTRY_DSN : '',
  SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || '',
  SENTRY_RELEASE: process.env.SENTRY_RELEASE ? process.env.SENTRY_RELEASE : '',
  SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE || '1.0',
  SENTRY_ERROR_SAMPLE_RATE: process.env.SENTRY_ERROR_SAMPLE_RATE || '1.0',
}

export default GlobalConfiguration
