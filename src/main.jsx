import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.jsx';

require('./Main.scss');

ReactDOM.render(
    <CurrencyConverter />,
    document.getElementsByClassName('currency-converter-widget')[0]
);
