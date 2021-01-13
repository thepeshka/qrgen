import React from 'react';

const Style = ({children, ...style}) =>
  !children
    ? null
    : Array.isArray(children)
      ? (<div style={style}>{children}</div>)
      : typeof children === "string"
        ? (<span style={style}>{children}</span>)
        : (React.cloneElement(children, {style: {...(children.props.style || {}), ...style}}));

export default Style;
