import React, { useRef, useState, useEffect } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";
import TextError from "./TextError";

import {RemoveCircle, CameraAlt, AddAPhoto} from '@material-ui/icons';

const LogoUpload = ({ name, label, value }) => {
	const { setFieldValue } = useFormikContext();
	const filePickerRef = useRef();
	const [imgFile, setImgFile] = useState("");
	const [imgFileLoading, setImgFileLoading] = useState(false);

	useEffect(() => {
		if (!value) {
			return;
		}
		setImgFile(value)
		// eslint-disable-next-line
	}, []);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const removeImageHandler = () => {
		setImgFile("");
		setFieldValue(filePickerRef.current.name, "");
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
		<div className='flex flex-col items-center form-control text-center'>
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
			<div className='flex items-center justify-center rounded-md border border-gray-600 h-24 w-24 overflow-hidden mt-1 object-cover relative'>
				{!imgFile && !imgFileLoading && <AddAPhoto htmlColor='#4a5568' fontSize='large' titleAccess='Add Image' aria-label='Add Image' className='mb-1 mr-1 hover:text-gray-300 cursor-pointer' onClick={pickImageHandler} />}
				{imgFileLoading && <div className="content-center lds-dual-ring cursor-wait"></div>}
				{imgFile && !imgFileLoading && 
					<>
						<img src={imgFile} className="object-cover" alt='preview' />
						<div className="flex w-24 px-4 absolute bottom-0 mb-1 justify-around">
							<CameraAlt className='text-gray-400 hover:text-white cursor-pointer'  titleAccess='Replace Image' aria-label='Replace Image' onClick={pickImageHandler} />
							<RemoveCircle className='text-gray-400 hover:text-white cursor-pointer' titleAccess='Remove Remove' aria-label='Remove Image'  onClick={removeImageHandler} />
						</div>
					</>
				}
			</div>
			<ErrorMessage name={name} component={TextError} />	
		</div>
	);
};

export default LogoUpload;
