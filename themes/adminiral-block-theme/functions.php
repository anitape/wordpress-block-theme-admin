<?php

/* Enabling menu editor in WP admin panel*/

function register_wpmenu(){
    register_nav_menu('primary', 'Main menu');
}

/* Adding featured image to posts*/
add_theme_support('post-thumbnails');

/* Adding menu option to wp-admin*/
add_action('init', 'register_wpmenu');

/* Adding essential styles and scripts*/
function essential_scripts() {

    wp_enqueue_style(
        'essential-style',
        get_template_directory_uri() . '/style.css',
        [],
        '0.1.0'
    );

};

add_action('wp_enqueue_scripts', 'essential_scripts');

?>
