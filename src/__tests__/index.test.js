import test from 'ava';
import browserEnv from 'browser-env';
browserEnv();
import { withJS } from '..';

test('it adds attribute to the element', t => {
  const el = document.createElement('div');
  el.className = 'js-with-js--add-attribute__aria-hidden--true';
  withJS(el);
  t.deepEqual(el.getAttribute('aria-hidden'), 'true');
});

test('it removes attribute from the element', t => {
  const el = document.createElement('div');
  el.setAttribute('hidden', '');
  el.className = 'js-with-js--remove-attribute__hidden';
  withJS(el);
  t.is(el.getAttribute('hidden'), null);
});

test('it adds one or more classes', t => {
  const el = document.createElement('div');
  el.className = 'js-with-js--add-class__hide--fade';
  withJS(el);
  t.not(el.className.indexOf('hide'), -1);
  t.not(el.className.indexOf('fade'), -1);
});

test('it removes one or more classes', t => {
  const el = document.createElement('div');
  el.className = 'hide fade js-with-js--remove-class__hide--fade';
  withJS(el);
  t.false(el.classList.contains('hide'));
  t.false(el.classList.contains('fade'));
});

test('it removes the element', t => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  el.className = 'js-with-js--remove';
  withJS(el);
  t.falsy(document.querySelector('div'));
});
