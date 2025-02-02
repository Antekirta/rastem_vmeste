import rough from 'roughjs'
import {eventBus} from "../../shared/event-bus";
import {EVENT_INIT_ACTIONS_BUTTONS} from "../../shared/events";

const initializedSet = new Set();

document.addEventListener('DOMContentLoaded', initActionButtons)

eventBus.on(EVENT_INIT_ACTIONS_BUTTONS, initActionButtons)

function initActionButtons() {
  console.log('initActionButtons!')

  const $roots = document.querySelectorAll('.action-button')

  $roots.forEach($root => {
    if (!initializedSet.has($root)) {
      const $svg = $root.querySelector('svg')
      const { width, height } = $root.getBoundingClientRect();

      if ($svg && width && height) {
        initializedSet.add($root)

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
    }
  })
}
