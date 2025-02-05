import rough from 'roughjs'
import {eventBus} from "../../shared/event-bus";
import {EVENT_INIT_ACTIONS_BUTTONS, EVENT_SHOW_MODAL} from "../../shared/events";

const initializedSet = new Set();

document.addEventListener('DOMContentLoaded', initActionButtons)

eventBus.on(EVENT_INIT_ACTIONS_BUTTONS, initActionButtons)

const fillColors = {
  blue: 'rgb(149,172,173)',
  red: 'rgb(220,157,138)',
  whatsapp: 'rgb(44,183,66)',
  telegram: 'rgb(39,167,232)'
}

function initActionButtons() {
  const $roots = document.querySelectorAll('.action-button')

  $roots.forEach($root => {
    setTimeout(() => {
      if (!initializedSet.has($root)) {
        const $svg = $root.querySelector('svg')
        const { width, height } = $root.getBoundingClientRect();

        if ($svg && width && height) {
          initializedSet.add($root)

          const roughOptions = {
            roughness: 2,
            strokeWidth: 6,
            stroke: 'rgb(50,33,30)',
            fill: fillColors[ $root.getAttribute('data-rough-fill')] || fillColors.red,
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

      $root.addEventListener('click', () => {
        const dataModalId = $root.getAttribute('data-modal-id');

        eventBus.emit(EVENT_SHOW_MODAL, dataModalId)
      })
    }, 300)
  })
}
