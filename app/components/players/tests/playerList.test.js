import React from 'react';
import {mount,shallow} from 'enzyme';
// import TestUtils from 'react-addons-test-utils';
import PlayerList from '../PlayerList';


describe('PlayerList', () => {
  it('Renders list with correct items', () => {
    const props = {
      players: [{name:'tom'},{name:'bom'},{name:'gom'}]
    };
    const wrapper = shallow(<PlayerList {...props} />);
    expect(wrapper.find('PlayerItem').length).toBe(3);
    expect(wrapper.find('PlayerItem').first().prop('player')).toEqual({name:'tom'});
  });
});
