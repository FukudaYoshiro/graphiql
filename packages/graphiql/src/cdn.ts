/**
 *  Copyright (c) 2019 GraphQL Contributors.
 *
 *  This source code is licensed under the MIT license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import 'regenerator-runtime';

export default GraphiQL;
import { GraphiQL } from './components/GraphiQL';

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.GraphiQL = GraphiQL;
}
