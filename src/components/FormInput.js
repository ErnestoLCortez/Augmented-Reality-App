import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Label, Item } from 'native-base';

const FormInput = ({ labelProp, value, onChangeText }) => {
  return (
        <Item floatingLabel last>
            <Label>{ labelProp }</Label>
            <Input
                value={value}
                onChangeText={onChangeText}
            />
        </Item>
  );
};

export { FormInput };
