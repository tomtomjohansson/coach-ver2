import 'react-native';
import React from 'react';
import Coach from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {mount,shallow,render} from 'enzyme';

function setup(saving) {
  let props = {
    saving: saving,
    loading: "falses"
  };
  return shallow(<Coach {...props} />);
}

it('renders correctly', () => {
  const tree = renderer.create(
    <Coach />
  );
});
describe('Thing',()=>{
  it('renders text', ()=>{
    const wrapper = setup(false);
    const foo = wrapper.find('Text').first();
    expect(foo.prop('className')).toEqual('foo');
  });
});
