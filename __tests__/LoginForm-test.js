import 'react-native';
import React from 'react';
import LoginForm from '../src/components/LoginForm';

import renderer from 'react-test-renderer';

test('LoginForm view renders correctly', () => {
  const tree = renderer.create(
    <LoginForm />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
