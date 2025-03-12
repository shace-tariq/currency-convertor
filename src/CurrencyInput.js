import React from 'react'
import PropTypes from 'prop-types'
import './currencyInput.css'
export default function currencyInput(props) {
  return (
    <div className='group'>
      <input type='text' value={props.amount} onChange={ev =>props.onAmountChange(ev.target.value)}></input>
      <select value={props.currency} onChange={ev =>props.onCurrencyChange(ev.target.value)}>
        {props.currencies.map(currency => (<option value={currency}>{currency}</option>
        ))}
      </select>

    </div>
  )
}
currencyInput.prototypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func
  };