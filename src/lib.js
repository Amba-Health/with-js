// A hash of the available operations
export const AVAILABLE_OPERATIONS = {};

/**
 * Runs the given `updates` on the provided `element`.
 * A list of `availableOperations` can be provided as
 * @param {HTMLElement} element The element to update
 * @param {Array} updates The list of updates to perform, in the `[operationName, ...arguments]`
 * @param {Object} options.availableOperations The available operations
 */
export function run(
  updates,
  element,
  { availableOperations = AVAILABLE_OPERATIONS }
) {}

/**
 * Gets updates listed in the classes of given `element`
 * @param {HTMLElement} element
 * @returns {Array<Array>} An array of operations to perform
 */
export function getUpdatesFromClasses(elementOrClasses) {
  if (typeof elementOrClasses == 'string') {
    return getUpdatesFromClasses(elementOrClasses.split(' '));
  }

  return elementOrClasses
    .filter(c => /^js-with-js--.+/.test(c))
    .map(c => {
      const operationDescription = c.replace(/^js-with-js--/, '');
      const [operationName, argumentsDescription] = operationDescription.split(
        '__'
      );
      if (argumentsDescription) {
        const args = argumentsDescription.split('--');
        return [operationName, ...args];
      } else {
        return [operationName];
      }
    });
}
