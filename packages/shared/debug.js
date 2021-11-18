const fiberTagMap = {
  3: 'HostRoot',
  6: 'HostText'
}

const debugType = {
  reconciler: true,
  scheduler: true,
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
      case item.hasOwnProperty('containerInfo'): // FiberRoot
        rs = `<FiberRoot${item.containerInfo ? ` #${item.containerInfo.id}` : ''}>`
        break
      case item.hasOwnProperty('stateNode'): // Fiber
        const fiber = item
        const fiberName = typeof fiber.type === 'function' 
        ? fiber.type.name
        : typeof fiber.type === 'string'
          ? fiber.type
          : fiberTagMap[fiber.tag] || `WorkTag ${fiber.tag}`
        rs = `<${fiberName}>`
        break
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