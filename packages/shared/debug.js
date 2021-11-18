const fiberTagMap = {
  3: 'HostRoot',
  6: 'HostText'
}

const debugType = {
  react: false,
  reconciler: true,
  scheduler: false,
  event: false
}

export function getDebugFiberName(fiber) {
  let rs
  switch (true) {
    case fiber === undefined || fiber === null:
      rs = fiber
      break
    case typeof fiber.type === 'function':
      rs = fiber.type.name
      break
    case typeof fiber.type === 'string':
      rs = fiber.type
      break
    case fiber.containerInfo !== undefined:
      rs = `FiberRoot #${fiber.containerInfo.id}`
      break
    default:
      rs = fiberTagMap[fiber.tag] || `WorkTag ${fiber.tag}`
  }
  return `<${rs}>`
}

export function getDebugItemName(item) {
  let rs = ''
  if (item === null || item === undefined) {
    rs = item
  } else if (typeof item === 'object') {
    switch (true) {
      case item.hasOwnProperty('containerInfo'): { // FiberRoot
        rs = `<FiberRoot${item.containerInfo ? ` #${item.containerInfo.id}` : ''}>`
        break
      }

      case item.hasOwnProperty('stateNode'): { // Fiber
        const name = typeof item.type === 'function' 
        ? item.type.name
        : typeof item.type === 'string'
          ? item.type
          : fiberTagMap[item.tag] || `WorkTag ${item.tag}`
        rs = `<${name}>`
        break
      }

      case item.hasOwnProperty('$$typeof'): { // ReactElement
        const name = typeof item.type === 'function' 
        ? item.type.name
        : typeof item.type === 'string'
          ? item.type
          : fiberTagMap[item.tag] || `WorkTag ${item.tag}`
        rs = `<ReactElement:${name}>`
        break
      }

      case item instanceof HTMLElement: {
        rs = `<HTMLElement:${item.tagName.toLowerCase()}>`
        break
      }
    }
  }

  return rs
}

export function debug(type, item, str, ...args) {
  if (type !== undefined && !debugType[type]) {
    return []
  }

  let finalItemName = getDebugItemName(item)
  if (finalItemName === undefined) {
    finalItemName = `[${type}]`
  }
  // console.log([`${finalItemName} ${str}`, ...args])
  return [`${finalItemName} ${str}`, ...args]
}

Object.keys(debugType).forEach(type => {
  debug[type] = function(...args) {
    return debug.call(null, type, ...args)
  }
})