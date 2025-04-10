import PropTypes from "prop-types";
import Text from '../../shared-components/inputs/Text/consumer/Text.jsx'
import RadioGroup from '../../shared-components/inputs/Options/consumer/RadioGroup.jsx'
import CheckboxGroup from '../../shared-components/inputs/Options/consumer/CheckboxGroup.jsx'
import SwitchWithLabel from '../../shared-components/inputs/Switch/consumer/SwitchWithLabel.jsx'

FieldComponentRouter.propTypes = {
  type: PropTypes.string.isRequired,
};

const components = {
  text: Text,
  radioGroup: RadioGroup,
  checkboxGroup: CheckboxGroup,
  boolean: SwitchWithLabel,
};

export default function FieldComponentRouter({ type, ...props }) {
  const Component = components[type];
  if (!Component) {
    console.warn(`Unsupported field type: ${type}`);
    return null;
  }

  return (
    <>
      <Component {...props} />
    </>
  );
}
