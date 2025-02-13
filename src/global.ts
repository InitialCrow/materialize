import { Autocomplete } from './autocomplete';
import { FloatingActionButton } from './buttons';
import { Cards } from './cards';
import { Carousel } from './carousel';
import { CharacterCounter } from './characterCounter';
import { Chips } from './chips';
import { Collapsible } from './collapsible';
import { Datepicker } from './datepicker';
import { Dropdown } from './dropdown';
import { Forms } from './forms';
import { Materialbox } from './materialbox';
import { Modal } from './modal';
import { Parallax } from './parallax';
import { Pushpin } from './pushpin';
import { ScrollSpy } from './scrollspy';
import { FormSelect } from './select';
import { Sidenav } from './sidenav';
import { Slider } from './slider';
import { Tabs } from './tabs';
import { TapTarget } from './tapTarget';
import { Timepicker } from './timepicker';
import { Toast, ToastOptions } from './toasts';
import { Tooltip } from './tooltip';
import { Waves } from './waves';
import { Range } from './range';
import { Utils } from './utils';

export class M {
  static version = '2.0.2-alpha';

  static Autocomplete: typeof Autocomplete = Autocomplete;
  static Tabs: typeof Tabs = Tabs;
  static Carousel: typeof Carousel = Carousel;
  static Dropdown: typeof Dropdown = Dropdown;
  static FloatingActionButton: typeof FloatingActionButton = FloatingActionButton;
  static Chips: typeof Chips = Chips;
  static Collapsible: typeof Collapsible = Collapsible;
  static Datepicker: typeof Datepicker = Datepicker;
  static CharacterCounter: typeof CharacterCounter = CharacterCounter;
  static Forms: typeof Forms = Forms;
  static FormSelect: typeof FormSelect = FormSelect;
  static Modal: typeof Modal = Modal;
  static Pushpin: typeof Pushpin = Pushpin;
  static Materialbox: typeof Materialbox = Materialbox;
  static Parallax: typeof Parallax = Parallax;
  static Slider: typeof Slider = Slider;
  static Timepicker: typeof Timepicker = Timepicker;
  /** Creates a toast. */
  static toast: (opt: ToastOptions) => Toast = (opt) => new Toast(opt) ;
  static Tooltip: typeof Tooltip = Tooltip;
  static Sidenav: typeof Sidenav = Sidenav;
  static TapTarget: typeof TapTarget = TapTarget;
  static ScrollSpy: typeof ScrollSpy = ScrollSpy;
  static Range: typeof Range = Range;
  static Waves: typeof Waves = Waves;
  static Utils: typeof Utils = Utils;

  static {
    document.addEventListener('keydown', Utils.docHandleKeydown, true);
    document.addEventListener('keyup', Utils.docHandleKeyup, true);
    document.addEventListener('focus', Utils.docHandleFocus, true);
    document.addEventListener('blur', Utils.docHandleBlur, true);
    Cards.Init();
    Forms.Init();
    Chips.Init();
    Waves.Init();
    Range.Init();
  }

  /**
   * Automatically initialize components.
   * @param context Root element to initialize. Defaults to `document.body`.
   */
  static AutoInit(context: HTMLElement = document.body) {
    let registry = {
      Autocomplete: <NodeListOf<HTMLElement>>context.querySelectorAll('.autocomplete:not(.no-autoinit)'),
      Carousel: <NodeListOf<HTMLElement>>context.querySelectorAll('.carousel:not(.no-autoinit)'),
      Chips: <NodeListOf<HTMLElement>>context.querySelectorAll('.chips:not(.no-autoinit)'),
      Collapsible: <NodeListOf<HTMLElement>>context.querySelectorAll('.collapsible:not(.no-autoinit)'),
      Datepicker: <NodeListOf<HTMLElement>>context.querySelectorAll('.datepicker:not(.no-autoinit)'),
      Dropdown: <NodeListOf<HTMLElement>>context.querySelectorAll('.dropdown-trigger:not(.no-autoinit)'),
      Materialbox: <NodeListOf<HTMLElement>>context.querySelectorAll('.materialboxed:not(.no-autoinit)'),
      Modal: <NodeListOf<HTMLElement>>context.querySelectorAll('.modal:not(.no-autoinit)'),
      Parallax: <NodeListOf<HTMLElement>>context.querySelectorAll('.parallax:not(.no-autoinit)'),
      Pushpin: <NodeListOf<HTMLElement>>context.querySelectorAll('.pushpin:not(.no-autoinit)'),
      ScrollSpy: <NodeListOf<HTMLElement>>context.querySelectorAll('.scrollspy:not(.no-autoinit)'),
      FormSelect: <NodeListOf<HTMLElement>>context.querySelectorAll('select:not(.no-autoinit)'),
      Sidenav: <NodeListOf<HTMLElement>>context.querySelectorAll('.sidenav:not(.no-autoinit)'),
      Tabs: <NodeListOf<HTMLElement>>context.querySelectorAll('.tabs:not(.no-autoinit)'),
      TapTarget: <NodeListOf<HTMLElement>>context.querySelectorAll('.tap-target:not(.no-autoinit)'),
      Timepicker: <NodeListOf<HTMLElement>>context.querySelectorAll('.timepicker:not(.no-autoinit)'),
      Tooltip: <NodeListOf<HTMLElement>>context.querySelectorAll('.tooltipped:not(.no-autoinit)'),
      FloatingActionButton: <NodeListOf<HTMLElement>>context.querySelectorAll('.fixed-action-btn:not(.no-autoinit)'),
    };
    M.Autocomplete.init(registry.Autocomplete, {});
    M.Carousel.init(registry.Carousel, {});
    M.Chips.init(registry.Chips, {});
    M.Collapsible.init(registry.Collapsible, {});
    M.Datepicker.init(registry.Datepicker, {});
    M.Dropdown.init(registry.Dropdown, {});
    M.Materialbox.init(registry.Materialbox, {});
    M.Modal.init(registry.Modal, {});
    M.Parallax.init(registry.Parallax, {});
    M.Pushpin.init(registry.Pushpin, {});
    M.ScrollSpy.init(registry.ScrollSpy, {});
    M.FormSelect.init(registry.FormSelect, {});
    M.Sidenav.init(registry.Sidenav, {});
    M.Tabs.init(registry.Tabs, {});
    M.TapTarget.init(registry.TapTarget, {});
    M.Timepicker.init(registry.Timepicker, {});
    M.Tooltip.init(registry.Tooltip, {});
    M.FloatingActionButton.init(registry.FloatingActionButton, {});
  }
}

export default M;