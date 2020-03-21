// import * as React from 'react';
// import { Action, Client, QueryResponse, createClient } from 'react-fetching-library';
// import pick from 'lodash/pick';
import axios from 'axios'

const API_URL = 'http://localhost:8080';

// // const cache = createCache<QueryResponse<any>>(
// //   action => {
// //     return action.method === 'GET';
// //   },
// //   response => {
// //     return new Date().getTime() - response.timestamp < 10000;
// //   }
// // );

// interface Cache<T> {
//   add: (action: Action, value: T) => void;
//   remove: (action: Action) => void;
//   get: (
//     action: Action
//   ) =>
//     | (T & {
//         timestamp: number;
//       })
//     | undefined;
//   getItems: () => {
//     [key: string]: T;
//   };
//   setItems: (items: { [key: string]: T }) => void;
// }

// export const convertActionToBase64 = (action: Action) => {
//   return Buffer.from(JSON.stringify(action)).toString('base64');
// };

// let client: Client<any>;

// const cacheContext = React.createContext<{
//   client?: Client<any>;
//   cache?: Cache<QueryResponse>;
//   items?: { [key: string]: any };
// }>({});

// const CacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cacheState, setCache] = React.useState<{ [key: string]: any }>({});
//   const add = (action: Action, value: any) => {
//     // cache.add(action, value)
//     if (action.method === 'GET') {
//       const cacheKey = cacheState[convertActionToBase64(pick(action, ['endpoint', 'method']))];
//       console.log(cacheKey)
//       if (!cacheKey) {
//         setCache({
//           ...cacheState,
//           [convertActionToBase64(pick(action, ['endpoint', 'method']))]: { ...value, action, timestamp: Date.now() }
//         });
//       } else {
//         setCache({
//           ...cacheState,
//           [convertActionToBase64(pick(action, ['endpoint', 'method']))]: {
//             ...cacheKey,
//             payload: [...cacheKey.payload, { ...value, action, timestamp: Date.now() }]
//           }
//         });
//       }
//     }
//   };

//   const remove = (action: Action) => {
//     const itemsTmp: { [key: string]: any } = {};
//     const actionKey = convertActionToBase64(action);
//     Object.keys(cacheState).forEach((key: string) => {
//       if (actionKey !== key) {
//         itemsTmp[key] = cacheState[key];
//       }
//     });
//     setCache(itemsTmp);
//   };

//   const setItems = (value: { [key: string]: any }) => {
//     setCache(value);
//   };

//   const get = (action: Action) => {
//     const response = cacheState[convertActionToBase64(action)];
//     const valid = response;

//     if (valid) {
//       return response;
//     }

//     if (response && !valid) {
//       remove(action);
//     }
//   };

//   const getItems = () => {
//     return cacheState;
//   };

//   const cache = {
//     add,
//     get: get,
//     remove,
//     setItems,
//     getItems: getItems
//   };

//   client = React.useMemo<Client<any>>(
//     () =>
//       createClient({
//         //None of the options is required
//         requestInterceptors: [
//           () => async action => {
//             return {
//               ...action,
//               endpoint: `${API_URL}${action.endpoint}`
//             };
//           }
//         ],
//         cacheProvider: cache
//         // fetch: customFetchImplementation,
//       }),
//     [cache]
//   );

//   console.log(cacheState);
//   return (
//     <cacheContext.Provider
//       value={{
//         cache,
//         client,
//         items: cacheState
//       }}
//     >
//       {children}
//     </cacheContext.Provider>
//   );
// };

// export { CacheProvider, cacheContext };

const client = axios.create({
  baseURL: API_URL,
  timeout: 1000
});

export { client }