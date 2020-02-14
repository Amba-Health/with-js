import test from 'ava';
import browserEnv from 'browser-env';
browserEnv();
import withJS, { SELECTOR } from '..';

test.beforeEach(() => {
  document.body.innerHTML = '';
});

// Serial tests because of the global `document` necessary
// for testing defaults (see https://github.com/avajs/ava/issues/560)
test.serial('it applies to all elements with the selector', t => {
  for (var i = 0; i < 2; i++) {
    document.body.appendChild(createTargetDiv());
  }
  withJS(SELECTOR);
  t.is(2, document.querySelectorAll('[role="presentation"]').length);
});

test.serial('it applies only to elements inside a given parent', t => {
  const parent = document.createElement('div');
  for (var i = 0; i < 2; i++) {
    parent.appendChild(createTargetDiv());
  }
  document.body.appendChild(parent);
  document.body.appendChild(createTargetDiv());
  withJS(SELECTOR, parent);
  t.is(2, document.querySelectorAll('[role="presentation"]').length);
});

test.serial('it defaults to [class*="js-with-js--"]', t => {
  for (var i = 0; i < 2; i++) {
    document.body.appendChild(createTargetDiv());
  }
  withJS();
  t.is(2, document.querySelectorAll('[role="presentation"]').length);
});

function createTargetDiv() {
  const el = document.createElement('div');
  el.classList.add('js-with-js--add-attribute__role--presentation');
  return el;
}
