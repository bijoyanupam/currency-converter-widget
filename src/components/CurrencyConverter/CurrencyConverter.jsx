import React from 'react';
import fetch from 'isomorphic-fetch';

require('./CurrencyConverter.scss');

/**
 * Currency convertor component.
 */
class CurrencyConverter extends React.Component {

    /**
     * constructor
     */
    constructor() {
        super();

        this.state = {
            'rates': {},
            'conversion': 'USD',
            'base': 0,
            'converted': 0
        };
    };

    /**
     * React component on first render as react component lifecycle.
     */
    componentDidMount() {
        this.getRates(this.refs.currencyFrom.value);
    };

    /**
     * Fetch currency exchange data from fixer.io API.
     *
     * @param {string} currency Currency value as base for API.
     *
     * @returns {void}
     */
    getRates(currency) {
        var url = 'http://api.fixer.io/latest?base=' + currency;

        fetch(url)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then((data) => {
                this.setState({
                    'rates': data.rates
                });
                this.convertCurrency();
            });
    };

    /**
     * Select conversion.
     *
     * @param {SyntheticEvent} e Event object.
     *
     * @returns {void}
     */
    selectConversion(e) {
        this.setState({
            'conversion': e.target.value
        }, () => {
            this.convertCurrency();
        });
    };

    /**
     * Change base conversion.
     *
     * @param {SyntheticEvent} e Event object.
     *
     * @returns {void}
     */
    changeConvertion(e) {
        this.getRates(e.target.value);
    };

    /**
     * Convert currency.
     *
     * @param {SyntheticEvent} e Event object.
     *
     * @returns {void}
     */
    convertCurrency(e) {
        let val = this.state.base;

        if (this.isSameCurrency()) {
            return;
        }

        if (e && e.target) {
            val = e.target.value;
        }
        const rate = this.state.rates[this.state.conversion];

        this.setState({
            base: val,
            converted: (parseInt(val) || 0) * rate
        });
    };

    /**
     * Check if same curency selector.
     *
     * @returns {boolean} Is same currency selector
     */
    isSameCurrency() {
        let check = false;
        if (this.refs.currencyFrom.value === this.refs.currencyTo.value) {
            check = true;
            this.setState({
                base: this.refs.inputFrom.value,
                converted: this.refs.inputFrom.value
            });
        }
        return check;
    };

    /**
     * render
     * @returns {ReactElement} markup
     */
    render() {
        return (
            <div class="slds-panel">
                <div class="slds-panel__section">
                    <h1 class="slds-text-heading_small slds-m-bottom_medium">Currency converter</h1>
                    <form>
                        <label className="slds-item_label">Type in amount and select currency:</label>
                        <div className="slds-grid slds-wrap slds-m-bottom_small">
                            <div className="slds-size_8-of-12 slds-form-element">
                                <div className="slds-form-element__control">
                                    <input type="text" ref="inputFrom" className="slds-input" onChange={this.convertCurrency.bind(this)} value={this.state.base} />
                                </div>
                            </div>
                            <div className="slds-size_4-of-12 slds-p-left_small slds-form-element">
                                <div className="slds-form-element__control">
                                    <div className="slds-select_container">
                                        <select ref="currencyFrom" className="slds-select" onChange={this.changeConvertion.bind(this)}>
                                            <option value="CAD">CAD</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="slds-item_label">Converted amount:</label>
                        <div className="slds-grid slds-wrap">
                            <div className="slds-size_8-of-12 slds-form-element">
                                <div className="slds-form-element__control">
                                    <input type="text" ref="inputTo" className="slds-input" readOnly label={this.state.conversion} onChange={this.convertCurrency.bind(this)} value={this.state.converted} />
                                </div>
                            </div>
                            <div className="slds-size_4-of-12 slds-p-left_small slds-form-element">
                                <div className="slds-form-element__control">
                                    <div className="slds-select_container">
                                        <select ref='currencyTo' className="slds-select" onChange={this.selectConversion.bind(this)}>
                                            <option value="USD">USD</option>
                                            <option value="CAD">CAD</option>
                                            <option value="EUR">EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default CurrencyConverter;
