import {useState, useEffect} from "react";
import copy from "copy-to-clipboard";

function useCopyToClipboard(resetInterval = null) {
	const [isCopied, setCopied] = useState(false);

	function handleCopy(text) {
		if (typeof text === "string" || typeof text == "number") {
			copy(text.toString());
			setCopied(true);
		} else {
			setCopied(false);
			console.error(
				"Cannot copy to clipboard, must be a string or number."
			);
		}
	}

	useEffect(() => {
		let timeout;
		if (isCopied && resetInterval) {
			timeout = setTimeout(() => setCopied(false), resetInterval);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [isCopied, resetInterval]);

	return [isCopied, handleCopy];
}

export default useCopyToClipboard;