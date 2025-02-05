import rough from 'roughjs'
import {eventBus} from "../../shared/event-bus";
import {EVENT_SHOW_MODAL} from "../../shared/events";

document.addEventListener('DOMContentLoaded', () => {
  const $roots = document.querySelectorAll('.service-item')

  $roots.forEach($root => {
    setTimeout(() => {
      drawFrame($root)
    }, 700)

    setEventHandlers($root)
  })
})

function setEventHandlers($root) {
  const $actionBtn = $root.querySelector('.service-item__action-button');

  $actionBtn.addEventListener('click', () => {
    const dataModalId = $actionBtn.getAttribute('data-modal-id');

    eventBus.emit(EVENT_SHOW_MODAL, dataModalId)
  })
}

function drawFrame($root) {
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
}
