/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

'use strict';

import {join} from 'path';
import {cp, exec} from './util';

exec('babel', 'src', '--out-dir', 'dist');
cp('package.json', join('dist', 'package.json'));
