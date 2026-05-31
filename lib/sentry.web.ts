import React from 'react';

type Component<P = object> = React.ComponentType<P>;

export function init() {}

export function wrap<P extends object>(component: Component<P>): Component<P> {
  return component;
}

export function captureException(error: unknown) {
  console.error(error);
}

export function mobileReplayIntegration() {
  return undefined;
}

export function feedbackIntegration() {
  return undefined;
}
