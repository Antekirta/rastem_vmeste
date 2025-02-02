import {eventBus} from "../../shared/event-bus";
import {EVENT_SHOW_MODAL} from "../../shared/events";

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.querySelector('.contact-panel')

  setEventHandlers($root)
})

function setEventHandlers($root) {
  const $actionBtn = $root.querySelector('.contact-panel__action-button');

  $actionBtn.addEventListener('click', () => {
    const dataModalId = $actionBtn.getAttribute('data-modal-id');

    eventBus.emit(EVENT_SHOW_MODAL, dataModalId)
  })
}
