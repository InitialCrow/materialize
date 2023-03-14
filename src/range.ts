import { Component } from "./component";
import $, { Selector } from "cash-dom";
import anim from "animejs";

  let _defaults = {};

  export class Range extends Component {
    private _mousedown: boolean;
    private _handleRangeChangeBound: any;
    private _handleRangeMousedownTouchstartBound: any;
    private _handleRangeInputMousemoveTouchmoveBound: any;
    private _handleRangeMouseupTouchendBound: any;
    private _handleRangeBlurMouseoutTouchleaveBound: any;
    value: Selector;
    thumb: Selector;

    constructor(el, options) {
      super(Range, el, options);
      (this.el as any).M_Range = this;
      this.options = {...Range.defaults, ...options};
      this._mousedown = false;
      this._setupThumb();
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Range;
    }

    destroy() {
      this._removeEventHandlers();
      this._removeThumb();
      (this.el as any).M_Range = undefined;
    }

    _setupEventHandlers() {
      this._handleRangeChangeBound = this._handleRangeChange.bind(this);
      this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
      this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
      this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
      this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);
      this.el.addEventListener('change', this._handleRangeChangeBound);
      this.el.addEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
      this.el.addEventListener('touchstart', this._handleRangeMousedownTouchstartBound);
      this.el.addEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
      this.el.addEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
      this.el.addEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);
      this.el.addEventListener('mouseup', this._handleRangeMouseupTouchendBound);
      this.el.addEventListener('touchend', this._handleRangeMouseupTouchendBound);
      this.el.addEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
      this.el.addEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
      this.el.addEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
    }

    _removeEventHandlers() {
      this.el.removeEventListener('change', this._handleRangeChangeBound);
      this.el.removeEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
      this.el.removeEventListener('touchstart', this._handleRangeMousedownTouchstartBound);
      this.el.removeEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
      this.el.removeEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
      this.el.removeEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);
      this.el.removeEventListener('mouseup', this._handleRangeMouseupTouchendBound);
      this.el.removeEventListener('touchend', this._handleRangeMouseupTouchendBound);
      this.el.removeEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
      this.el.removeEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
      this.el.removeEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
    }

    _handleRangeChange() {
      $(this.value).html(this.$el.val());
      if (!$(this.thumb).hasClass('active')) {
        this._showRangeBubble();
      }
      let offsetLeft = this._calcRangeOffset();
      $(this.thumb)
        .addClass('active')
        .css('left', offsetLeft + 'px');
    }

    _handleRangeMousedownTouchstart(e) {
      // Set indicator value
      $(this.value).html(this.$el.val());
      this._mousedown = true;
      this.$el.addClass('active');
      if (!$(this.thumb).hasClass('active')) {
        this._showRangeBubble();
      }
      if (e.type !== 'input') {
        let offsetLeft = this._calcRangeOffset();
        $(this.thumb)
          .addClass('active')
          .css('left', offsetLeft + 'px');
      }
    }

    _handleRangeInputMousemoveTouchmove() {
      if (this._mousedown) {
        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }
        let offsetLeft = this._calcRangeOffset();
        $(this.thumb)
          .addClass('active')
          .css('left', offsetLeft + 'px');
        $(this.value).html(this.$el.val());
      }
    }

    _handleRangeMouseupTouchend() {
      this._mousedown = false;
      this.$el.removeClass('active');
    }

    _handleRangeBlurMouseoutTouchleave() {
      if (!this._mousedown) {
        let paddingLeft = parseInt(this.$el.css('padding-left'));
        let marginLeft = 7 + paddingLeft + 'px';
        if ($(this.thumb).hasClass('active')) {
          anim.remove(this.thumb);
          anim({
            targets: this.thumb,
            height: 0,
            width: 0,
            top: 10,
            easing: 'easeOutQuad',
            marginLeft: marginLeft,
            duration: 100
          });
        }
        $(this.thumb).removeClass('active');
      }
    }

    _setupThumb() {
      this.thumb = document.createElement('span');
      this.value = document.createElement('span');
      $(this.thumb).addClass('thumb');
      $(this.value).addClass('value');
      $(this.thumb).append(this.value);
      this.$el.after(this.thumb);
    }

    _removeThumb() {
      $(this.thumb).remove();
    }

    _showRangeBubble() {
      let paddingLeft = parseInt(
        $(this.thumb)
          .parent()
          .css('padding-left')
      );
      let marginLeft = -7 + paddingLeft + 'px'; // TODO: fix magic number?
      anim.remove(this.thumb);
      anim({
        targets: this.thumb,
        height: 30,
        width: 30,
        top: -30,
        marginLeft: marginLeft,
        duration: 300,
        easing: 'easeOutQuint'
      });
    }

    _calcRangeOffset(): number {
      let width = this.$el.width() - 15;
      let max = parseFloat(this.$el.attr('max')) || 100; // Range default max
      let min = parseFloat(this.$el.attr('min')) || 0; // Range default min
      let percent = (parseFloat(this.$el.val()) - min) / (max - min);
      return percent * width;
    }
  }

