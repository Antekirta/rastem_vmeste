import Siema from 'siema'

[
  '#siema-image-text-block-1',
  '#siema-image-text-block-2',
  '#siema-image-text-block-3',
].forEach(selector => {
  new Siema({
    selector,
    loop: true
  })
})

export const setupSiena = (selector) => {
  return new Siema({
    selector,
    loop: true
  })
}
