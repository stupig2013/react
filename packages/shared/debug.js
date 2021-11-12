const fiberTagMap = {
  3: 'HostRoot',
  6: 'HostText'
}

export function getDebugFiberName(fiber) {
  switch (typeof fiber.type) {
    case 'function':
      return fiber.type.name
    case 'string':
      return fiber.type
    default:
      return fiberTagMap[fiber.tag] || `WorkTag ${fiber.tag}`
  }
}