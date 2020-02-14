import test from 'ava';
import { getUpdatesFromClasses } from '..';

import browserEnv from 'browser-env';
browserEnv();

const EXPECTED_UPDATES = [
  ['operation1', 'argument1'],
  ['operation2', 'argument1', 'argument2', 'argument3'],
  ['operation3']
];

const CLASSES = [
  // Triggers a leading space when turned into string
  '',
  // One argument
  'js-with-js--operation1__argument1',
  // Triggers multiple spaces when turned into string
  '  ',
  // Marker not at the start
  'some-js-with-js--operation',
  // Marker without operation
  'js-with-js--',
  // Multiple arguments
  'js-with-js--operation2__argument1--argument2--argument3',
  // No arguments
  'js-with-js--operation3',
  // Triggers a trailing space  when turned into string
  ' '
];

test('with array', testGetUpdatesFromClass, CLASSES);

test('with string', testGetUpdatesFromClass, CLASSES.join(' '));

test(
  'with HTMLElement',
  testGetUpdatesFromClass,
  (() => {
    const el = document.createElement('a');
    el.className = CLASSES.join(' ');
    return el;
  })()
);

function testGetUpdatesFromClass(t, input, expected = EXPECTED_UPDATES) {
  t.deepEqual(expected, getUpdatesFromClasses(input));
}
