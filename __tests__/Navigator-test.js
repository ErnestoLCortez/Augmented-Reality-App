import 'react-native';
import React from 'react';
import Navigator from '../src/components/Navigator';

import renderer from 'react-test-renderer';

test('Navigator view renders correctly', () => {
  const tree = renderer.create(
    <Navigator />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
