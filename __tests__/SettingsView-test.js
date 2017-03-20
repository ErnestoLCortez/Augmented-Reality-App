import 'react-native';
import React from 'react';
import SettingsView from '../src/components/SettingsView';

import renderer from 'react-test-renderer';

test('SettingsView view renders correctly', () => {
  const tree = renderer.create(
    <SettingsView />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
