/*!
  * Bootstrap scrollspy.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory(global.jQuery, global.Util));
})(this, (function ($, Util) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.6.2): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const NAME = 'scrollspy';
  const VERSION = '4.6.2';
  const DATA_KEY = 'bs.scrollspy';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE = 'active';
  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
  const EVENT_SCROLL = `scroll${EVENT_KEY}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
  const METHOD_OFFSET = 'offset';
  const METHOD_POSITION = 'position';
  const SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  const DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  /**
   * Class definition
   */

  class ScrollSpy {
    constructor(element, config) {
      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = `${this._config.target} ${SELECTOR_NAV_LINKS},` + `${this._config.target} ${SELECTOR_LIST_ITEMS},` + `${this._config.target} ${SELECTOR_DROPDOWN_ITEMS}`;
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default["default"](this._scrollElement).on(EVENT_SCROLL, event => this._process(event));
      this.refresh();
      this._process();
    }

    // Getters
    static get VERSION() {
      return VERSION;
    }
    static get Default() {
      return Default;
    }

    // Public
    refresh() {
      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      const targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(element => {
        let target;
        const targetSelector = Util__default["default"].getSelectorFromElement(element);
        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }
        if (target) {
          const targetBCR = target.getBoundingClientRect();
          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default["default"](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }
        return null;
      }).filter(Boolean).sort((a, b) => a[0] - b[0]).forEach(item => {
        this._offsets.push(item[0]);
        this._targets.push(item[1]);
      });
    }
    dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      $__default["default"](this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    }

    // Private
    _getConfig(config) {
      config = {
        ...Default,
        ...(typeof config === 'object' && config ? config : {})
      };
      if (typeof config.target !== 'string' && Util__default["default"].isElement(config.target)) {
        let id = $__default["default"](config.target).attr('id');
        if (!id) {
          id = Util__default["default"].getUID(NAME);
          $__default["default"](config.target).attr('id', id);
        }
        config.target = `#${id}`;
      }
      Util__default["default"].typeCheckConfig(NAME, config, DefaultType);
      return config;
    }
    _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }
    _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }
    _process() {
      const scrollTop = this._getScrollTop() + this._config.offset;
      const scrollHeight = this._getScrollHeight();
      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }
      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];
        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }
      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }
      for (let i = this._offsets.length; i--;) {
        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }
    _activate(target) {
      this._activeTarget = target;
      this._clear();
      const queries = this._selector.split(',').map(selector => `${selector}[data-target="${target}"],${selector}[href="${target}"]`);
      const $link = $__default["default"]([].slice.call(document.querySelectorAll(queries.join(','))));
      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE);
        $link.addClass(CLASS_NAME_ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE);
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(`${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).addClass(CLASS_NAME_ACTIVE);
        // Handle special case when .nav-link is inside .nav-item
        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE);
      }
      $__default["default"](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
    _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(node => node.classList.contains(CLASS_NAME_ACTIVE)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE));
    }

    // Static
    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default["default"](this).data(DATA_KEY);
        const _config = typeof config === 'object' && config;
        if (!data) {
          data = new ScrollSpy(this, _config);
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
   * Data API implementation
   */

  $__default["default"](window).on(EVENT_LOAD_DATA_API, () => {
    const scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    const scrollSpysLength = scrollSpys.length;
    for (let i = scrollSpysLength; i--;) {
      const $spy = $__default["default"](scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = ScrollSpy._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = ScrollSpy;
  $__default["default"].fn[NAME].noConflict = () => {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;

}));
//# sourceMappingURL=scrollspy.js.map
