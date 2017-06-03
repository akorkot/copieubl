<?php
/**
 * Provides a 'Social Wall' Block
 *
 * @Block(
 *   id = "wall_block",
 *   admin_label = @Translation("Social wall block"),
 *   category = @Translation("UBL")
 * )
 */

namespace Drupal\ubl_social_wall\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\ubl_social_wall\Libs\TwitterAPIExchange;

#$path = '/sites/liner44/copieubl.s22777.com/html/vendor/google/apiclient/src';
$path = '/var/www/drupalvm/copieubl/vendor/google/apiclient/src';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

/*
require_once '/sites/liner44/copieubl.s22777.com/html/vendor/google/apiclient/src/Google/Client.php';
require_once '/sites/liner44/copieubl.s22777.com/html/vendor/google/apiclient/src/Google/Auth/AssertionCredentials.php';
require_once '/sites/liner44/copieubl.s22777.com/html/vendor/google/apiclient/src/Google/Service/YouTube.php';
*/

require_once '/var/www/drupalvm/copieubl/vendor/google/apiclient/src/Google/Client.php';
require_once '/var/www/drupalvm/copieubl/vendor/google/apiclient/src/Google/Auth/AssertionCredentials.php';
require_once '/var/www/drupalvm/copieubl/vendor/google/apiclient/src/Google/Service/YouTube.php';

class WallBlock extends BlockBase
{

    private $_twitterSettings = [
        'oauth_access_token' => "17621008-o2UhWvPxKJCskAZRUC9km8APwTbcvdMs4WZEyd2WK",
        'oauth_access_token_secret' => "OD9EnZdz88vffDybH7MU3gQfGfxIxy7SVAOUeyiMAdlxI",
        'consumer_key' => "Zioe3EfggISAKFQSLpkVlJyxP",
        'consumer_secret' => "fdv0SRmRzM286XK4GgGBmTz7FhLRG2fXMUff4hjqNYu2eQtJ2E"
    ];
    private $_twitterAccount = 'UBretagneLoire';
    private $_youtubeDevKey = 'AIzaSyDq7-p-flc-KzaCcUixMN6JQwkA8eN9ADY';
    private $_youtubePlaylist = 'UUh4amch3AqUnG3vksNjIEAw';

    /********************************************************************************/

    /**
     * {@inheritdoc}
     */
    public function build()
    {
        // R�cup�ration du bloc WikiRadio
        $block = \Drupal\block\Entity\Block::load('wallwikiradio');
        $wikiradio = \Drupal::entityTypeManager()->getViewBuilder('block')->view($block);
        /**/
        // Injection des data
        $data = [
            'twitter_account' => $this->_twitterAccount,
            'twitter_baseurl' => 'http://twitter.com/' . $this->_twitterAccount . '/',
            'twitter_statusurl' => 'http://twitter.com/' . $this->_twitterAccount . '/status/',
            'now' => [
                'twitter' => $this->_getTwitter(4),
                'youtube' => $this->_getYoutube(1),
                'actu_alaune' => $this->_getActuAlaune(),
                'actus' => $this->_getActus(5, true),
            ],
            'twitter' => $this->_getTwitter(14),
            'youtube' => $this->_getYoutube(14),
            'actus' => $this->_getActus(10),
            'wikiradio' => $wikiradio,
        ];

        /**/
        return array(
            '#theme' => 'hp_wall_template',
            '#wall' => $data,
        );
    }

    /********************************************************************************/

    /**
     * R�cup�ration de l'actualit� � la une
     * @return array
     */
    private function _getActuAlaune()
    {
        $storage = \Drupal::entityTypeManager()->getStorage('node');
        $nids = $storage->getQuery()
            //->condition('type', array('article'), 'IN')
            ->condition('type', array('article', 'dossiers', 'reportages'), 'IN')
            ->condition('status', 1)
            ->condition('sticky', 1)
            ->sort('changed', 'DESC')
            ->range(0, 1)
            ->execute();
        $actuUne = false;
        if (!empty($nids)) {
            $actuUne = reset($storage->loadMultiple($nids));

            /***/
            $thumb = false;
            if (isset($actuUne->field_image->entity) && !empty($actuUne->field_image->entity)) {
                $curImage = $actuUne->get('field_image')->get(0);
                $fid = $curImage->target_id;
                $file = \Drupal\file\Entity\File::load($fid);
                //$image_uri = \Drupal\image\Entity\ImageStyle::load('500x335')->buildUrl($file->getFileUri());
                $image_uri = \Drupal\image\Entity\ImageStyle::load('497x335')->buildUrl($file->getFileUri());
                $thumb = [
                    'src' => $image_uri,
                    'alt' => $curImage->alt,
                ];
            }
            /***/
            $tCat = '';
            if (!empty($actuUne->field_tags->entity)) {
                $tCat = $actuUne->field_tags->entity->label();
            }
            if (!empty($actuUne->field_categorie->entity)) {
                $tCat = $actuUne->field_categorie->entity->label();
            }
            /***/
            $excerpt = \Drupal\Component\Utility\Unicode::truncate($actuUne->body->summary, 50, true, true);
            /***/

            $actuAlaune = [
                'title' => $actuUne->getTitle(),
                'body' => $actuUne->body->value,
                'excerpt' => $excerpt,
                'cat' => $tCat,
                'url' => $actuUne->urlInfo('canonical'),
                'thumb' => $thumb,
            ];
        }
        return $actuAlaune;
    }

