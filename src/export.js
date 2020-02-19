/**
 * A thin module to create a `default` export
 * of the `withJS` function and add the other
 * named exports to it, for bundling the IIFE
 * and CommonJS exports
 */

import {
  withJS,
  SELECTOR,
  AVAILABLE_OPERATIONS,
  applyUpdates,
  getUpdatesFromClasses
} from './index';

withJS.SELECTOR = SELECTOR;
withJS.AVAILABLE_OPERATIONS = AVAILABLE_OPERATIONS;
withJS.applyUpdates = applyUpdates;
withJS.getUpdatesFromClasses = getUpdatesFromClasses;
export default withJS;
