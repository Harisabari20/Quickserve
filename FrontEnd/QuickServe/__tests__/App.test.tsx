/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import RootNavigator from '../src/navigation/RootNavigator';

test('renders app shell without crashing', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('renders root navigator without navigation context errors', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<RootNavigator />);
  });
});
