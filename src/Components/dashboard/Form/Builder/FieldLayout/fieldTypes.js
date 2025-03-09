import { TextBox, SelectionGroup, Date } from "../../Input/index.js";

const fieldTypes = {
  text: {
    label: "Text",
    component: {
      builder: TextBox,
      submitter: TextBox,
    },
    validationOptions: {
      boolOptions: [
        {
          id: "isMultiLine",
          label: "Multiline",
          value: false,
        },
      ],
    },
  },
  selection: {
    label: "Selection",
    component: {
      builder: SelectionGroup,
      submitter: SelectionGroup,
    },

    validationOptions: {
      selectionOptions: [],
      boolOptions: [
        {
          id: "enableMultiSelect",
          label: "Multiple choice",
          value: false,
        },
        {
          id: "enableCustomEntry",
          label: "Enable custom entry",
          value: false,
        },
      ],
    },
  },
  date: {
    label: "Date",
    component: {
      builder: Date,
      submitter: Date,
    },
    validationOptions: {},
  },
};

export default fieldTypes;
