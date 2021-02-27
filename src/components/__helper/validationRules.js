export default function validate(values) {
  let errors = {};
  if (!values.username?.value) {
    errors.username = "Username is required";
  }
  if (!values.password?.value) {
    errors.password = "Password is required";
  }
  return errors;
}
