import PropTypes from 'prop-types';

export default function Button({
  children,
  onClick = () => {},
  style = {},
  className = '',
}) {
  return (
    <button onClick={onClick} style={style} className={className}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};
