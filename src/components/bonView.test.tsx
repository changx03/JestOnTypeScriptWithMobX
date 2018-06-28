import * as React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import BonView from './bonView';

configure({ adapter: new Adapter() });

const INIT_COUNT = 10;

describe('<BonView />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<BonView />);
  });

  it('should render 10 list item', () => {
    expect(wrapper.find('li.list-item')).toHaveLength(INIT_COUNT);
  });

  it('simulate Add btn onClick event', () => {
    const numClicks = 10;
    for (let i = 0; i < numClicks; i++) {
      wrapper.find('button.btn-add').simulate('click');
    }
    expect(wrapper.find('li.list-item')).toHaveLength(INIT_COUNT + numClicks);
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
