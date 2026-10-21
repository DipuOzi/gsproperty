<?php
/**
 * Theme setup and front-end assets.
 */
if (!defined('ABSPATH')) {
    exit;
}

function gs_property_group_setup() {
    add_theme_support('title-tag');
    add_theme_support('html5', array('style', 'script'));
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'gs_property_group_setup');

function gs_property_group_assets() {
    wp_enqueue_style(
        'gs-fonts',
        'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap',
        array(),
        null
    );
    wp_enqueue_style('gs-theme', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_style(
        'gs-site',
        get_template_directory_uri() . '/assets/site.css',
        array('gs-theme'),
        '1.0.0'
    );
    wp_enqueue_script(
        'gs-site',
        get_template_directory_uri() . '/assets/site.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'gs_property_group_assets');
