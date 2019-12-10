import { run, getUpdatesFromClasses } from './lib';

export default function withJS(el) {
  return run(getUpdatesFromClasses(el), el);
}
