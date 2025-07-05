/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, RangeControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { tableContent, borderColor, bgColor, fontSize, borderWidth } = attributes;

	const handleInput = (e) => {
		setAttributes({ tableContent: e.currentTarget.innerHTML });
	};


	return (
		<>
			<InspectorControls>
				<PanelBody title="Table Settings">
					<p>Border Color</p>
					<ColorPicker
						color={borderColor}
						onChangeComplete={(color) => setAttributes({ borderColor: color.hex })}
					/>
					<p>Background Color</p>
					<ColorPicker
						color={bgColor}
						onChangeComplete={(color) => setAttributes({ bgColor: color.hex })}
					/>
					<RangeControl
						label="Font Size"
						value={fontSize}
						onChange={(value) => setAttributes({ fontSize: value })}
						min={10}
						max={40}
					/>
					<RangeControl
						label="Border Width"
						value={borderWidth}
						onChange={(value) => setAttributes({ borderWidth: value })}
						min={0}
						max={10}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				className="custom-table-editor"
				contentEditable
				suppressContentEditableWarning
				style={{
					border: `${borderWidth}px solid ${borderColor}`,
					backgroundColor: bgColor,
					fontSize: fontSize,
					padding: '10px',
					minHeight: '100px',
				}}
				onInput={handleInput}
				dangerouslySetInnerHTML={{ __html: tableContent }}
			/>
		</>
	)
}