    /**
     * R�cup�ration du flux twitter
     * @param int $count
     * @return mixed
     * @throws \Drupal\ubl_social_wall\Libs\Exception
     */
    private function _getTwitter($count = 10)
    {
        /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
        $settings = $this->_twitterSettings;
        $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $getfield = '?count=' . $count . '&screen_name=' . $this->_twitterAccount . '';
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $json = $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest(true, array(
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_SSL_VERIFYPEER => 0,
            ));

//        var_dump(json_decode($json));die();

        return json_decode($json);
    }

    /**
     * R�cup�ration du flux Youtube
     * @param int $count
     * @return array
     */
    private function _getYoutube($count = 10)
    {
        $client = new \Google_Client();
        $client->setDeveloperKey($this->_youtubeDevKey);
        $youtube = new \Google_Service_YouTube($client);
        $m = $youtube->playlistItems->listPlaylistItems('snippet', array('playlistId' => $this->_youtubePlaylist, 'maxResults' => $count));
        $videos = $m->getItems();
        $r = [];
        foreach ($videos as $video) {
            $r[] = [
                'id' => $video->snippet['resourceId']['videoId'],
                'title' => $video->snippet['title'],
                'description' => $video->snippet['description'],
                'date' => $video->snippet['publishedAt'],
                'thumbs' => $video->snippet['thumbnails'],
            ];
        }
        return $r;
//        echo '<pre>';
//        var_dump($r);
//        print_r($videos);
//        die('youtube');
    }

    /**
     *
     */
    private function _getActus($count = 10, $justNow = false)
    {
        $r = false;
        /**/
        $storage = \Drupal::entityTypeManager()->getStorage('node');
        $tQuery = $storage->getQuery();
        if ($justNow) {
//            $tQuery = $tQuery->condition('type', array('article','reportages','portraits','dossiers'), 'IN');
        } else {
            $tQuery = $tQuery->condition('type', 'article');
        }
        $tQuery = $tQuery->condition('status', 1)
            ->sort('changed', 'DESC')
            ->range(0, $count);
        if ($justNow) {
            $tQuery->condition('field_display_bloc_now', 1);
        }
        $nids = $tQuery->execute();

        if (!empty($nids)) {
            $actus = $storage->loadMultiple($nids);
            if (is_array($actus)) {
                foreach ($actus as $actuUne) {
                    /***/
                    $thumb = false;
                    if (isset($actuUne->field_image->entity) && !empty($actuUne->field_image->entity)) {
                        if ($actuUne->hasField('field_tags') && !empty($actuUne->field_tags->entity)) {
                            $cat = $actuUne->field_tags->entity->label();
                        }
                        if ($actuUne->hasField('field_categorie') && !empty($actuUne->field_categorie->entity)) {
                            $cat = $actuUne->field_categorie->entity->label();
                        }
                        $curImage = $actuUne->get('field_image')->get(0);
                        $fid = $curImage->target_id;
                        $file = \Drupal\file\Entity\File::load($fid);
                        $image_uri = \Drupal\image\Entity\ImageStyle::load('235x113')->buildUrl($file->getFileUri());
                        $thumb = [
                            'src' => $image_uri,
                            'alt' => $curImage->alt,
                        ];
                    }
                    /***/
                    $excerpt = \Drupal\Component\Utility\Unicode::truncate($actuUne->body->summary, 90, true, true);
                    /***/
                    $r[] = [
                        'title' => $actuUne->getTitle(),
                        'title_t' => \Drupal\Component\Utility\Unicode::truncate($actuUne->getTitle(), 50, true, true),
                        'body' => $actuUne->body->value,
                        'excerpt' => $excerpt,
                        'cat' => $cat,
                        'url' => $actuUne->urlInfo('canonical'),
                        'thumb' => $thumb,
                    ];
                    /***/
                }
            }
        }
        /**/
        return $r;
    }

    /********************************************************************************/

}

?>
