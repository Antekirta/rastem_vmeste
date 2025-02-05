import {eventBus} from "../../shared/event-bus";
import {EVENT_SHOW_MODAL} from "../../shared/events";
import rough from "roughjs";

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.querySelector('.title-screen')

  drawWindows($root)

  setEventHandlers($root)
})

function drawWindows($root) {
  const $house = $root.querySelector('.title-screen__image-left');
  const $houseSvg = $root.querySelector('.title-screen__house-svg');

  if ($houseSvg) {
    const roughOptions = {
      roughness: 1,
      strokeWidth: 1,
      stroke: 'rgb(50,33,30)',
      fill: 'rgb(255,255,185)',
      fillStyle: 'zigzag',
      hachureGap: 1
    }

    $houseSvg.setAttribute('width', $house.offsetWidth)
    $houseSvg.setAttribute('height', $house.offsetHeight)

    let roughSvg = rough.svg($houseSvg);

    let windows = getWindows(roughSvg, roughOptions)

    append(windows, $houseSvg)

    setInterval(() => {
      remove(windows)

      roughSvg = rough.svg($houseSvg);

      windows = getWindows(roughSvg, roughOptions)

      append(windows, $houseSvg)
    }, 100)
  }
}

function append(windows, $houseSvg) {
  Object.values(windows).forEach(window => {
    Object.values(window).forEach(part => {
      $houseSvg.appendChild(part);
    })
  })
}

function remove(windows) {
  Object.values(windows).forEach(window => {
    Object.values(window).forEach(part => {
      part.remove()
    })
  })
}

function getWindows (roughSvg, roughOptions) {
  return {
    left: {
      topLeft: roughSvg.rectangle(126, 300, 24, 23, roughOptions),
      topRight: roughSvg.rectangle(152, 300, 24, 23, roughOptions),
      bottomLeft: roughSvg.rectangle(126, 325, 24, 23, roughOptions),
      bottomRight: roughSvg.rectangle(152, 325, 24, 23, roughOptions),
    },
    right: {
      topLeft: roughSvg.rectangle(238, 300, 24, 23, roughOptions),
      topRight: roughSvg.rectangle(264, 300, 24, 23, roughOptions),
      bottomLeft: roughSvg.rectangle(238, 325, 24, 23, roughOptions),
      bottomRight: roughSvg.rectangle(264, 325, 24, 23, roughOptions),
    }
  }
}

function setEventHandlers($root) {
  const $actionBtns = $root.querySelectorAll('.title-screen__action-button');

  $actionBtns.forEach($actionBtn => {
    $actionBtn.addEventListener('click', () => {
      const dataModalId = $actionBtn.getAttribute('data-modal-id');

      if (dataModalId) {
        eventBus.emit(EVENT_SHOW_MODAL, dataModalId)
      }
    })
  })
}
