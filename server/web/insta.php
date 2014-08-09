<?php

	use Symfony\Component\HttpFoundation\Request;
	use Symfony\Component\HttpKernel\HttpKernelInterface;
	use Symfony\Component\HttpFoundation\Response;

	// web/index.php
	require_once __DIR__.'/../vendor/autoload.php';

	$app = new Silex\Application();

	$app['debug'] = TRUE;

	$app->get('/', function() {
		
		$client_id 		= "0ed0e250ea854a129e9a849a8ee0ed9c";
		$client_secret 	= "4b0cfa0a8ebd49c98d4edaa3f9eabcad";

		$access_token 	= "183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3";
		$user_id		= "183356248";

		$url = "https://api.instagram.com/v1/media/popular";
		$url .= "?client_id=$client_id";

		//perform external request
		//TODO: is there a bundle for this?
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$response = curl_exec($ch);
		$data = json_decode($response);
		curl_close($ch);

		return "home page ...";
	});

	$app->get('follows/', function() {

		/*$access_token 	= "183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3";
		$user_id		= "183356248";

		$url =  "https://api.instagram.com/v1/users/$user_id/follows";
		$url .= "?access_token=$access_token";

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);		
		$data = curl_exec($ch);
		curl_close($ch);

		if($data['meta']['code'] == 200)
		{
			$pagination = $data['pagination']['next_url'];
			
			$users = $data['data'];

			$output = $users;
		}
		else
		{
			//error ...
			$output = FALSE;
		}*/

		$file = fopen("follows.txt", "r");
		$line = fgets($file);
		fclose($file);

		return $line;

	});

	$app->get('followed-by/', function() {

		/*$access_token 	= "183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3";
		$user_id		= "183356248";

		$url =  "https://api.instagram.com/v1/users/$user_id/followed-by";
		$url .= "?access_token=$access_token";

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);		
		$data = curl_exec($ch);
		curl_close($ch);

		if($data['meta']['code'] == 200)
		{
			$pagination = $data['pagination']['next_url'];

			$users = $data['data'];

			$output = $users;
		}
		else
		{
			//error ...
			$output = FALSE;
		}*/

		$file = fopen("followed-by.txt", "r");
		$line = fgets($file);
		fclose($file);

		return $line;
	});	

	//return users that you follow who don't follow you back
	$app->get('follows-not', function() use($app) {

		$file = fopen("follows.txt", "r");
		$line1 = fgets($file);
		fclose($file);

		$file = fopen("followed-by.txt", "r");
		$line2 = fgets($file);
		fclose($file);				

		
		
		return $line1;

		$data = json_decode($line1);

		return $data;
		
		$follows_array = $data['data'];


		return $follows_array;



		$data = json_encode($line2);
		$followedby_array = $data['data'];

		foreach($follows_array as $u)
		{
			var_dump($u);
			break;
		}

		$output = array();

		return $output;

	});

	$app->get('login/', function() use($app) {

		$client_id 		= "0ed0e250ea854a129e9a849a8ee0ed9c";
		$redirect_url 	= "http://localhost/instagram-friends-manager/web/instagram-callback";

		$url = "https://api.instagram.com/oauth/authorize/";
		$url .= "?client_id=$client_id";
		$url .= "&redirect_uri=$redirect_url";
		$url .= "&response_type=code";

		return $app->redirect($url);
	});

	$app->get('instagram-callback/', function(Request $request) use($app) {

		//TODO: figure out how authentication works...
		//for now I've got an access_token so whatever

		if($request->query->has('code') === TRUE)
		{
			$code 			= $request->get('code');

			$client_id 		= "0ed0e250ea854a129e9a849a8ee0ed9c";
			$client_secret 	= "4b0cfa0a8ebd49c98d4edaa3f9eabcad";
			$redirect_url 	= "http://localhost/instagram-friends-manager/web/instagram-callback";

			$url 			= 'https://api.instagram.com/oauth/access_token';

			$app_identifiers = "client_id=$client_id";
			$app_identifiers .= "&client_secret=$client_secret";
			$app_identifiers .= "&grant_type=authorization_code";
			$app_identifiers .= "&redirect_uri=$redirect_url";
			$app_identifiers .= "&code=$code";

			//TODO: not sure if required
			$app_identifiers_count = 5;

			//cURL POST
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_POST, $app_identifiers_count);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $app_identifiers);
			$data = curl_exec($ch);
			curl_close($ch);
		}
		/*elseif($request->query->has('access_token') === TRUE)
		{	
			$access_token = $request->get('access_token');

			var_dump("yaaay: $access_token");
		}
		else
		{
			var_dump("error!");
		}*/

		return TRUE;
	});

	$app->get('authenticated/', function(Request $request) use ($app) {

		return 'whaaaat';

	});

	$app->run();

?>