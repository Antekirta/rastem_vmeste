import {eventBus} from "../../shared/event-bus";
import {EVENT_CLOSE_MOBILE_MENU} from "../../shared/events";

document.addEventListener('DOMContentLoaded', () => {
  const $scrollableContainer = document.querySelector('.main-container__content')
  const $anchors = document.querySelectorAll('[data-scroll-anchor]');
  const $targets = document.querySelectorAll('[data-scroll-target]');

  const targetsOffsetsMap = {};

  $targets.forEach($target => {
    const key = $target.getAttribute('data-scroll-target')

    targetsOffsetsMap[key] = $target.offsetTop;
  })

  $anchors.forEach($anchor => {
    $anchor.addEventListener('click', (event) => {
      event.preventDefault();

      const anchor = $anchor.getAttribute('data-scroll-anchor');

      eventBus.emit(EVENT_CLOSE_MOBILE_MENU)

      $scrollableContainer.scrollTo({
        top: targetsOffsetsMap[anchor] - 50,
        behavior: 'smooth'
      })
    })
  })
})
