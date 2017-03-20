import 'react-native';
import React from 'react';
import TabbedFooter from '../src/components/TabbedFooter';

import renderer from 'react-test-renderer';

test('App view renders correctly', () => {
  const tree = renderer.create(
    <TabbedFooter />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
