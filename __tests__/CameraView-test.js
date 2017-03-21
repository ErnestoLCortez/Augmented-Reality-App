import 'react-native';
import React from 'react';
import CameraView from '../src/components/CameraView';
import renderer from 'react-test-renderer';

test('FormInput component renders correctly', () => {
  const tree = renderer.create(
    <CameraView />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
