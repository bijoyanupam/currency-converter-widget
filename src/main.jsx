import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.jsx';

require('./Main.scss');
require.context('../assets', true, /^\.\//);
require('file-loader?name=[name].[ext]!../index.html');

ReactDOM.render(
    <CurrencyConverter />,
    document.getElementsByClassName('currency-converter-widget')[0]
);
