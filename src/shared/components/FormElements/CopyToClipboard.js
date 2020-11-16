import React from 'react'
import Button from "./Button";
import FormControl from "./FormControl";
import useCopyToClipboard from "../../util/copy-to-clipboard";

function CopyToClipboard({name, toCopy, btnTitle, label, control}) {
	const [isCopied, handleCopy] = useCopyToClipboard(3000);

	return (
		<div className="flex w-full ml-4 px-3 mb-0">
			<div className="flex-auto py-2 mr-4 w-8/12">
				<FormControl
					control={control}
					label={label}
					name={name}
					rows='3'
					value={toCopy}
				/>
			</div>
			<div className="flex w-4/12 justify-end text-center mt-8 py-2 items-start">
				<Button default size='small' onClick={() => handleCopy(`${toCopy}`)}>
					{isCopied ? 'Copied' : `${btnTitle}`}
				</Button>
			</div>
		</div>
	)
}

export default CopyToClipboard
