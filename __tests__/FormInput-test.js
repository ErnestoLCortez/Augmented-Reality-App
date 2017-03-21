import 'react-native';
import React from 'react';
import { FormInput } from '../src/components/FormInput';
import renderer from 'react-test-renderer';

test('FormInput component renders correctly', () => {
  const tree = renderer.create(
    <FormInput />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
