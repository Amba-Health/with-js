import test from 'ava';
import { getUpdatesFromClasses } from '../lib';

import browserEnv from 'browser-env';
browserEnv();

test('with no arguments', t => {
  t.deepEqual([['operation']], getUpdatesFromClasses('js-with-js--operation'));
});
test('with multiple classes', t => {
  t.deepEqual(
    [['operation1'], ['operation2']],
    getUpdatesFromClasses('js-with-js--operation1 js-with-js--operation2')
  );
});
test('with missing operation name', t => {
  t.deepEqual(
    [['operation1'], ['operation2']],
    getUpdatesFromClasses(
      'js-with-js--operation1 js-with-js-- js-with-js js-with-js--operation2'
    )
  );
});
test('with marker not starting class', t => {
  t.deepEqual(
    [['operation1'], ['operation2']],
    getUpdatesFromClasses(
      'js-with-js--operation1 some-js-with-js--class js-with-js--operation2'
    )
  );
});

test('with non marked classes', t => {
  t.deepEqual(
    [['operation1'], ['operation2']],
    getUpdatesFromClasses(
      'js-with-js--operation1 non-marked js-with-js--operation2'
    )
  );
});
test('with double spaces', t => {
  t.deepEqual(
    [['operation1'], ['operation2']],
    getUpdatesFromClasses(' js-with-js--operation1   js-with-js--operation2 ')
  );
});

test('with arguments', t => {
  t.deepEqual(
    [
      ['operation1', 'argument1'],
      ['operation2', 'argument1', 'argument2', 'argument3']
    ],
    getUpdatesFromClasses(
      'js-with-js--operation1__argument1 js-with-js--operation2__argument1--argument2--argument3'
    )
  );
});

test('with array', t => {
  t.deepEqual(
    [
      ['operation1', 'argument1'],
      ['operation2', 'argument1', 'argument2', 'argument3']
    ],
    getUpdatesFromClasses([
      'js-with-js--operation1__argument1',
      'js-with-js--operation2__argument1--argument2--argument3'
    ])
  );
});

test('with HTMLElement', t => {
  const el = document.createElement('a');
  el.className =
    'js-with-js--operation1__argument1 js-with-js--operation2__argument1--argument2--argument3';

  t.deepEqual(
    [
      ['operation1', 'argument1'],
      ['operation2', 'argument1', 'argument2', 'argument3']
    ],
    getUpdatesFromClasses(el)
  );
});
