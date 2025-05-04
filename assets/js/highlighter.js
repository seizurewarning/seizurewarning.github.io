document.addEventListener('DOMContentLoaded', () => {
	// Define regex patterns for different syntax elements
	const patterns = {
		// Keywords: name, category, command, params
		KEYWORD_DEF: /^(\s*)(name|category|command|params)(\s*:)/gm,

		// Parameter types (with label): label: type[value]{range}%
		PARAM_LINE: /^(\s*)([a-zA-Z0-9_]+)(\s*:)(\s*)(int|float|bool|menu|point)(\s*)(\[)([^\]]+)(\])(\s*)(\{)?([^\}]+)?(\})?(\s*)(%)?(\s*)$/gm,

		// Standalone parameter type (without label): type[value]{range}%
		TYPE_ONLY: /^(\s*)(int|float|bool|menu|point)(\s*)(\[)([^\]]+)(\])(\s*)(\{)?([^\}]+)?(\})?(\s*)(%)?(\s*)$/gm,

		// Any percent sign anywhere
		// PERCENT_SIGN: /(%)/g,

		// Comment lines
		COMMENT: /^(\s*)(\/\/.*)$/gm,

		// Numeric values (standalone)
		NUMERIC_VALUE: /^(\s*)([0-9]+(?:\.[0-9]+)?(?:\s*,\s*[0-9]+(?:\.[0-9]+)?)*)(\s*)$/gm
	};

	// Function to escape HTML special characters to prevent XSS
	function escapeHtml(unsafe) {
		if (unsafe === null || unsafe === undefined) {
			return '';
		}
		return unsafe
			.toString()
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

	// Function to process text and add spans for syntax highlighting
	function processText(text) {
		// First escape HTML in the text
		let processedText = escapeHtml(text);

		// Apply syntax highlighting in this specific order to avoid conflicts

		// 1. Handle comments first (highest priority)
		processedText = processedText.replace(patterns.COMMENT, (match, g1, g2) => {
			return `${g1}<span class="token-comment">${g2}</span>`;
		});

		// 2. Handle keyword definitions (name:, category:, command:, params:)
		processedText = processedText.replace(patterns.KEYWORD_DEF, (match, g1, g2, g3) => {
			return `${g1}<span class="token-keyword-def">${g2}</span><span class="token-punctuation">${g3}</span>`;
		});

		// 3. Handle parameter lines with labels (label: type[value]{range}%)
		processedText = processedText.replace(patterns.PARAM_LINE, (match, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16) => {
			let result = g1; // Initial whitespace

			// Variable/Label name
			result += `<span class="token-variable">${g2}</span>`;

			// Colon and space after
			result += `<span class="token-punctuation">${g3}</span>${g4}`;

			// Type (int, float, bool, menu, point)
			result += `<span class="token-type">${g5}</span>`;

			// Space before bracket
			result += g6;

			// Opening bracket, value, closing bracket
			result += `<span class="token-punctuation">${g7}</span>`; // [

			// Special formatting for point values with commas
			if (g5 === 'point' && g8.includes(',')) {
				const parts = g8.split(',');
				result += parts.map(part => `<span class="token-brackets">${part}</span>`)
					.join('<span class="token-ellipsis">,</span>');
			} else {
				result += `<span class="token-brackets">${g8}</span>`; // value inside brackets
			}

			result += `<span class="token-punctuation">${g9}</span>`; // ]



			result += g10;

			// Optional range in braces {min...max}
			if (g11) { // Opening brace exists
				result += `<span class="token-punctuation">${g11}</span>`; // {

				if (g12) { // Content inside braces
					// Check if it contains "..." and split accordingly
					if (g12.includes('...')) {
						const parts = g12.split('...');
						result += `<span class="token-braces-content">${parts[0]}</span>`;
						result += `<span class="token-ellipsis">...</span>`;
						result += `<span class="token-braces-content">${parts[1]}</span>`;
					} else if (g12.includes(',')) {
						// For menu options with commas
						const parts = g12.split(',');
						result += parts.map(part => `<span class="token-braces-content">${part}</span>`)
							.join('<span class="token-ellipsis">,</span>');
					} else {
						// For other content without commas or ellipses
						result += `<span class="token-braces-content">${g12}</span>`;
					}
				}

				if (g13) { // Closing brace exists
					result += `<span class="token-punctuation">${g13}</span>`; // }
				}
			}

			// Space after braces
			result += g14;

			// Optional percent sign
			if (g15) {
				result += `<span class="token-brackets">${g15}</span>`;
			}

			// Trailing whitespace
			result += g16;

			return result;
		});

		// 4. Handle type declarations without labels (type[value]{range}%)
		processedText = processedText.replace(patterns.TYPE_ONLY, (match, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13) => {
			let result = g1; // Initial whitespace

			// Type (int, float, bool, menu, point)
			result += `<span class="token-type">${g2}</span>`;

			// Space before bracket
			result += g3;

			// Opening bracket, value, closing bracket
			result += `<span class="token-punctuation">${g4}</span>`; // [

			// Special formatting for point values with commas
			if (g2 === 'point' && g5.includes(',')) {
				const parts = g5.split(',');
				result += parts.map(part => `<span class="token-brackets">${part}</span>`)
					.join('<span class="token-ellipsis">,</span>');
			} else {
				result += `<span class="token-brackets">${g5}</span>`; // value inside brackets
			}

			result += `<span class="token-punctuation">${g6}</span>`; // ]


			// Space after bracket
			result += g7;

			// Optional range in braces {min...max}
			if (g8) { // Opening brace exists
				result += `<span class="token-punctuation">${g8}</span>`; // {

				if (g9) { // Content inside braces
					// Check if it contains "..." and split accordingly
					if (g9.includes('...')) {
						const parts = g9.split('...');
						result += `<span class="token-braces-content">${parts[0]}</span>`;
						result += `<span class="token-ellipsis">...</span>`;
						result += `<span class="token-braces-content">${parts[1]}</span>`;
					} else if (g9.includes(',')) {
						// For menu options with commas
						const parts = g9.split(',');
						result += parts.map(part => `<span class="token-braces-content">${part}</span>`)
							.join('<span class="token-ellipsis">,</span>');
					}  else {
						// For other content without commas or ellipses
						result += `<span class="token-braces-content">${g9}</span>`;
					}
				}

				if (g10) { // Closing brace exists
					result += `<span class="token-punctuation">${g10}</span>`; // }
				}
			}

			// Space after braces
			result += g11;

			// Optional percent sign
			if (g9 == '%') {
				result += `<span class="token-brackets">${g9}</span>`;
			}

			// Trailing whitespace
			result += g13;

			return result;
		});

		// 5. Handle any percent sign anywhere
		processedText = processedText.replace(patterns.PERCENT_SIGN, (match, g1) => {
			return `<span class="token-brackets">${g1}</span>`;
		});

		// 6. Handle standalone numeric values
		processedText = processedText.replace(patterns.NUMERIC_VALUE, (match, g1, g2, g3) => {
			return `${g1}<span class="token-brackets">${g2}</span>${g3}`;
		});

		return processedText;
	}

	// Function to highlight a code element
	function highlightElement(codeElement) {
		const originalCode = codeElement.textContent; // Get raw text content
		const lines = originalCode.split('\n');
		let highlightedLines = [];

		// Process each line
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			// Skip empty lines
			if (line.trim() === '') {
				highlightedLines.push('');
				continue;
			}

			// Process the line to add spans
			highlightedLines.push(processText(line));
		}

		// Join all processed lines back together
		const highlightedText = highlightedLines.join('\n');

		// Special handling for newlines in HTML
		// (replace \n with <br> only if not inside a pre tag)
		const codeElementIsInPre = codeElement.parentElement && codeElement.parentElement.nodeName.toLowerCase() === 'pre';
		const finalHtml = codeElementIsInPre ? highlightedText : highlightedText.replace(/\n/g, '<br>');

		// Update the content of the original code element
		codeElement.innerHTML = finalHtml;
	}

	// Find all code blocks with the target class and apply highlighting
	const codeBlocks = document.querySelectorAll('code.gmacfx');
	codeBlocks.forEach(highlightElement);
});