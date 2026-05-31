import * as Sentry from '@sentry/react-native';

export const init = Sentry.init;
export const wrap = Sentry.wrap;
export const captureException = Sentry.captureException;
export const mobileReplayIntegration = Sentry.mobileReplayIntegration;
export const feedbackIntegration = Sentry.feedbackIntegration;
