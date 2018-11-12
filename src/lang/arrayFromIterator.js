const arrayFromIterator = (iter) => {
  const list = []
  let next
  while (!(next = iter.next()).done) {
    list.push(next.value)
  }
  return list
}

export default arrayFromIterator
