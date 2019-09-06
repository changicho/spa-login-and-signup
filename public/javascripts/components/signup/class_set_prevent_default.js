class class_set_prevent_default {
  constructor() {
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      };
    }, true);
  }
}

export default class_set_prevent_default;