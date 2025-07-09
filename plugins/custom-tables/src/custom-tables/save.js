/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { rows, hasHeaderRow, textColor, borderColor, bgColor, borderWidth, textAlign, headerRowColor, cellPaddingValue, cellPaddingUnit } = attributes;

	const blockProps = useBlockProps.save();
	const { style: blockStyle, ...otherProps } = blockProps;

	const cellPadding = `${cellPaddingValue}${cellPaddingUnit}`;

	return (
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
										fontWeight: isHeader ? 'bold' : 'normal',
										padding: cellPadding,
										textAlign: textAlign,
										backgroundColor: isHeader ? headerRowColor : 'transparent',
									};

								return (
									<CellTag
										key={colIdx}
										style={cellStyle}
									>
										{cell}
									</CellTag>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
