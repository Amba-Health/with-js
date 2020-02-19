/**
 * The default selector for looking up elements
 */
export const SELECTOR = '[class*="js-with-js--"]';

/**
 *  A wrapper for handling the different way of calling withJS:
 *  - withJS([options: Object])
 *  - withJS(target: HTMLElement,[options: Object])
 *  - withJS(target: string, [options: Object])
 *  - withJS(target: string, parent: HTMLElement, [options: Object])
 *  @see runWithJS for description of options
 */
export function withJS(...args) {
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
 * Runs the updates
 * @param {Object} options
 * @param {string | HTMLElement} [options.target='[class*="js-with-js--"]'] - The element to update, or a selector to lookup the elements to update
 * @param {HTMLElement} [options.parent=document] - If `target` is a selector, the element within which the lookup will happen
 * @param {Function} [options.updates = getUpdatesFromClasses] - The function for retrieving the updates on the element
 * @param {HTMLElement} [options.run=run] - The function for running the updates on the element
 */
function runWithJS({
  target = SELECTOR,
  parent = document,
  run = applyUpdates,
  updates = getUpdatesFromClasses
} = {}) {
  if (typeof target == 'string') {
    return [...parent.querySelectorAll(target)].forEach(el => {
      run(updates(el), el);
    });
  }
  return run(updates(target), target);
}

/**
 * A default list of available operations
 */
export const AVAILABLE_OPERATIONS = {
  remove(element) {
    element.parentElement.removeChild(element);
  },
  'add-attribute': function(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue);
  },
  'remove-attribute': function(element, attributeName) {
    element.removeAttribute(attributeName);
  },
  'add-class': function(element, ...classes) {
    classes.forEach(className => {
      element.classList.add(className);
    });
  },
  'remove-class': function(element, ...classes) {
    classes.forEach(className => {
      element.classList.remove(className);
    });
  }
};

/**
 * Appsier the given `updates` on the provided `element`.
 * A list of `availableOperations` can be provided as option
 * @param {Array} updates - The list of updates to perform, in the `[operationName, ...arguments]` format
 * @param {HTMLElement} element - The element to update
 * @param {Object} options
 * @param {Object} options.availableOperations An `operationName: function()` hash of the operations available to run
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
 *                    in the `[operationName, ...arguments]` format
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
    return getUpdatesFromClasses(elementOrClasses.split(' '), arguments[1]);
  }

  if (elementOrClasses instanceof window.HTMLElement) {
    return getUpdatesFromClasses([...elementOrClasses.classList], arguments[1]);
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
