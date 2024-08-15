/*!
  * Bootstrap popover.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./tooltip.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './tooltip'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Popover = factory(global.jQuery, global.Tooltip));
})(this, (function ($, Tooltip) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME = 'popover';
  const VERSION = '4.6.2';
  const DATA_KEY = 'bs.popover';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  const CLASS_PREFIX = 'bs-popover';
  const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_SHOW = 'show';
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  const Default = {
    ...Tooltip__default["default"].Default,
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  };
  const DefaultType = {
    ...Tooltip__default["default"].DefaultType,
    content: '(string|element|function)'
  };
  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    INSERTED: `inserted${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`,
    FOCUSIN: `focusin${EVENT_KEY}`,
    FOCUSOUT: `focusout${EVENT_KEY}`,
    MOUSEENTER: `mouseenter${EVENT_KEY}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY}`
  };

  /**
   * Class definition
   */

  class Popover extends Tooltip__default["default"] {
    // Getters
    static get VERSION() {
      return VERSION;
    }
    static get Default() {
      return Default;
    }
    static get NAME() {
      return NAME;
    }
    static get DATA_KEY() {
      return DATA_KEY;
    }
    static get Event() {
      return Event;
    }
    static get EVENT_KEY() {
      return EVENT_KEY;
    }
    static get DefaultType() {
      return DefaultType;
    }

    // Overrides
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    addAttachmentClass(attachment) {
      $__default["default"](this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`);
    }
    getTipElement() {
      this.tip = this.tip || $__default["default"](this.config.template)[0];
      return this.tip;
    }
    setContent() {
      const $tip = $__default["default"](this.getTipElement());

      // We use append for html objects to maintain js events
      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());
      let content = this._getContent();
      if (typeof content === 'function') {
        content = content.call(this.element);
      }
      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass(`${CLASS_NAME_FADE} ${CLASS_NAME_SHOW}`);
    }

    // Private
    _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    }
    _cleanTipClass() {
      const $tip = $__default["default"](this.getTipElement());
      const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY);
        const _config = typeof config === 'object' ? config : null;
        if (!data && /dispose|hide/.test(config)) {
          return;
        }
        if (!data) {
          data = new Popover(this, _config);
          $__default["default"](this).data(DATA_KEY, data);
        }
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }
          data[config]();
        }
      });
    }
  }

  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Popover._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Popover;
  $__default["default"].fn[NAME].noConflict = () => {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;

}));
//# sourceMappingURL=popover.js.map
