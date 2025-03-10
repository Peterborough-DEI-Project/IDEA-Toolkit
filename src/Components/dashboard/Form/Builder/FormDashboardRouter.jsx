import React from "react";
import subViews from "./subViews.js";
import PropTypes from "prop-types";

FormDashboardRouter.propTypes = {
  activeViewId: PropTypes.number.isRequired,
  formSchema: PropTypes.object.isRequired,
  addField: PropTypes.func.isRequired,
  editField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  removeError: PropTypes.func.isRequired,
};

function FormDashboardRouter({
  activeViewId,
  formSchema,
  addField,
  editField,
  removeField,
  handleFormChange,
  errors,
  removeError,
  ...props
}) {
  const activeView = subViews.find((view) => view.id === activeViewId);

  return activeView ? (
    <activeView.component
      formSchema={formSchema}
      addField={addField}
      editField={editField}
      removeField={removeField}
      handleFormChange={handleFormChange}
      errors={errors}
      removeError={removeError}
    />
  ) : (
    <div>View Not Found</div>
  );
}

export default FormDashboardRouter;
