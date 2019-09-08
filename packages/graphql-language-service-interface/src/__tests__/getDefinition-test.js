/**
 *  Copyright (c) 2019 GraphQL Contributors
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 *  @flow
 */

import { parse } from 'graphql';
import {
  getDefinitionQueryResultForFragmentSpread,
  getDefinitionQueryResultForNamedType,
} from '../getDefinition';

describe('getDefinition', () => {
  describe('getDefinitionQueryResultForNamedType', () => {
    it('returns correct Position', async () => {
      const query = `type Query {
        hero(episode: Episode): Character
      }
      
      type Episode {
        id: ID!
      }
      `;
      const parsedQuery = parse(query);
      const namedTypeDefinition = parsedQuery.definitions[0].fields[0].type;

      const result = await getDefinitionQueryResultForNamedType(
        query,
        {
          ...namedTypeDefinition,
        },
        [
          {
            file: 'someFile',
            content: query,
            definition: {
              ...namedTypeDefinition,
            },
          },
        ],
      );
      expect(result.definitions.length).toEqual(1);
      expect(result.definitions[0].position.line).toEqual(1);
      expect(result.definitions[0].position.character).toEqual(32);
    });
  });

  describe('getDefinitionQueryResultForFragmentSpread', () => {
    it('returns correct Position', async () => {
      const query = `query A {
        ...Duck
      }`;
      const fragment = `# Fragment goes here
      fragment Duck on Duck {
        cuack
      }`;
      const fragmentSpread = parse(query).definitions[0].selectionSet
        .selections[0];
      const fragmentDefinition = parse(fragment).definitions[0];
      const result = await getDefinitionQueryResultForFragmentSpread(
        query,
        fragmentSpread,
        [
          {
            file: 'someFile',
            content: fragment,
            definition: fragmentDefinition,
          },
        ],
      );
      expect(result.definitions.length).toEqual(1);
      expect(result.definitions[0].position.line).toEqual(1);
      expect(result.definitions[0].position.character).toEqual(6);
    });
  });
});
