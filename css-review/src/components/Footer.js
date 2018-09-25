import React from 'react';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';

const Radio = ({
  active,
  children,
  onChange,
}) => {

  return (
    <label className="filter">
      <input 
        checked={active}
        type="radio"
        name="filter"
        className="filter__radio"
        onChange={e => {
          onChange();
        }}
      />
      <span className={`filter__label--${children.toLowerCase()}`}>
        {children}
      </span>
    </label>
  );
};

const mapStateToRadioProps = (
  state,
  ownProps
) => {
  return {
    active:
      ownProps.filter ===
      state.visibilityFilter
  };
};

const mapDispatchToRadioProps = (
  dispatch,
  ownProps
) => {
  return {
    onChange: () => {
      dispatch(
        setVisibilityFilter(ownProps.filter)
      );
    }
  };
}

const FilterRadio = connect(
  mapStateToRadioProps,
  mapDispatchToRadioProps
)(Radio);

export default () => (
  <fieldset className="filters">
    <legend className="filters__title">Show:</legend>
    <FilterRadio filter='SHOW_ALL'>
      All
    </FilterRadio>
    <FilterRadio filter='SHOW_ACTIVE'>
      Active
    </FilterRadio>
    <FilterRadio filter='SHOW_COMPLETED'>
      Completed
    </FilterRadio>
  </fieldset>
);



