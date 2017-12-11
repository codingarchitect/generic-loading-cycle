/* eslint better/no-ifs: 1 */
import customers from './customer-test-data';

export default function (match) {
  if (match[1].indexOf('searchtext=') !== -1) {
    return customers.filter(c =>
      c.Name
        .toUpperCase()
        .indexOf(match[1]
          .replace('?searchtext=', '')
          .toUpperCase()) !== -1);
  }
  return customers.filter(c =>
      c.Name
        .toUpperCase()
        .indexOf(match[1]
          .replace('/', '')
          .toUpperCase()) !== -1);
}
