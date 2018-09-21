import React from 'react';

export default (props) => {
  const {currentTodo, changeCurrent} = props;
  const handleInputChange = (event) => {
    const val = event.target.value;
    changeCurrent(val);
  }
  return (
    <form>
      <input
        type="text"
        onChange={handleInputChange}
        value={currentTodo}
      />
    </form>
  );
}
