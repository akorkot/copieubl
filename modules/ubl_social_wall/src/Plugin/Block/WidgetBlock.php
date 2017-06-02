<?php
/**
 * Provides a 'Social Widget' Block
 *
 * @Block(
 *   id = "widget_block",
 *   admin_label = @Translation("Social wall widget block"),
 *   category = @Translation("UBL")
 * )
 */

namespace Drupal\ubl_social_wall\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\ubl_social_wall\Libs\TwitterAPIExchange;

class WidgetBlock extends BlockBase
{

    private $_twitterSettings=[
        'oauth_access_token' => "17621008-o2UhWvPxKJCskAZRUC9km8APwTbcvdMs4WZEyd2WK",
        'oauth_access_token_secret' => "OD9EnZdz88vffDybH7MU3gQfGfxIxy7SVAOUeyiMAdlxI",
        'consumer_key' => "Zioe3EfggISAKFQSLpkVlJyxP",
        'consumer_secret' => "fdv0SRmRzM286XK4GgGBmTz7FhLRG2fXMUff4hjqNYu2eQtJ2E"
    ];
    private $_twitterAccount='UBretagneLoire';
    private $_youtubeDevKey='AIzaSyDq7-p-flc-KzaCcUixMN6JQwkA8eN9ADY';
    private $_youtubePlaylist='UUh4amch3AqUnG3vksNjIEAw';

    /********************************************************************************/

    /**
     * {@inheritdoc}
     */
    public function build()
    {
        // Injection des data
        $data = [
            'yt_chaine' => 'https://www.youtube.com/channel/UCh4amch3AqUnG3vksNjIEAw',
            //'scoop_it' => 'https://www.scoop.it/u/universite-bretagne-loire',
            'twitter_account' => $this->_twitterAccount,
            'twitter_baseurl' => 'http://twitter.com/'.$this->_twitterAccount.'/',
            'twitter_statusurl' => 'http://twitter.com/'.$this->_twitterAccount.'/status/',
            'twitter' => $this->_getTwitter(6),
            'youtube' => $this->_getYoutube(4),
        ];
        /**/
//        var_dump($data);
//        die();
        /**/
        return array(
//            '#markup' => 'test',
            '#theme' => 'widget_template',
            '#wall' => $data,
        );
    }

    /********************************************************************************/

    /**
     * R�cup�ration du flux twitter
     * @param int $count
     * @return mixed
     * @throws \Drupal\ubl_social_wall\Libs\Exception
     */
    private function _getTwitter($count=10)
    {
        /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
        $settings = $this->_twitterSettings;
        $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $getfield = '?count='.$count.'&screen_name='.$this->_twitterAccount.'';
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $json = $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest(true,array(
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
    private function _getYoutube($count=10)
    {
        $client = new \Google_Client();
        $client->setDeveloperKey($this->_youtubeDevKey);
        $youtube = new \Google_Service_YouTube($client);
        $m = $youtube->playlistItems->listPlaylistItems('snippet', array('playlistId'=>$this->_youtubePlaylist, 'maxResults'=>$count));
        $videos = $m->getItems();
        $r=[];
        foreach($videos as $video){
            $r[]=[
                'id' => $video->snippet['resourceId']['videoId'],
                'title' => $video->snippet['title'],
                'description' => $video->snippet['description'],
                'date' => $video->snippet['publishedAt'],
                'thumbs' => $video->snippet['thumbnails'],
            ];
        }
        return $r;
        echo '<pre>';
        var_dump($r);
        print_r($videos);
        die('youtube');
    }

    /********************************************************************************/

}

?>
