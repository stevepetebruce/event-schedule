import React, { useRef, useState, useEffect } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import TextError from "./TextError";

import Button from "./Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const LogoUpload = ({ name, label, ...rest }) => {
	const { setFieldValue } = useFormikContext();
	const filePickerRef = useRef();
	const [imgFile, setImgFile] = useState("");
	const [imgFileLoading, setImgFileLoading] = useState(false);

	// useEffect(() => {
	// 	if (!schedule.imagethmb) {
	// 		return;
	// 	}
	// 	setImgFile(schedule.imagethmb)
	// 	// eslint-disable-next-line
	// }, []);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const uploadImage = async (event) => {
		setImgFileLoading(true);
		const images = event.target.files;
		const data = new FormData();
		data.append('file', images[0]);
		data.append('upload_preset', 'eventlogos');

		const res = await fetch('https://api.cloudinary.com/v1_1/dftxjfft8/image/upload', { 
			method: 'POST',
			body: data
		})
		const file = await res.json();
		setImgFileLoading(false);
		if (file.secure_url) {
			setImgFile(file.secure_url);
			setFieldValue(filePickerRef.current.name, file.secure_url);
		}
	}

	return (
		<div className='form-control text-center'>
			<label htmlFor={name} className='text-gray-500'>
				{label}
			</label>
			<Field>
				{() => (
					<div>
						<input
							type='file'
							name={name}
							ref={filePickerRef}
							id={name}
							onChange={uploadImage}
							accept='.jpeg,.png,.jpg'
							style={{ display: "none" }}
						/>
					</div>
				)}
			</Field>	
			<div className='flex items-center justify-center rounded-md border border-gray-600 h-24 w-24 overflow-hidden mt-1 object-cover relative cursor-pointer hover:border-gray-500 focus:border-indigo-800' onClick={pickImageHandler}>
				{!imgFile && !imgFileLoading && <AddAPhotoIcon htmlColor='#4a5568' fontSize='large' titleAccess='Add Image' aria-label='Add Image' className='mb-1 mr-1' />}
				{imgFileLoading && <div className="content-center lds-dual-ring cursor-wait"></div>}
				{imgFile && !imgFileLoading && 
					<>
						<img src={imgFile} className="object-cover" alt='preview' />
						<Button default type='button' size='icon' style={'absolute top-0 left-0'}><CameraAltIcon htmlColor='#fff' fontSize='small' titleAccess='Replace Image' aria-label='Replace Image' /></Button>
					</>
				}
			</div>
			<ErrorMessage name={name} component={TextError} />	
		</div>
	);
};

export default LogoUpload;
