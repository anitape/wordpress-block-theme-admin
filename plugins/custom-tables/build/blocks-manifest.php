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
			'color' => array(
				
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'textdomain' => 'custom-tables',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'tableContent' => array(
				'type' => 'string',
				'default' => '<table><tr><td>Cell</td></tr></table>'
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'bgColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'fontSize' => array(
				'type' => 'number',
				'default' => 16
			),
			'borderWidth' => array(
				'type' => 'number',
				'default' => 1
			)
		)
	)
);
