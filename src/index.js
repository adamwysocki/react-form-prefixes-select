/* @flow */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { prefixes } from "./data/prefixes";

/**
 * Some constants.
 */
const DEFAULT_OPTION_STRING = "Prefix";
const DEFAULT_SELECT_STYLE = `
    min-width: 6rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
`;

/**
 * Type definition for class props.
 */
type Props = {
  defaultOptionText?: string,
  hasDefaultOption?: boolean,
  onChange: Function,
  style?: any,
  className?: string
};

/**
 * React class for name prefix select in a form
 * @class PrefixesSelect
 */
class PrefixesSelect extends React.Component<Props> {
  /**
   * @memberof PrefixesSelect
   * @static
   */
  static defaultProps = {
    hasDefaultOption: true,
    defaultOptionText: DEFAULT_OPTION_STRING,
    style: {},
    className: null
  };

  /**
   * @memberof PrefixesSelect class.
   * @static
   * @property {bool} [hasDefaultOption] - Toggles default option on/off.
   * @property {string} [defaultOptionText] - Customized text for the default option.
   * @property {func} onChange - Function to fire with newly selected data
   * @property {Object} style - React style. Javascript object with camelCase css properties.
   * @property {string} className - CSS class. Overrides all default styles (see render method)
   */
  static propTypes = {
    hasDefaultOption: PropTypes.bool,
    defaultOptionText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.any,
    className: PropTypes.string
  };

  /**
   * Handle onChange fired from select element. Checks to make sure the default option
   * doesn't fire a change.
   *
   * @memberof PrefixesSelect class.
   * @param {SyntheticEvent<HTMLSelectElement>} event - The html event object
   */
  change = (event: SyntheticEvent<HTMLSelectElement>) => {
    const index = event.currentTarget.value;
    if (index === "null") return;
    const selectedPrefix = prefixes[index];
    this.props.onChange(event, selectedPrefix);
  };

  /**
   * React render method.
   * @return {string} - HTML markup for the component.
   */
  render() {
    // Setup the default option
    let defaultOption = <option value="null">{this.props.defaultOptionText}</option>;

    if (!this.props.hasDefaultOption) {
      defaultOption = null;
    }

    // Setup the style. className won't override styled component, so if caller specifies
    // className, set styled component style to nothing. It's all or none.
    let componentStyle = DEFAULT_SELECT_STYLE;

    if (this.props.className) {
      componentStyle = "";
    }

    const Wrapper = styled.div`
      > select {
        ${componentStyle};
      }
    `;

    // If common is specified, just display the prefixes marked as 'common'
    let displayedPrefixes = prefixes;

    if (this.props.common) {
      displayedPrefixes = prefixes.filter(prefix => prefix.common);
    }

    return (
      <Wrapper>
        <select
          id="prefix"
          name="prefix"
          onChange={this.change}
          style={this.props.style}
          className={this.props.className || ""}
        >
          {defaultOption}
          {displayedPrefixes.map((prefix, i) => {
            return (
              <option key={prefix.code} value={i}>
                {prefix.label}
              </option>
            );
          })}
        </select>
      </Wrapper>
    );
  }
}

export default PrefixesSelect;
