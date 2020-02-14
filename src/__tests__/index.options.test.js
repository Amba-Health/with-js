import test from 'ava';
import browserEnv from 'browser-env';
import withJS from '..';
browserEnv();

test.beforeEach(() => {
  document.body.innerHTML = '';
  document.body.appendChild(createDivThatWillHaveRoleButton());
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
test.serial.cb(
  'it allows the configuration of the function to get the updates',
  t => {
    withJS({
      getUpdates() {
        t.end();
        return [];
      }
    });
  }
);
test.serial.cb(
  'it allows the configuration of the function to apply the updates',
  t => {
    withJS({
      run() {
        t.end();
      }
    });
  }
);

function createDivThatWillHaveRoleButton() {
  const el = document.createElement('div');
  el.classList.add('js-with-js--addAttribute__role--button');
  return el;
}
