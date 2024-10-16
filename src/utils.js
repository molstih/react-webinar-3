const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function pluralize({word, count, options = {}}) {
  var pluralize = new Intl.PluralRules('ru-Ru',{type: 'cardinal'})
  let { one, few, many } = options
  const ends = new Map([
    ['one', (one ? one : '')],
    ['few', (few ? few : 'а')],
    ['many', (many ? many : '')],
  ])

  const rule = pluralize.select(count)
  const end = ends.get(rule)
  return `${word}${end}`
}



