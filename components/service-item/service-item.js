import rough from 'roughjs'

document.addEventListener('DOMContentLoaded', () => {
  const $roots = document.querySelectorAll('.service-item')

  $roots.forEach($root => {
    const $svg = $root.querySelector('.service-item__svg')
    const { width, height } = $root.getBoundingClientRect();

    if ($svg) {
      const roughOptions = {
        roughness: 2,
        strokeWidth: 4,
        stroke: 'rgb(50,33,30)',
        hachureGap: 10000
      }

      $svg.setAttribute('width', $root.offsetWidth)
      $svg.setAttribute('height', $root.offsetHeight)

      let roughSvg = rough.svg($svg);
      let rect = roughSvg.rectangle(0, 0, width, height, roughOptions);

      $svg.appendChild(rect);
    }
  })
})
