const fiberTagMap = {
  3: 'HostRoot',
  6: 'HostText'
}

export function getDebugFiberName(fiber) {
  let rs
  switch (true) {
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