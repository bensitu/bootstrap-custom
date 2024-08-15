/*!
  * Bootstrap alert.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Alert = factory(global.jQuery, global.Util));
})(this, (function ($, Util) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME = 'alert';
  const VERSION = '4.6.2';
  const DATA_KEY = 'bs.alert';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  const CLASS_NAME_ALERT = 'alert';
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_SHOW = 'show';
  const EVENT_CLOSE = `close${EVENT_KEY}`;
  const EVENT_CLOSED = `closed${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const SELECTOR_DISMISS = '[data-dismiss="alert"]';

  /**
   * Class definition
   */

  class Alert {
    constructor(element) {
      this._element = element;
    }

    // Getters
    static get VERSION() {
      return VERSION;
    }

    // Public
    close(element) {
      let rootElement = this._element;
      if (element) {
        rootElement = this._getRootElement(element);
      }
      const customEvent = this._triggerCloseEvent(rootElement);
      if (customEvent.isDefaultPrevented()) {
        return;
      }
      this._removeElement(rootElement);
    }
    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      this._element = null;
    }

    // Private
    _getRootElement(element) {
      const selector = Util__default["default"].getSelectorFromElement(element);
      let parent = false;
      if (selector) {
        parent = document.querySelector(selector);
      }
      if (!parent) {
        parent = $__default["default"](element).closest(`.${CLASS_NAME_ALERT}`)[0];
      }
      return parent;
    }
    _triggerCloseEvent(element) {
      const closeEvent = $__default["default"].Event(EVENT_CLOSE);
      $__default["default"](element).trigger(closeEvent);
      return closeEvent;
    }
    _removeElement(element) {
      $__default["default"](element).removeClass(CLASS_NAME_SHOW);
      if (!$__default["default"](element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);
        return;
      }
      const transitionDuration = Util__default["default"].getTransitionDurationFromElement(element);
      $__default["default"](element).one(Util__default["default"].TRANSITION_END, event => this._destroyElement(element, event)).emulateTransitionEnd(transitionDuration);
    }
    _destroyElement(element) {
      $__default["default"](element).detach().trigger(EVENT_CLOSED).remove();
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $__default["default"](this);
        let data = $element.data(DATA_KEY);
        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }
        if (config === 'close') {
          data[config](this);
        }
      });
    }
    static _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }
        alertInstance.close(this);
      };
    }
  }

  /**
   * Data API implementation
   */

  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Alert._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Alert;
  $__default["default"].fn[NAME].noConflict = () => {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;

}));
//# sourceMappingURL=alert.js.map
