import {eventBus} from "../../shared/event-bus";
import {EVENT_CLOSE_MOBILE_MENU} from "../../shared/events";

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.querySelector('.main-menu-mobile')
  const $icon = $root.querySelector('.main-menu-mobile__icon')
  const $overlay = $root.querySelector('.main-menu-mobile__overlay')
  let isOpen = false

  $icon.addEventListener('click', openMenu)

  $overlay.addEventListener('click', closeMenu)

  eventBus.on(EVENT_CLOSE_MOBILE_MENU, closeMenu)

  function openMenu() {
    $root.classList.add('main-menu-mobile--open')
  }

  function closeMenu() {
    $root.classList.remove('main-menu-mobile--open')
  }
})
