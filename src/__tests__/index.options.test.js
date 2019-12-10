import test from 'ava';
import browserEnv from 'browser-env';
browserEnv();

test.beforeEach(() => {
  document.body.innerHTML = '';
});
test.todo('it allows the configuration of the available operations');
test.todo('it allows the configuration of the class prefix');
test.todo(
  'it allows the configuration of the separator between operations and arguments'
);
test.todo('it allows the configuration of the separator between arguments');
test.todo('it allows setting options after just the selector');
test.todo('it allows setting options after just the element');
test.todo('it allows setting options as sole parameters');
