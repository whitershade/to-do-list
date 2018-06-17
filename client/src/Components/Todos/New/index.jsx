import React from "react";
import { Form, Field } from "react-final-form";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './styles.css';

const required = value => (value ? undefined : "Required");

const Component = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, submitting, pristine, values, form: { reset } }) => (
      <form onSubmit={handleSubmit} styleName="form">
        <Field name="text" validate={required}>
          {({ input, meta }) => (
            <div>
              <FormControl styleName="input-wrapper">
                <TextField
                  label="Text"
                  error={ meta.error && meta.touched  }
                  {...input}
                  placeholder="Enter text"
                />
                { meta.error && meta.touched ? <FormHelperText styleName="helper-text">{ meta.error }</FormHelperText> : null }
              </FormControl>
            </div>
          )}
        </Field>

        <div styleName="buttons">
          <Button
            styleName="button"
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            Submit
          </Button>
          <Button
            styleName="button"
            type="button"
            variant="contained"
            color="secondary"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </Button>
        </div>
      </form>
    )}
  />
);


export default Component;
