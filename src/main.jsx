import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.jsx';

require('./Main.scss');
require.context('../assets', true, /^\.\//);
require('file-loader?name=[name].[ext]!../index.html');

ReactDOM.render(
    <CurrencyConverter />,
    document.getElementById('widget1')
);

ReactDOM.render(
    <CurrencyConverter />,
    document.getElementById('widget2')
);

ReactDOM.render(
    <CurrencyConverter />,
    document.getElementById('widget3')
);
