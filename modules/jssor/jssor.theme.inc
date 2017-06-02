<?php

/**
 * @file
 * Preprocessors and helper functions to make theming easier.
 */

use Drupal\Core\Template\Attribute;

/**
 * Prepares variables for views jssor rows templates.
 *
 * Default template: views-view-jssor.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - view: The view object.
 *   - options: An array of options. Each option contains:
 *   - row: An array containing information about the current row.
 */
function template_preprocess_views_view_jssor(&$variables) {
  $view = $variables['view'];
  $rows = $variables['rows'];

  $style = $view->style_plugin;

  // View's options.
  $options = $style->options;

  // Attach library.
  $view->element['#attached']['library'][] = 'jssor/jquery.jssor.slider';

  $settings = [];

  // ID.
  $settings['view_dom_id'] = $view->dom_id;

  // Specifies default duration (swipe) for slide in milliseconds,
  // default value is 500.
  $settings['$SlideDuration'] = (int) $options['general']['slide_duration'];

  // The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and
  // put all inside slide), 2 cover (keep aspect ratio and cover whole slide),
  // 4 actual size, 5 contain for large image, actual size for small image,
  // default value is 0
  //$settings['$FillMode'] = 0;

  // Space between each slide in pixels.
  //$settings['$SlideSpacing'] = $options['general']['slide_spacing'];;

  // Allows keyboard (arrow key) navigation or not, default value is false.
  $settings['$ArrowKeyNavigation'] = $options['general']['key_navigation'];

  // Orientation to drag slide.
  $settings['$DragOrientation'] = (int) $options['general']['drag_orientation'];

  // Enable the slideshow or not.
  $settings['$SlideshowOptions'] = array(
    '$Class' => '$JssorSlideshowRunner',
    'transition' => $options['autoplay']['transition'],
    '$TransitionsOrder' => 1,
    '$ShowLink' => FALSE,
  );

  // Autoplay.
  if ($options['global']['autoplay'] === 1) {
    $settings['$AutoPlay'] = ($options['global']['autoplay']) ? TRUE : FALSE;
    $settings['$AutoPlayInterval'] = (int) $options['autoplay']['autoplayinterval'];
    $settings['$AutoPlaySteps'] = (int) $options['autoplay']['autoplaysteps'];
    $settings['$PauseOnHover'] = (int) $options['autoplay']['pauseonhover'];
  }

  // Arrow navigator.
  if ($options['global']['arrownavigator'] === 1) {
    $variables['arrownavigator'] = $options['global']['arrownavigator'];

    // Orientation to drag slide.
    $settings['$ArrowNavigatorOptions'] = array(
      '$Class' => '$JssorArrowNavigator$',
      '$AutoCenter' => (int) $options['arrownavigator']['autocenter'],
      '$ChanceToShow' => (int) $options['arrownavigator']['chancetoshow'],
      '$Steps'=> (int) $options['arrownavigator']['steps'],
      '$Scale' => $options['arrownavigator']['scale'],
    );
  }

  // Arrow navigator.
  if ($options['global']['bulletnavigator'] === 1) {
    $variables['bulletnavigator'] = $options['global']['bulletnavigator'];

    // Orientation to drag slide.
    $settings['$BulletNavigatorOptions'] = array(
      '$Class' => '$JssorBulletNavigator$',
      '$ChanceToShow' => (int) $options['bulletnavigator']['chancetoshow'],
      '$ActionMode' => (int) $options['bulletnavigator']['action_mode'],
      '$AutoCenter' =>  (int) $options['bulletnavigator']['autocenter'],
      '$Steps' => (int) $options['bulletnavigator']['steps'],
      '$Rows' => (int) $options['bulletnavigator']['rows'],
      '$SpacingX' => (int) $options['bulletnavigator']['spacingx'],
      '$SpacingY' => (int) $options['bulletnavigator']['spacingy'],
      '$Orientation' => (int) $options['bulletnavigator']['orientation'],
      '$Scale' => $options['bulletnavigator']['scale'],
    );
  }

  // Attach settings.
  $view->element['#attached']['drupalSettings']['views']['jssorViews']['views_dom_id:' . $view->dom_id] = $settings;

  // Create a unique slider ID.
  $variables['slider_id'] = 'slider-dom-id-' . $view->dom_id;

  // Skins.
  $variables['arrowskin'] = $options['arrownavigator']['arrowskin'];
  $variables['bulletskin'] = $options['bulletnavigator']['bulletskin'];

  $default_row_class = isset($options['default_row_class']) ? $options['default_row_class'] : FALSE;
  foreach ($rows as $id => $row) {
    $variables['rows'][$id] = array();
    $variables['rows'][$id]['content'] = $row;
    $variables['rows'][$id]['attributes'] = array();

    if ($default_row_class) {
      $variables['rows'][$id]['attributes']['class'][] = 'views-row';
    }

    if ($row_class = $view->style_plugin->getRowClass($id)) {
      $variables['rows'][$id]['attributes']['class'][] = $row_class;
    }

    $variables['rows'][$id]['attributes'] = new Attribute($variables['rows'][$id]['attributes']);
  }
}
