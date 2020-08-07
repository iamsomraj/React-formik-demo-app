import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Box, MenuItem, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const options = [
	{
		value: '',
		label: 'Select'
	},
	{
		value: 'frontend',
		label: 'Frontend'
	},
	{
		value: 'backend',
		label: 'Backend'
	},
	{
		value: 'fullStack',
		label: 'Full Stack'
	},
	{
		value: 'designer',
		label: 'Designer'
	}
];

const initialValues = {
	email: '',
	password: '',
	profile: ''
};

const validationSchema = yup.object({
	email: yup.string().required('Required').email('Not a valid email format'),
	password: yup.string().required('Required'),
	profile: yup.string().required('Required')
});

const onSubmit = (values, { setSubmitting }) => {
	setTimeout(() => {
		setSubmitting(false);
	}, 2000);
	console.log(values);
};

const MaterialForm = () => {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justify='center'
			style={{ minHeight: '100vh' }}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}>
				{({ submitForm, isSubmitting, resetForm }) => (
					<Form>
						<Box margin={1}>
							<Field
								component={TextField}
								name='email'
								type='email'
								label='Email'
							/>
						</Box>
						<br />
						<Box margin={1}>
							<Field
								component={TextField}
								type='password'
								label='Password'
								name='password'
							/>
						</Box>
						<Box margin={1}>
							<Field
								component={TextField}
								type='text'
								name='profile'
								label='Select a role'
								helperText='Please select a suitable role'
								select
								variant='standard'
								margin='normal'
								InputLabelProps={{
									shrink: true
								}}>
								{options.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Field>
						</Box>

						{isSubmitting && <LinearProgress />}
						<br />
						<Box margin={1}>
							<Button
								variant='contained'
								color='primary'
								disabled={isSubmitting}
								onClick={submitForm}>
								Submit
							</Button>
						</Box>
						<Box margin={1}>
							<Button
								variant='contained'
								color='secondary'
								disabled={isSubmitting}
								onClick={resetForm}>
								Reset
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Grid>
	);
};

export default MaterialForm;
