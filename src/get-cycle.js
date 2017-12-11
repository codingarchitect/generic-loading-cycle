export default function getCustomerCycle(sources) {
  const request$ = sources.ACTION
        .filter(action => action.type === 'CUSTOMER_GET')
        .map(action => ({
          url: `http://localhost:8080/Customers/${action.payload}`,
          category: 'customer-get',
        }));
  const response$ = sources.HTTP
        .select('customer-get')
        .flatten()
        .map(res => ({
          type: 'CUSTOMER_GET_COMPLETED',
          payload: (res.body),
        }));
  return {
    ACTION: response$,
    HTTP: request$,
  };
}
