export const validator = ({ email, password, username }, setError, errors ) => {
  
    if (!email || email.length > 30 || email.trim() === "") {
      errors.email = "Please enter a valid email";
    }
  
    if (!username || username.trim() === "" || username.length < 3 || username.length > 20) {
      errors.username = "Please enter a valid username";
    }
  
    if (!password || password.length < 6 || password.trim() === "" || password.length > 20) {
      errors.password = "Please enter a strong password. Password should be at least 6 characters long.";
    }
  
    if (errors.email || errors.username || errors.password) {
        setError(errors);
        return errors
      } else {
        setError({ });
       
      }
  };
  