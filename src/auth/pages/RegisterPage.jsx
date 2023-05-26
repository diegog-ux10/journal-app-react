import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
// import { Google } from "@mui/icons-material"
import { Link as RouterLink} from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useMemo, useState } from "react"
import { startEmailAndPasswordSignIn } from "../../store/auth/thunks"

const initialFormState = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Email must has @'],
  password: [(value) => value.length >= 6, 'Password must have at least 6 characters'],
  displayName: [(value) => value.length >= 1, 'Name must have at least 1 character'],
}

export const RegisterPage = () => {


  const [formSubmited, setFormSubmited ] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(()=> status === 'checking', [status])

  const { displayName, email, password, onInputChange, displayNameValid, emailValid, passwordValid, isFormValid, formState } = useForm(initialFormState, formValidations);
  
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if(!isFormValid) return
    dispatch(startEmailAndPasswordSignIn(formState));
  };

  return (
    <AuthLayout title='Register'>
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
      <Grid container>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField 
            label="Name" 
            type="text" 
            placeholder="John Doe"
            fullWidth
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            error={ !!displayNameValid && formSubmited}
            helperText={ displayNameValid } 
            />
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField 
            label="Email" 
            type="email" 
            placeholder="example@gmail.com"
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
            error={ !!emailValid && formSubmited}
            helperText={ emailValid }  
            />
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>  
          <TextField 
            label="Password" 
            type="password" 
            placeholder="Password"
            fullWidth
            name="password"
            value={password}
            onChange={onInputChange}
            error={ !!passwordValid && formSubmited}
            helperText={ passwordValid }    
            />
        </Grid>

        <Grid
          container
          spacing={ 2 }
          sx={{mb: 2, mt: 1}}
          >
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth disabled={isCheckingAuth}>
              Create Account
            </Button>
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Do you have an account already?
            </Link>
        </Grid>
      </Grid>
    </form>
</AuthLayout>
  )
}
