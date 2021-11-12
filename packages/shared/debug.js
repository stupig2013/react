const fiberTagMap = {
  3: 'HostRoot',
  6: 'HostText'
}

export function getDebugFiberName(fiber) {
  let rs
  switch (typeof fiber.type) {
    case 'function':
      rs = fiber.type.name
      break
    case 'string':
      rs = fiber.type
      break
    default:
      rs = fiberTagMap[fiber.tag] || `WorkTag ${fiber.tag}`
  }
  return `<${rs}>`
}