/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
	const { rows, hasHeaderRow, textColor, borderColor, bgColor, fontSize, borderWidth, textAlign, cellPadding } = attributes;

	return (
		<div
			{...useBlockProps.save()}
		>
			<table
				style={{
					backgroundColor: bgColor,
					fontSize: fontSize,
					color: textColor
				}}
			>
				<tbody>
					{rows.map((row, rowIdx) => (
						<tr key={rowIdx}>
							{row.map((cell, colIdx) => {
								const isHeader = hasHeaderRow && rowIdx === 0;
								const CellTag = isHeader ? 'th' : 'td';

								return (
									<CellTag
										key={colIdx}
										style={{
											border: `${borderWidth}px solid ${borderColor}`,
											fontWeight: isHeader ? 'bold' : 'normal',
											padding: `${cellPadding}px`,
											textAlign: textAlign
										}}
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
