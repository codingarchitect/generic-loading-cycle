export default function searchCustomerCycle(sources) {
  const request$ = sources.ACTION
        .filter(action => action.type === 'CUSTOMER_SEARCH')
        .map(action => ({
          url: `http://localhost:8080/Customers?searchtext=${action.payload}`,
          category: 'customer-search',
        }));
  const response$ = sources.HTTP
        .select('customer-search')
        .flatten()
        .map(res => ({
          type: 'CUSTOMER_SEARCH_COMPLETED',
          payload: (res.body),
        }));
  return {
    ACTION: response$,
    HTTP: request$,
  };
}
