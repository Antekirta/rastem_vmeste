import rough from 'roughjs'

document.addEventListener('DOMContentLoaded', () => {
  const $roots = document.querySelectorAll('.action-button')

  $roots.forEach($root => {
    const $svg = $root.querySelector('svg')
    const { width, height } = $root.getBoundingClientRect();

    if ($svg) {
      const roughOptions = {
        roughness: 2,
        strokeWidth: 6,
        stroke: 'rgb(50,33,30)',
        fill: $root.getAttribute('data-rough-fill') === 'blue' ? 'rgb(149,172,173)' : 'rgb(220,157,138)',
        fillStyle: $root.getAttribute('data-rough-fill-style') || 'zigzag',
        hachureGap: 10
      }

      $svg.setAttribute('width', $root.offsetWidth)
      $svg.setAttribute('height', $root.offsetHeight)

      let roughSvg = rough.svg($svg);
      let rect = roughSvg.rectangle(0, 0, width, height, roughOptions);

      $svg.appendChild(rect);

      if ($root.getAttribute('data-rough-animated')) {
        setInterval(() => {
          rect.remove();

          roughSvg = rough.svg($svg);

          rect = roughSvg.rectangle(0, 0, width, height, roughOptions);

          $svg.appendChild(rect);
        }, 300)
      }
    }
  })
})
