import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { formatCurrency, getCurrencySymbol } from '../lib/currency-utils';
import { formatCurrencyWithSeparators } from '../lib/math';

import { Span } from './Text';

/**
 * Shows a money amount with the currency.
 *
 * ⚠️ Abbreviated mode is only for English at the moment. Abbreviated amount will not be internationalized.
 */
const Currency = ({ formatWithSeparators, currency, precision, value, ...styles }) => {
  const intl = useIntl();
  if (precision === 'auto') {
    precision = value % 100 === 0 ? 0 : 2;
  } else if (precision < 2 && value < 100) {
    // Force precision if number is < $1 to never display $0 for small amounts
    precision = 2;
  }

  if (formatWithSeparators) {
    return (
      <Span {...styles} whiteSpace="nowrap">
        {getCurrencySymbol(currency)}
        {formatCurrencyWithSeparators(value / 100, intl.locale)}
      </Span>
    );
  } else {
    return (
      <Span {...styles} whiteSpace="nowrap">
        {formatCurrency(value, currency, { precision })}
      </Span>
    );
  }
};

Currency.propTypes = {
  /** The amount to display, in cents */
  value: PropTypes.number.isRequired,
  /** The currency (eg. `USD`, `EUR`...etc) */
  currency: PropTypes.string.isRequired,
  /** Format the currency value to display with separators such as 100,000 instead of 100000 */
  formatWithSeparators: PropTypes.bool,
  /** How many numbers should we display after the comma. When `auto` is given, decimals are only displayed if necessary. */
  precision: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  /** An optional set of props passed to the `Span` */
  style: PropTypes.object,
};

Currency.defaultProps = {
  formatWithSeparators: false,
  precision: 0,
};

export default Currency;
