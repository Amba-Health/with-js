export const SELECTOR = '[class*="js-with-js--"]';

/**
 *
 * @param {string|HTMLElement|Object} targetOrOptions
 * @param {HTMLElement|Object} parentOrOptions -
 * @param {Object} options
 */
export default function withJS(...args) {
  if (typeof args[0] == 'string') {
    // First argument is a CSS selector, we need to
    // check whether the second is an object or an
    if (args[1] instanceof HTMLElement) {
      runWithJS({
        target: args[0],
        parent: args[1],
        ...(args[2] || {})
      });
    } else {
      runWithJS({
        target: args[0],
        ...(args[1] || {})
      });
    }
  } else if (args[0] instanceof HTMLElement) {
    // First argument is the element on which to run withJS
    runWithJS({
      target: args[0],
      ...(args[1] || {})
    });
  } else {
    runWithJS({
      ...args[0]
    });
  }
}

/**
 * Actually runs the updates
 * @param {Object} options
 * @param {string | HTMLElement} [options.target='[class*="js-with-js--"]'] - The element to update, or a selector to lookup the elements to update
 * @param {HTMLElement} [options.parent=document] - If `target` is a selector, the element within which the lookup will happen
 * @param {Function} [options.getUpdates = getUpdatesFromClasses] - The function for retrieving the updates on the element
 * @param {HTMLElement} [options.run=run] - The function for running the updates on the element
 */
function runWithJS({
  target = SELECTOR,
  parent = document,
  run = applyUpdates,
  getUpdates = getUpdatesFromClasses
} = {}) {
  if (typeof target == 'string') {
    return [...parent.querySelectorAll(target)].forEach(el => {
      run(getUpdates(el), el);
    });
  }
  return run(getUpdates(target), target);
}

// A hash of the available operations
export const AVAILABLE_OPERATIONS = {
  remove(element) {
    element.parentElement.removeChild(element);
  },
  addAttribute(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue);
  },
  removeAttribute(element, attributeName) {
    element.removeAttribute(attributeName);
  },
  addClass(element, ...classes) {
    classes.forEach(className => {
      element.classList.add(className);
    });
  },
  removeClass(element, ...classes) {
    classes.forEach(className => {
      element.classList.remove(className);
    });
  }
};

/**
 * Runs the given `updates` on the provided `element`.
 * A list of `availableOperations` can be provided as option
 * @param {HTMLElement} element The element to update
 * @param {Array} updates The list of updates to perform, in the `[operationName, ...arguments]`
 * @param {Object} options.availableOperations The available operations
 */
export function applyUpdates(
  updates,
  element,
  { availableOperations = AVAILABLE_OPERATIONS } = {}
) {
  updates.forEach(([operationName, ...args]) => {
    if (availableOperations[operationName]) {
      availableOperations[operationName](element, ...args);
    }
  });
}

/**
 * Gets updates listed in the classes of given `element`
 * @param {HTMLElement|string|string[]} elementOrClasses - The element on which to read the classes, a `className` string or directly an Array of strings
 * @returns {Array[]} An array of operations to perform,
 *                    each as an array with the operation name as first element,
 *                    and the arguments (if any) as following elements
 */
export function getUpdatesFromClasses(
  elementOrClasses,
  {
    marker = 'js-with-js--',
    operationToArgumentsSeparator = '__',
    argumentToArgumentSeparator = '--'
  } = {}
) {
  if (typeof elementOrClasses == 'string') {
    return getUpdatesFromClasses(elementOrClasses.split(' '));
  }

  if (elementOrClasses instanceof window.HTMLElement) {
    return getUpdatesFromClasses([...elementOrClasses.classList]);
  }

  return elementOrClasses
    .filter(c => new RegExp(`^${marker}.+`).test(c))
    .map(c => {
      const operationDescription = c.replace(new RegExp(`^${marker}`), '');
      const [operationName, argumentsDescription] = operationDescription.split(
        operationToArgumentsSeparator
      );
      if (argumentsDescription) {
        const args = argumentsDescription.split(argumentToArgumentSeparator);
        return [operationName, ...args];
      } else {
        return [operationName];
      }
    });
}
