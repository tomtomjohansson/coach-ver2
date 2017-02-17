import React from 'react';
import {shallow} from 'enzyme';
// import TestUtils from 'react-addons-test-utils';
import {AddPlayer} from '../AddPlayer';

function setup(name) {
  return shallow(<AddPlayer />);
}

describe('Add Player form', () => {
  const wrapper = setup();
  it('Checks savebutton', () => {
    const saveButton = wrapper.find('Button').first();
    expect(saveButton.prop('buttonType')).toBe('cta');
    saveButton.prop('onPress')();
    expect(wrapper.state().submitted).toBe(true);
  });
  it('Check validation of name',()=> {
    const input = wrapper.find('Input').first();
    input.prop('onChangeText')('#€#€');
    expect(wrapper.state().name.error).toBe('Endast bokstäver och siffror tillåts');
    input.prop('onChangeText')('Tomas Johansson');
    expect(wrapper.state().name.error).toBe(false);
  });
});
