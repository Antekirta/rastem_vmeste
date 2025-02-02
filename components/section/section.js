import rough from 'roughjs'


document.addEventListener('DOMContentLoaded', () => {
  const $roots = document.querySelectorAll('.section')

  $roots.forEach($root => {
    const $titleContent = $root.querySelector('.section__title-content')

    if ($titleContent) {
      const $svg = $titleContent.querySelector('.section__title-svg')
      const { width, height } = $titleContent.getBoundingClientRect();

      if ($svg) {
        const roughOptions = {
          roughness: 2,
          strokeWidth: 4,
          stroke: 'rgb(50,33,30)',
          hachureGap: 10000
        }

        $svg.setAttribute('width', $titleContent.offsetWidth)
        $svg.setAttribute('height', $titleContent.offsetHeight)

        let roughSvg = rough.svg($svg);
        let rect = roughSvg.rectangle(0, 0, width, height, roughOptions);

        $svg.appendChild(rect);
      }
    }
  })
})
