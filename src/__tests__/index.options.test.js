import test from 'ava';
import browserEnv from 'browser-env';
import withJS, {
  getUpdatesFromClasses,
  applyUpdates,
  AVAILABLE_OPERATIONS
} from '..';
browserEnv();

test.beforeEach(() => {
  document.body.innerHTML = '';
  document.body.appendChild(createTargetDiv());
});

test.serial.cb('it allows setting options after the selector and parent', t => {
  withJS('div', document.documentElement, {
    run() {
      t.end();
    }
  });
});
test.serial.cb('it allows setting options after just the selector', t => {
  withJS('div', {
    run() {
      t.end();
    }
  });
});
test.serial.cb('it allows setting options after just the element', t => {
  withJS(document.querySelector('div'), {
    run() {
      t.end();
    }
  });
});
test.serial(
  'it allows the configuration of the function to get the updates',
  t => {
    document.querySelector('div').className =
      'js--add-attribute:role,presentation';
    withJS({
      updates(el) {
        return getUpdatesFromClasses(el, {
          marker: 'js--',
          operationToArgumentsSeparator: ':',
          argumentToArgumentSeparator: ','
        });
      },
      target: '[class*="js--"]'
    });
    t.is(1, document.querySelectorAll('[role="presentation"]').length);
  }
);
test.serial(
  'it allows the configuration of the function to apply the updates',
  t => {
    // We'll change the class to trigger a newly defined operation
    document.querySelector('div').className =
      'js-with-js--set-style__display--none';
    withJS({
      run(updates, element) {
        return applyUpdates(updates, element, {
          availableOperations: {
            ...AVAILABLE_OPERATIONS,
            'set-style': function(element, property, value) {
              element.style[property] = value;
            }
          }
        });
      }
    });
    // The new operation should have set the new operation
    t.is(1, document.querySelectorAll('[style]').length);
  }
);

function createTargetDiv() {
  const el = document.createElement('div');
  el.classList.add('js-with-js--add-attribute__role--presentation');
  return el;
}
