(function () {
  "use strict";

  /**
   * Handle the display updates for the pricing component.
   */
  const PriceComponent = {
    elPageViewSlider: document.querySelector("#slider-control"),
    elPageViewCount: document.querySelector("#pageview-count"),
    elPrice: document.querySelector("#price"),
    elBillingPeriodToggle: document.querySelector("#billing-switch"),
    elPricePeriodText: document.querySelector("#pricing-period"),
    yearlyBillingDiscount: 0.25,
    priceIntervalIndex: 0,
    priceIntervals: [
      { pageViews: "10K", monthlyPrice: 8 },
      { pageViews: "50K", monthlyPrice: 12 },
      { pageViews: "100K", monthlyPrice: 16 },
      { pageViews: "500K", monthlyPrice: 24 },
      { pageViews: "1M", monthlyPrice: 36 },
    ],

    /**
     * Setup the initial state and register event handlers.
     */
    init: function () {
      this.updateView(this.priceIntervals[0]);

      this.elBillingPeriodToggle.addEventListener(
        "input",
        this.handleBillingPeriodToggle.bind(this)
      );

      this.elPageViewSlider.addEventListener(
        "input",
        this.handlePageViewSlider.bind(this)
      );
    },

    /**
     * Update the display as events occur.
     *
     * @param   {object}  params  The values to set in the display.
     */
    updateView: function (params) {
      this.elPageViewCount.textContent = params.pageViews;

      if (this.elBillingPeriodToggle.checked) {
        this.elPricePeriodText.textContent = "year";
        this.elPrice.textContent = this.getDiscountPrice(params.monthlyPrice);
      } else {
        this.elPricePeriodText.textContent = "month";
        this.elPrice.textContent = this.formatPrice(params.monthlyPrice);
      }
    },

    /**
     * Trigger display updates based on the change in the Page View Slider.
     */
    handlePageViewSlider: function () {
      switch (this.elPageViewSlider.value) {
        case "0":
          this.priceIntervalIndex = 0;
          break;
        case "1":
          this.priceIntervalIndex = 1;
          break;
        case "2":
          this.priceIntervalIndex = 2;
          break;
        case "3":
          this.priceIntervalIndex = 3;
          break;
        case "4":
          this.priceIntervalIndex = 4;
          break;
      }

      this.updateView(this.priceIntervals[this.priceIntervalIndex]);
      this.elPageViewSlider.style = this.generateBackground();
    },

    /**
     * Trigger display updates based on the state of the Billing period toggle.
     */
    handleBillingPeriodToggle: function () {
      this.updateView(this.priceIntervals[this.priceIntervalIndex]);
    },

    /**
     * Calculate the yearly price with discount.
     *
     * @param   {Number}  price  The price used as the basis for the calculation.
     *
     * @return  {Intl.NumberFormat} A currency formatted discounted yearly price.
     */
    getDiscountPrice: function (price) {
      const yearlyPrice = price * 12;
      const discountPrice =
        yearlyPrice - this.yearlyBillingDiscount * yearlyPrice;

      return this.formatPrice(discountPrice);
    },

    /**
     * Format a price as a dollar amount.
     *
     * @param   {Number}  value  The price to format.
     *
     * @return  {Intl.NumberFormat} A currency formatted price.
     */
    formatPrice: function (value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },

    /**
     * Webkit browsers don't allow formatting the progress of the range element
     * with CSS. This function generates a linear gradient that's applied to
     * simulate the progress portion of the range element.
     *
     * @return  {String}  A style declaration.
     */
    generateBackground: function () {
      if (
        parseFloat(this.elPageViewSlider.value) ===
        parseFloat(this.elPageViewSlider.min)
      ) {
        return;
      }

      let percentage =
        ((parseFloat(this.elPageViewSlider.value) -
          parseFloat(this.elPageViewSlider.min)) /
          (parseFloat(this.elPageViewSlider.max) -
            parseFloat(this.elPageViewSlider.min))) *
        100;

      return `background: linear-gradient(to right, #a4f3eb, #a4f3eb ${percentage}%, #ecf0fb ${percentage}%, #ecf0fb 100%)`;
    },
  };

  PriceComponent.init();
})();
