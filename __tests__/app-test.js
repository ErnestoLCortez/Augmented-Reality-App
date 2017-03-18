import 'react-native';
import React from 'react';
import App from '../src/app';

import renderer from 'react-test-renderer';

test('App view renders correctly', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});