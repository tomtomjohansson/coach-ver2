// import Jest from 'jest';
import React from 'react';
import 'react-native';
import {mount,shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import PlayerList from './PlayerList';
import renderer from 'react-test-renderer';

function setup(name) {
  let props = {
    players: [{name:'Ttom',age:23},{name:name,age:27}]
  };
  return shallow(<PlayerList {...props} />);
}

describe('PlayersContainer via Enzyme', ()=>{
  it('renders form and h1', () => {
    const wrapper = setup('Nisse');
    expect(wrapper.find('Text').length).toBe(2);
  });
  it('renders second text', () => {
    const wrapper = setup('Nisse');
    expect(wrapper.find('Text').last().props().children).toEqual('Nisse');
  });
});