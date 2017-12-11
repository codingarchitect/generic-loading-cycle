import store from '../store';
import App from '../App.jsx';
import fixtures from './customer-test-data';
import mockSuperAgent from '../utils/superagent';

test(() => {
  beforeEach(() => {
    mockSuperAgent([{
      pattern: 'http://localhost/Customers(.*)',
      fixtures,
      callback: (match, data) => ({ body: data }),
    }]);
  });
  it('dispatch in render', () => {
    console.log('dispatch in render');
  });
});