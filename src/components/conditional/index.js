const If = ({condition, or=false, children}) => {
  if (Array.isArray(condition)) {
    if (or) condition = condition.reduce((a, b) => a || b);
    else condition = condition.reduce((a, b) => a && b);
  }
  if (children && condition)
    return children;
  else
    return null;
}

export default If;
