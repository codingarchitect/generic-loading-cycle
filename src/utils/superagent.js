/* eslint import/no-extraneous-dependencies: 1 */
import superagent from 'superagent';
import superagentMock from 'superagent-mock';
import { optionsToSuperagent } from '@cycle/http/lib/http-driver';

function mockSuperAgentFactory() {
  const request = optionsToSuperagent({ url: '' });
  return function mockSuperAgent(config) {
    return superagentMock({
      Request: request.constructor,
      Response: superagent.Response,
    }, config);
  };
}

export default mockSuperAgentFactory();
