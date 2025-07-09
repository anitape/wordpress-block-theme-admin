<?php
// This file is generated. Do not modify it manually.
return array(
	'custom-tables' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/custom-tables',
		'version' => '0.1.0',
		'title' => 'Custom Tables',
		'category' => 'design',
		'icon' => 'table-col-after',
		'description' => 'A customizable table block with color, size, and border options.',
		'keywords' => array(
			'table',
			'custom',
			'design'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true
			)
		),
		'textdomain' => 'custom-tables',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'rows' => array(
				'type' => 'array',
				'default' => array(
					array(
						'Cell'
					)
				)
			),
			'hasHeaderRow' => array(
				'type' => 'boolean',
				'default' => false
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#12091a'
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			),
			'textAlign' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'headerRowColor' => array(
				'type' => 'string',
				'default' => '#27212f'
			),
			'cellPaddingValue' => array(
				'type' => 'number',
				'default' => 0.5
			),
			'cellPaddingUnit' => array(
				'type' => 'string',
				'default' => 'rem'
			)
		)
	)
);
