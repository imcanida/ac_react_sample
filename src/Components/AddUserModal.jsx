import React, { useContext, useRef, useEffect } from "react";
import { UserListContext } from "../ContextProviders/UserListContextProvider";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddUserModal = ({ toggle }) => {
  const inputRef = useRef(null);
  const { addUser } = useContext(UserListContext);

  // Using formik to handle form state and validation
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    // Using yup to handle validation, has built in support for formik, but also email, password, etc.
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      addUser({
        firstName: values.firstName,
        lastName: values.lastName,
      });
      resetForm();
      toggle();
    },
  });
  
  // Allow creation after pressing enter.
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 10); // Setting a small delay since it won't focus if the modal is still animating
  }, [inputRef]);

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader>Add User</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit} onKeyDown={handleKeyDown}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              autoFocus
              type="text"
              name="firstName"
              id="firstName"
              innerRef={inputRef}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.firstName && formik.errors.firstName}
              required
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-danger">{formik.errors.firstName}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.lastName && formik.errors.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-danger">{formik.errors.lastName}</div>
            ) : null}
          </FormGroup>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              disabled={!formik.dirty || !formik.isValid}
            >
              Add User
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};
