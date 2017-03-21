import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Label, Item } from 'native-base';

const FormInput = ({ labelProp, value, onChangeText, secureTextEntry }) => {
  return (
        <Item floatingLabel last>
            <Label>{ labelProp }</Label>
            <Input
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
            />
        </Item>
  );
};

export { FormInput };
