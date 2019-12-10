import test from 'ava';
import browserEnv from 'browser-env';
browserEnv();
import withJS from '..';

test('it adds attribute to the element', t => {
  const el = document.createElement('div');
  el.className = 'js-with-js--addAttribute__aria-hidden--true';
  withJS(el);
  t.deepEqual(el.getAttribute('aria-hidden'), 'true');
});

test('it removes attribute from the element', t => {
  const el = document.createElement('div');
  el.setAttribute('hidden', '');
  el.className = 'js-with-js--removeAttribute__hidden';
  withJS(el);
  t.is(el.getAttribute('hidden'), null);
});

test('it adds one or more classes', t => {
  const el = document.createElement('div');
  el.className = 'js-with-js--addClass__hide--fade';
  withJS(el);
  t.not(el.className.indexOf('hide'), -1);
  t.not(el.className.indexOf('fade'), -1);
});

test('it removes one or more classes', t => {
  const el = document.createElement('div');
  el.className = 'hide fade js-with-js--removeClass__hide--fade';
  withJS(el);
  t.false(el.classList.contains('hide'));
  t.false(el.classList.contains('fade'));
});
