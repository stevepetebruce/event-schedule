import React, { useRef, useState, useEffect } from "react";
import { Field, useFormikContext } from "formik";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = ({ schedule }) => {
	const { setFieldValue } = useFormikContext();
	const filePickerRef = useRef();
	const [imgFile, setImgFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();

	useEffect(() => {
		if (!imgFile) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(imgFile);
	}, [imgFile]);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const uploadImage = async (event) => {
		console.log("Uploading file")
		const images = event.target.files;
		const data = new FormData();
		data.append('file', images[0]);
		data.append('upload_preset', 'schedules');

		const res = await fetch('https://api.cloudinary.com/v1_1/dftxjfft8/image/upload', { 
			method: 'POST',
			body: data
		})
		const file = await res.json();
		console.log(file)
	}

	return (
		<div className='form-control'>
			<Field>
				{() => (
					<div>
						<input
							type='file'
							name={`${schedule}.image`}
							ref={filePickerRef}
							id={`${schedule}.image`}
							onChange={uploadImage}
							accept='.jpeg,.png,.jpg'
							style={{ display: "none" }}
						/>
					</div>
				)}
			</Field>
			<div className={`image-upload`}></div>
			<div className='image-upload__preview'>
				{previewUrl && <img src={previewUrl} alt='preview' />}
				{!previewUrl && <img src='../../noimage.jpg' alt='preview' />}
			</div>
			<Button type='button' onClick={pickImageHandler}>
				Select Image
			</Button>
		</div>
	);
};

export default ImageUpload;
