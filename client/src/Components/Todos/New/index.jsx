import React from "react";
import { Form, Field } from "react-final-form";

const required = value => (value ? undefined : "Required");

const Component = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, submitting, pristine, values, form: { reset } }) => (
      <form onSubmit={handleSubmit}>
        <Field name="text" validate={required}>
          {({ input, meta }) => (
            <div>
              <label>Text</label>
              <input {...input} type="text" placeholder="First Name" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <div className="buttons">
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </button>
        </div>
      </form>
    )}
  />
);


export default Component;
