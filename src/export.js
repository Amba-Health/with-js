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
