# Hook: `useFormConsumer`

## **Overview**
The `useFormConsumer` hook is a custom hook designed for managing the form's state within the `FormSubmitter` component. It handles the current `responseData`, processes changes in user input, and updates the state accordingly.

See [here](Reference-formSchema-responseData.md#responseData) for details on the responseData object structure.

## **How It Works**
1. **State Management:**
    - `responseData` : Stores the user’s current responses for all the fields in the form.
    - This state initializes from the `responseSchema` passed into the hook.

2. **Controlled State Updates:**
    - `editResponse(index, e)` : Updates the corresponding field's value in `responseData` based on the input type.

3. **Dependency Injection:**
    - `useFormConsumer` is dependent on the schema (`responseSchema`) provided as an argument.

## **Returned Properties**
### 1. `responseData`
- **Type**: `Array`
- Stores information about each field's response.
- Format: Matches the structure described in `responseSchema` (e.g., field IDs, types, and values).
- Used as source-of-truth data for components rendering the form (`FieldRenderer`, etc.).

### 2. `editResponse`
- **Type**: `Function`
- **Signature**: `(index: number, e: Event) => void`
- Responsible for updating `responseData` when a user interacts with a field in the form.
- Internally handles:
    - **Text inputs** (`type: "text"`): Updates the string value.
    - **Radio buttons** (`type: "radioGroup"`): Updates the selected option ID.
    - **Checkbox groups** (`type: "checkboxGroup"`): Adds or removes selected IDs based on user interactions.
    - **Boolean fields** (`type: "boolean"`): Toggles the checkbox state (`true`/`false`).

## **Example**
### **Schema/Input Setup**
``` 
const responseSchema = [
  { responseId: "1", fieldId: "10", type: "text", value: "" },
  { responseId: "2", fieldId: "20", type: "checkboxGroup", value: [] },
];
const { responseData, editResponse } = useFormConsumer(responseSchema);
```
### **Handling State Updates**
The input components themselves only need to reference the onChange prop that is passed to them, for example:
```jsx
<TextField onChange={onChange} />
```

## **State Management Notes**
### **Component Behaviour**
Input components' state are **controlled**, meaning their state is derived from `responseData`. When a change occurs, they communicate the change to  `useFormConsumer` via `onChange`.

### **Managing State Updates**
When updates occur, it is important to use the value of the event as the source of truth. This means that modifying the data when updating `responseData` is discouraged as it might confuse the components.



## **Modifying the Hook**
### **Extending Functionality:**
If new input types need to be supported:
1. Add a new `case` for the input type within the `editResponse` function.
2. Define a new type in the Supabase enumerated type `field_types` located in the `assessments` schema.
3. If applicable, update the `useFormBuilder` hook and `FormBuilder` component to support the new input type.


