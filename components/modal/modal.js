import { eventBus } from "../../shared/event-bus";
import {EVENT_HIDE_MODAL, EVENT_INIT_ACTIONS_BUTTONS, EVENT_SHOW_MODAL} from "../../shared/events";
import {
  MODAL_CLUB,
  MODAL_CONTACTS,
  MODAL_COWORKING,
  MODAL_GROUP_CLASS, MODAL_MASTER_CLASS,
  MODAL_PLAYROOM,
  MODAL_WAITING_AREA
} from "../../shared/modals";
import {setupSiena} from "../siema/siema";

let openModalId;

document.addEventListener('DOMContentLoaded', () => {
  const classes = {
    visible: 'modal--visible'
  };

  const modals = {
    [MODAL_GROUP_CLASS]: document.getElementById(MODAL_GROUP_CLASS),
    [MODAL_PLAYROOM]: document.getElementById(MODAL_PLAYROOM),
    [MODAL_COWORKING]: document.getElementById(MODAL_COWORKING),
    [MODAL_WAITING_AREA]: document.getElementById(MODAL_WAITING_AREA),
    [MODAL_CLUB]: document.getElementById(MODAL_CLUB),
    [MODAL_MASTER_CLASS]: document.getElementById(MODAL_MASTER_CLASS),
    [MODAL_CONTACTS]: document.getElementById(MODAL_CONTACTS),
  };

  const closeModalHandlerMap = {};  // To keep track of handlers for each modal
  const siemaModalMap = {};  // To keep track of handlers for each modal

  eventBus.on(EVENT_SHOW_MODAL, (modalId) => {
    if (modalId) {
      // close previous modal
      eventBus.emit(EVENT_HIDE_MODAL, openModalId);

      openModalId = modalId;

      const $modal = modals[modalId];
      $modal.classList.add(classes.visible);

      const $cross = $modal.querySelector('.modal__window-cross');
      const $overlay = $modal.querySelector('.modal__overlay');

      // Define the handler function
      const closeHandler = () => {
        eventBus.emit(EVENT_HIDE_MODAL, modalId);
      };

      // Store the handler to remove it later
      closeModalHandlerMap[modalId] = closeHandler;

      // Add the event listener
      $cross.addEventListener('click', closeHandler);
      $overlay.addEventListener('click', closeHandler);

      switch (modalId) {
        case MODAL_GROUP_CLASS:
          if (!siemaModalMap[modalId]) {
            siemaModalMap[modalId] = setupSiena('#siema-group-class-modal')
          }
          break;
      }

      eventBus.emit(EVENT_INIT_ACTIONS_BUTTONS)
    }
  });

  eventBus.on(EVENT_HIDE_MODAL, (modalId) => {
    if (modalId) {
      const $modal = modals[modalId];
      $modal.classList.remove(classes.visible);

      const $cross = $modal.querySelector('.modal__window-cross');

      // Remove the event listener using the stored handler
      if (closeModalHandlerMap[modalId]) {
        $cross.removeEventListener('click', closeModalHandlerMap[modalId]);

        delete closeModalHandlerMap[modalId];  // Clean up the handler
      }
    }
  });
});
