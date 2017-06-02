<?php

/**
 * @file
 * Contains \Drupal\jssor\Plugin\Field\FieldFormatter\JssorFieldFormatter.
 */

namespace Drupal\jssor\Plugin\Field\FieldFormatter;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FieldItemInterface;
use Drupal\image\Plugin\Field\FieldFormatter\ImageFormatterBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\field\FieldConfigInterface;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\Core\Form\FormStateInterface;


/**
 * Plugin implementation of the 'jssor' formatter.
 *
 * @FieldFormatter(
 *   id = "jssor_formatter",
 *   label = @Translation("Jssor Gallery"),
 *   field_types = {
 *     "image_",
 *     "file_"
 *   },
 * )
 */
class JssorFieldFormatter extends ImageFormatterBase implements ContainerFactoryPluginInterface {

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
  }

}
