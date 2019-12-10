import { run, getUpdatesFromClasses } from './lib';

export const SELECTOR = '[class*="js-with-js--"]';

export default function withJS(
  elementOrSelector = SELECTOR,
  parent = document
) {
  if (typeof elementOrSelector == 'string') {
    return [...parent.querySelectorAll(elementOrSelector)].forEach(el => {
      run(getUpdatesFromClasses(el), el);
    });
  }
  return run(getUpdatesFromClasses(elementOrSelector), elementOrSelector);
}
