const fiberTagMap = {
  3: 'HostRoot',
  6: 'HostText'
}

const debugType = {
  react: false,
  reconciler: true,
  scheduler: true,
  event: false
}

export function getDebugItemName(item) {
  let rs = ''
  if (item === null || item === undefined || typeof item === 'boolean') {
    rs = item
  } else if (typeof item === 'string' || typeof item === 'number') {
    rs = `<${typeof item}:${item}>`
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

      case item instanceof HTMLElement: { // HTMLElement
        rs = `<HTMLElement:${item.tagName.toLowerCase()}>`
        break
      }

      case item.hasOwnProperty('dispatchConfig'): { // SyntheticEvent
        rs = `<SyntheticEvent:${item.dispatchConfig.phasedRegistrationNames['bubbled']}>`
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