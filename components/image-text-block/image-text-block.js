import rough from 'roughjs'

document.addEventListener('DOMContentLoaded', () => {
  const $roots = document.querySelectorAll('.image-text-block')

  $roots.forEach($root => {
    const $imgContainer = $root.querySelector('.image-text-block__image-container')
    const $svg = $imgContainer.querySelector('.image-text-block__image-container-svg')
    const { width, height } = $imgContainer.getBoundingClientRect();

    if ($svg) {
      const roughOptions = {
        roughness: 6,
        strokeWidth: 16,
        stroke: 'rgb(50,33,30)',
        hachureGap: 10
      }


      $svg.setAttribute('width', $imgContainer.offsetWidth)
      $svg.setAttribute('height', $imgContainer.offsetHeight)

      let roughSvg = rough.svg($svg);
      let rect = roughSvg.rectangle(0, 0, width, height, roughOptions);

      $svg.appendChild(rect);
    }
  })
})
