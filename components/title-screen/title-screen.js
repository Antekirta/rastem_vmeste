import {eventBus} from "../../shared/event-bus";
import {EVENT_SHOW_MODAL} from "../../shared/events";

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.querySelector('.title-screen')

  setEventHandlers($root)
})

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
