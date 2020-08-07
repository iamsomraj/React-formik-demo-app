import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextError } from './TextError';

const initialValues = {
	name: '',
	email: '',
	channel: '',
	comments: '',
	address: '',
	social: {
		facebook: '',
		twitter: ''
	},
	birthDetails: ['', ''],
	phoneNumbers: ['']
};

const onSubmit = (values) => {
	console.log('Values of the form:', values);
};

const requiredField = (fieldName) => `${fieldName} is a required field`;
const invalidFormatField = (fieldName) => `${fieldName} must be valid`;

const validationSchema = Yup.object({
	name: Yup.string().required(requiredField('Name')),
	email: Yup.string()
		.email(invalidFormatField('Email'))
		.required(requiredField('Email')),
	channel: Yup.string().required(requiredField('Channel')),
	address: Yup.string().required(requiredField('Address'))
});

export const UserForm = () => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}>
			{(formikProps) => {
				return (
					<Form>
						<div className='form-control'>
							<label htmlFor='name'>Name</label>
							<Field type='text' name='name' />
							<ErrorMessage component={TextError} name='name' />
						</div>

						<div className='form-control'>
							<label htmlFor='email'>Email</label>
							<Field type='email' name='email' />
							<ErrorMessage component={TextError} name='email' />
						</div>

						<div className='form-control'>
							<label htmlFor='channel'>Channel</label>
							<Field type='text' name='channel' />
							<ErrorMessage component={TextError} name='channel' />
						</div>

						<div className='form-control'>
							<label htmlFor='comments'>Comments</label>
							<Field as='textarea' type='text' name='comments' />
							<ErrorMessage component={TextError} name='comments' />
						</div>

						<div className='form-control'>
							<label htmlFor='address'>Address</label>
							<Field type='text' name='address'>
								{(props) => {
									// eslint-disable-next-line no-unused-vars
									const { field, form, meta } = props;
									return (
										<div>
											<input type='text' {...field} />
											{meta.touched && meta.error && (
												<div className='error'>{meta.error}</div>
											)}
										</div>
									);
								}}
							</Field>
						</div>

						<div className='form-control'>
							<label htmlFor='social.facebook'>Facebook Link</label>
							<Field type='text' name='social.facebook' />
						</div>

						<div className='form-control'>
							<label htmlFor='social.twitter'>Twitter Link</label>
							<Field type='text' name='social.twitter' />
						</div>

						<div className='form-control'>
							<label htmlFor='birthDetails[0]'>Date of Birth</label>
							<Field type='text' name='birthDetails[0]' />
						</div>

						<div className='form-control'>
							<label htmlFor='birthDetails[1]'>Place of Birth</label>
							<Field type='text' name='birthDetails[1]' />
						</div>

						<div className='form-control'>
							<label htmlFor='phoneNumbers'>Phone Number(s)</label>
							<FieldArray name='phoneNumbers'>
								{(props) => {
									const { push, remove, form } = props;
									const { values } = form;
									const { phoneNumbers } = values;
									return (
										<div>
											{phoneNumbers.map((phoneNumber, index) => {
												return (
													<div key={index}>
														<Field
															type='text'
															name={`phoneNumbers[${index}]`}
															validate={(value) => {
																let error;
																if (!value) {
																	error = requiredField('Phone Number(s)');
																}
																return error;
															}}
														/>
														<ErrorMessage
															name={`phoneNumbers[${index}]`}
															component={TextError}
														/>
														<button
															type='button'
															disabled={index === 0}
															onClick={() => remove(index)}>
															Remove This Number
														</button>
														<button type='button' onClick={() => push()}>
															Add Another Number
														</button>
													</div>
												);
											})}
										</div>
									);
								}}
							</FieldArray>
						</div>

						<button
							type='submit'
							disabled={!formikProps.isValid && formikProps.isSubmitting}>
							Submit
						</button>
						<button type='reset'>Reset</button>
					</Form>
				);
			}}
		</Formik>
	);
};
