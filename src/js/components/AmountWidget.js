import { select, settings } from '../settings.js';

class AmountWidget {
  constructor(element) {

    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.setValue(settings.amountWidget.defaultValue);
    thisWidget.initActions(element);
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
  }

  setValue(value) {
    const thisWidget = this;
    const newValue = parseInt(value);

    if (thisWidget.value !== newValue && !isNaN(newValue)) {
      thisWidget.value = newValue &&
        newValue >= parseInt(settings.amountWidget.defaultMin) &&
        newValue <= parseInt(settings.amountWidget.defaultMax);
    }
    thisWidget.value = newValue;
    thisWidget.input.value = thisWidget.value;
    thisWidget.announce();
  }
  initActions() {
    const thisWidget = this;

    thisWidget.input.addEventListener('change', (event) => {
      event.preventDefault();
      this.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', (event) => {
      event.preventDefault();
      this.setValue(thisWidget.value - 1);
    });
    thisWidget.linkIncrease.addEventListener('click', (event) => {
      event.preventDefault();
      this.setValue(thisWidget.value + 1);
    });
  }
  announce() {
    const thisWidget = this;

    const event = new Event('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;