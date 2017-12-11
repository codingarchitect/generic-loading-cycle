/* eslint fp/no-unused-expression: 1  */
export default function getCustomerCycle(sources) {
  const response$ = sources.HTTP
    .select()
    .flatten()
    .debug((x) => { console.log('Response Interceptor', x); return x; })
    .filter(() => false);

  return {
    HTTP: response$,
  };
}
