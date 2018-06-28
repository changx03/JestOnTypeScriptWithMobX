import * as React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import BonView from './bonView';

configure({ adapter: new Adapter() });

describe('<BonView />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<BonView />);
  });

  it('should render 10 list item', () => {
    expect(wrapper.find('li.list-item')).toHaveLength(10);
  });

  it('simulate Add btn onClick event', () => {
    wrapper.find('button.btn-add').simulate('click');
    expect(wrapper.find('li.list-item')).toHaveLength(11);
  });

  it('should not render div.result', () => {
    expect(wrapper.find('div.result').exists()).toEqual(false);
  });

  it('simulate Find btn onClick event', () => {
    wrapper.find('button.btn-find').simulate('click');
    expect(wrapper.find('div.result')).toHaveLength(1);
    expect(wrapper.find('button.btn-find').prop('disabled')).toEqual(true);
  });
});
