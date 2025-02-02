import rough from 'roughjs'

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.querySelector('.main-menu')
  const $items = $root.querySelectorAll('.main-menu__item')

  $items.forEach($item => {
    const $svg = $item.querySelector('.main-menu__item-svg')
    const { width, height } = $item.getBoundingClientRect();

    if ($svg) {
      const roughOptions = {
        roughness: 2,
        strokeWidth: 6,
        stroke: 'rgb(50,33,30)',
        fill: 'rgb(149,172,173)',
        fillStyle:  'solid',
        hachureGap: 10
      }

      $svg.setAttribute('width', $item.offsetWidth)
      $svg.setAttribute('height', $item.offsetHeight)

      let roughSvg, rect;

      $item.addEventListener('mouseenter', () => {
        roughSvg = rough.svg($svg);
        rect = roughSvg.rectangle(0, 0, width, height, roughOptions);

        $svg.appendChild(rect);
      })

      $item.addEventListener('mouseleave', () => {
        if (rect) {
          rect.remove()
        }
      })
    }
  })
})
