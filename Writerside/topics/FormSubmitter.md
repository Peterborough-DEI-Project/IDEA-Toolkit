# Component: FormSubmitter 

## **Overview**
The `FormSubmitter` component dynamically generates a form based on a provided schema (`formSchema`) and manages its state using `useFormConsumer`. Submission is handled through the `onSubmit` callback.
## **Props**
### `formSchema`
- **Type**: `formSchemaShape` (shape defined in `./propTypes.js`)
- **Required**: Yes
- **Description**: Defines the structure of the form, including title, description, and fields.

### `onSubmit`
- **Type**: `function`
- **Required**: No
- **Description**: Callback executed when the form is submitted. If not provided, the submit button is disabled.

## **Key Features**
1. **Dynamic Form Rendering**:
    - Fields are rendered automatically based on `formSchema`.
    - Uses `FieldRenderer` for individual field components.

2. **State Management**:
    - State is handled through `useFormConsumer`, which provides:
        - `responseData`: Current field data.
        - `editResponse(index, event)`: Updates field values dynamically.

3. **Memoized Schema**:
    - Form state initializes via `createResponseSchema`, optimized with `useMemo`.

## **Component Structure**
- **Typography** displays the form title and description.
- **FieldRenderer** renders each field using `formSchema.fields`.
- A **Submit Button** (disabled when `onSubmit` is absent).

## **Debugging**
- Uncomment the `<pre>` tags inside the component to view the live `responseData` or `formSchema` state.

## **Todo**
### **Validation Logic**
- Alert popup when a user attempts to submit an incomplete form
- Visual change to the field when a user attempts to submit an incomplete form (e.g., outlined in red)
- Validating datatypes, valid entries, etc.
### **Backend Functionality**
- Query to insert the submission
- Query to retrieve previous submissions
- Feedback functionality to allow messaging between adminstrators and employees.
### **Frontend Functionality**
- **Help Component**: Requested by Reem, a component to allow users to eitheremail or message if they require assistance.
