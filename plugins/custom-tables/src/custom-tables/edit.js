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
import { PanelBody, ColorPicker, RangeControl, Button, ButtonGroup, ToggleControl, SelectControl } from '@wordpress/components';
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
	// Destructure the attributes for easier access
	const { rows, hasHeaderRow, textColor, borderColor, bgColor, borderWidth, textAlign, headerRowColor, cellPaddingValue, cellPaddingUnit } = attributes;

	const blockProps = useBlockProps();
	const { style: blockStyle, ...otherProps } = blockProps;

	// Cell padding string like "0.5rem"
	const cellPadding = `${cellPaddingValue}${cellPaddingUnit}`;

	// Updates a specific cell's value
	const updateCell = (rowIdx, colIdx, value) => {
		const newRows = [...rows]; // clone the rows
		newRows[rowIdx][colIdx] = value; // set new value for the specific cell
		setAttributes({ rows: newRows }); // update the block attribute
	};

	// Adds a new row with same number of columns as existing rows
	const addRow = () => {
		const newRow = rows[0]
			? new Array(rows[0].length).fill('Cell') // If there are rows already, create a new array with the same length and fill all cells
			: ['Cell']; // If there’s no rows yet (i.e., the table is completely empty), creates one row with just one column
		setAttributes({ rows: [...rows, newRow] });
	};

	// Adds a new column to every row
	const addColumn = () => {
		if (rows[0]) {
			const newRows = rows.map(row => [...row, 'Cell']); // add a string to each row
			setAttributes({ rows: newRows });
		}
	};

	// Delete a row
	const deleteRow = () => {
		if (rows.length > 1) {
			setAttributes({ rows: rows.slice(0, -1) }); // removes last row
		}
	}

	// Delete a column from every row
	const deleteColumn = () => {
		if (rows[0] && rows[0].length > 1) {
			const updatedRows = rows.map(row => row.slice(0, -1)); // remove last cell from each row
			setAttributes({ rows: updatedRows })
		}
	}


	return (
		<>
			<InspectorControls>
				<PanelBody title="Table Style" initialOpen={true}>
					<p>Text Color</p>
					<ColorPicker
						color={textColor}
						onChangeComplete={(color) => setAttributes({ textColor: color.hex })}
					/>
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
					<p>Header Row Background Color</p>
					<ColorPicker
						label="Header Row Background"
						color={headerRowColor}
						onChangeComplete={(color) => setAttributes({ headerRowColor: color.hex })}
					/>
					<RangeControl
						label="Border Width"
						value={borderWidth}
						onChange={(value) => setAttributes({ borderWidth: value })}
						min={0}
						max={10}
					/>
				</PanelBody>
				<PanelBody title="Edit Table Layout" initialOpen={false} >
					<ToggleControl
						label="Use Header Row"
						checked={hasHeaderRow}
						onChange={(value) => setAttributes({ hasHeaderRow: value })}
					/>
					<ButtonGroup className="table-panel-buttons">
						<Button onClick={addRow} variant="primary" className="table-panel-button">
							+ Add Row
						</Button>
						<Button onClick={addColumn} variant="secondary" className="table-panel-button">
							+ Add Column
						</Button>
						<Button onClick={deleteRow} variant="primary" disabled={rows.length <= 1} className="table-panel-button">
							- Delete Row
						</Button>
						<Button onClick={deleteColumn} variant="secondary" disabled={rows[0]?.length <= 1} className="table-panel-button">
							- Delete Column
						</Button>
					</ButtonGroup>
				</PanelBody>
				<PanelBody title="Cell Layout" initialOpen={false}>
					<SelectControl
						label="Text Align"
						value={textAlign}
						options={[
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						]}
						onChange={(value) => setAttributes({ textAlign: value })}
					/>
					{/* Padding value control */}
					<RangeControl
						label={__('Cell Padding Value', 'my-plugin')}
						value={cellPaddingValue}
						onChange={(value) => setAttributes({ cellPaddingValue: value })}
						min={0}
						max={5}
						step={0.1}
					/>

					{/* Padding unit select */}
					<SelectControl
						label={__('Cell Padding Unit', 'my-plugin')}
						value={cellPaddingUnit}
						options={[
							{ label: 'px', value: 'px' },
							{ label: 'em', value: 'em' },
							{ label: 'rem', value: 'rem' },
							{ label: 'vw', value: 'vw' },
							{ label: 'vh', value: 'vh' },
						]}
						onChange={(value) => setAttributes({ cellPaddingUnit: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div
				{...otherProps}
			>
				<table
					style={{
						...blockStyle,
						backgroundColor: bgColor,
						color: textColor
					}}

				>
					<tbody>
						{rows.map((row, rowIdx) => (
							<tr key={rowIdx}>
								{row.map((cell, colIdx) => {
									const isHeader = hasHeaderRow && rowIdx === 0;
									const CellTag = isHeader ? 'th' : 'td';
									const cellStyle = {
										border: `${borderWidth}px solid ${borderColor}`,
										padding: cellPadding,
										textAlign: textAlign,
										backgroundColor: isHeader ? headerRowColor : 'transparent',
									};

									return (
										<CellTag
											key={colIdx}
											style={cellStyle}
										>
											<input
												value={cell}
												placeholder="Cell"
												onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
												style={{
													width: '100%',
													color: textColor,
													border: 'none',
													background: 'transparent',
													fontWeight: isHeader ? 'bold' : 'normal',
													textAlign: textAlign
												}}
											/>
										</CellTag>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
