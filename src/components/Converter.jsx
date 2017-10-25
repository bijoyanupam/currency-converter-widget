import React from 'react';
import fetch from 'isomorphic-fetch';

/**
 * Currency convertor component.
 */
class Converter extends React.Component {

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
     * React component on first render as react component lifecycle.
     */
    componentDidMount() {
        this.getRates(document.querySelector('#currency-from').value);
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
        if (document.querySelector('#currency-from').value ===
            document.querySelector('#currency-to').value) {
            check = true;
            this.setState({
                base: document.querySelector('#input-from').value,
                converted: document.querySelector('#input-from').value
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
            <div className='currency-converter'>
                <form>
                    <input type='text' id='input-from' onChange={this.convertCurrency.bind(this)} value={this.state.base} />
                    <select id='currency-from' onChange={this.changeConvertion.bind(this)}>
                        <option value="CAD">CAD</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <input type='text' id='input-to' label={this.state.conversion} onChange={this.convertCurrency.bind(this)} value={this.state.converted} />
                    <select id='currency-to' onChange={this.selectConversion.bind(this)}>
                        <option value="USD">USD</option>
                        <option value="CAD">CAD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </form>
            </div>
        );
    };
}

export default Converter;
