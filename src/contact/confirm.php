<?php

function textCheck($txt){
	$txt = htmlspecialchars($txt, ENT_QUOTES);
	return $txt;
}

mb_language("Japanese");
mb_internal_encoding("UTF-8");
$name = textCheck($_POST["name"]);
$email = textCheck($_POST["email"]);
$email_conf = textCheck($_POST["email_conf"]);
$question = textCheck($_POST["question"]);
$mode = $_POST["mode"];

if($mode == "send"){
	$title = "ねわざワールド品川 - ありがとうございます";
}else{
	$title = "ねわざワールド品川 - 確認画面";
}

?>
<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/ContactPage">
<head prefix="og: http://ogp.me/ns#  article: http://ogp.me/ns/article#">
	<meta charset="utf-8">
	<title>お問い合わせ - ねわざワールド品川公式サイト</title>
	<meta name="description" content="ねわざワールド品川 - 品川区内で土日を中心にブラジリアン柔術の練習をしております。お問い合わせはこちらからどうぞ。" />
	<meta name="keywords" content="ねわざワールド,品川,渋谷,中延,ブラジリアン柔術,長谷川秀樹,ねわワ,寝技,サークル" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="/reset.css" rel="stylesheet" type="text/css" media="screen,print" />
	<link href="/style.css" rel="stylesheet" type="text/css" media="screen,print" />
	<link rel="shortcut icon" href="/favicon.ico">

	<meta property="og:title" content="お問い合わせ - ねわざワールド品川公式サイト" >
	<meta property="og:type" content="article" />
	<meta property="og:description" content="ねわざワールド品川 - 品川区内で土日を中心にブラジリアン柔術の練習をしております。お問い合わせはこちらからどうぞ。">
	<meta property="og:url" content="http://newawa-shinagawa.versus.jp/contact/">
	<meta property="og:image" content="http://newawa-shinagawa.versus.jp/newawa.png">
	<meta property="og:site_name" content="ねわざワールド品川公式サイト">

</head>
<body>
	<div class="wrapper">
		<div class="bgColor_c"><p class="here">contact</p></div>
		<!-- .bgColor -->
		<div class="bgLine">
			<header class="header">
				<div class="title"><a href="/index.html"><img class="logo" src="/images/logo.png" width="163" height="162" alt="ねわざワールド品川" /></a>
					<h1><a href="/index.html"><img src="/images/title.png" width="494" height="161" alt="ブラジリアン柔術・グラップリング　ねわざワールド品川公式サイト　NEWAZA-WORLD SHINAGAWA" /></a></h1>
				</div>
				<!-- .title -->
				<ul class="navi_s" itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement">
					<li itemprop="name" class="contact">
						<h2><a itemprop="url" href="/contact/index.html"><img src="/images/contact.png" width="119" height="170" alt="お問い合わせ - ねわざワールド品川" /></a></h2>
					</li>
					<li itemprop="name" class="bbs rumble">
						<h2><a itemprop="url" href="http://8249.teacup.com/newaza/bbs"><img src="/images/bbs.png" width="83" height="82" alt="BBS - ねわざワールド品川" /></a></h2>
					</li>
				</ul>
			</header>
			<!-- .header -->

			<nav class="gnavi">
				<ul class="gnavi_list" itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement">
					<li class="message" itemprop="name">
						<h2><a itemprop="url" href="/message/index.html"><img src="/images/message.png" width="308" height="77" alt="ごあいさつ - ねわざワールド品川" /></a></h2>
					</li>
					<li class="instractor" itemprop="name">
						<h2><a itemprop="url" href="/instractor/index.html"><img src="/images/instractor.png" width="308" height="77" alt="指導者 - ねわざワールド品川" /></a></h2>
					</li>
					<li class="system" itemprop="name">
						<h2><a itemprop="url" href="/system/index.html"><img src="/images/system.png" width="308" height="77" alt="システム - ねわざワールド品川" /></a></h2>
					</li>
					<li class="blog" itemprop="name">
						<h2><a itemprop="url" href="http://ameblo.jp/niwatoritokotori/"><img src="/images/blog.png" alt="ブログ - ねわざワールド品川" width="308" height="77"/></a></h2>
					</li>
					<li class="link" itemprop="name">
						<h2><a itemprop="url" href="/link/index.html"><img src="/images/link.png" width="308" height="77" alt="リンク集 - ねわざワールド品川" /></a></h2>
					</li>
				</ul>
			</nav>
			<!-- .gnavi -->

			<div class="vhts">
				<h2><a href="http://vhtsjp.com/" target="_blank"><img src="/images/logo-vhts.png" width="600" height="627" alt="VHTS" /></a></h2>
			</div>
			<div class="yokohama"><a href="http://newawa-yokohama.com/" target="_blank" class="link-yokohama"><img src="/images/logo-yokohama.png" alt="ねわざワールド横浜" width="150" height="139" class="logo-yokohama"></a></div>

			<div class="mobile">
				<h2><a href="http://x20.peps.jp/newaza13"><img src="/images/mobile.png" width="214" height="214" alt="モバイルサイト - ねわざワールド品川" /></a></h2>
			</div>
			<footer class="footer_w">
				<nav class="fnav_wrap">
					<ul class="footer_nav" itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement">
						<li itemprop="name"><a itemprop="url" href="/index.html">TOP </a></li>
						<li itemprop="name"><a itemprop="url" href="/message/index.html"> ご挨拶 </a></li>
						<li itemprop="name"><a itemprop="url" href="/instractor/index.html"> 指導者 </a></li>
						<li itemprop="name"><a itemprop="url" href="/system/index.html"> システム </a></li>
						<li itemprop="name"><a itemprop="url" href="http://ameblo.jp/niwatoritokotori/"> BLOG </a></li>
						<li itemprop="name"><a itemprop="url" href="/link/index.html"> リンク </a></li>
						<li itemprop="name"><a itemprop="url" href="http://8249.teacup.com/newaza/bbs"> 掲示板 </a></li>
						<li itemprop="name"><a itemprop="url" href="/contact/index.html"> お問い合わせ</a></li>
					</ul>
				</nav>
				<address>
					Copyright (C) <span itemprop="copyrightYear">2011</span> <span itemprop="copyrightHolder">ねわざワールド品川</span>. All Rights Reserved.
				</address>
			</footer>
			<!-- .footer -->
			<dl class="contents" itemprop="mainContentOfPage">
				<dt class="contents_dt">お問い合わせ</dt>
				<dd class="c_contact contents_dd">
					<div class="inputForm">
						<?php if($mode != "send"){ ?>
						<h3>お名前</h3>
						<p>
							<?php if(empty($name)){
								$error = "お名前を入力してください";
								echo $error;
							}else{
								echo $name."&nbsp;様";
							}
							?>
						</p>
						<h3>メールアドレス</h3>
						<p>
							<?php if(! $email){
								$error = "メールアドレスを入力してください";
								echo $error;
							}else{
								if($email != $email_conf){
									$error = "入力された確認用メールアドレスが違います。";
									echo $error;
								}else{
									echo $email;
								}
							}
							?>
						</p>
						<h3>お問い合わせ内容</h3>
						<p>
							<?php if(mb_strlen($question) > 1000){
								$error = "質問が制限文字数を超えています";
								echo $error;
							}else{
								$question = nl2br($question);
								echo $question;
							}
							?>
						</p>
						<p>
							<?php if($error){
								echo "<input type='button' value='戻る' onclick='history.back()' />\n";
							}else{
								echo "<form action='confirm.php' method='post'>\n";
								echo "<input type='hidden' name='name' class='reset' value='{$name}' />\n";
								echo "<input type='hidden' name='email' value='{$email}' />\n";
								echo "<input type='hidden' name='question' value='{$question}' />\n";
								echo "<input type='hidden' name='mode' value='send' />\n";
								echo "<input type='submit' class='submit' value='送信' /></div>\n";
								echo "</form>\n";
							}
							?>
						</p>
						<?php
					}else{
						?>
						<h3>お問い合わせ有難うございます</h3>
						<p>この度はお問い合わせ頂きまして誠に有難うございます。<br />
							入力されたメールアドレスに確認メールを送信致しました。<br />
							しばらく経っても届かない場合は、メールアドレスに誤りがある場合があります。<br />
							ご確認の上、再度ご送信ください。</p>
						</div>
						<?php

						$to = "rere39@yahoo.co.jp";
						$subject = "ねわざワールド品川サイトにお問い合わせがありました。";

						$message = "お問い合わせの内容です。\n\n";
						$message .= "お名前:{$name}\n";
						$message .= "メールアドレス:{$email}\n";
						$question = htmlspecialchars_decode($question,ENT_QUOTES);
						$question = str_replace("< br />", "", $question);
						$message.= "質問:{$question}\n";

						$add_header = "Content-Type: text/plain; charset=ISO-2022-JP\n";
						$add_header.= "From:newawa-shinagawa<rere39@yahoo.co.jp>\n";
						$add_header.= "Content-Transfer-Encoding: 7bit\n";

						mb_send_mail($to,$subject,$message,$add_header);

						$to2 = $email;
						$subject2 = "お問い合わせ有難うございます - ねわざワールド品川";
						$message2 = "この度は、ねわざワールド品川にお問い合わせ頂きまして誠に有難うございます。
						原則として、土日祝を除く三日以内にお返事いたしますので、しばらくお待ちください。

						返信がない場合、あるいはこのメールにお心当たりが無い場合は、<rere39@yahoo.co.jp>まで
						お問い合わせください。


						ねわざワールド品川";

						mb_send_mail($to2,$subject2,$message2,$add_header);
					}

					?>
				</dd>
			</dl>
			<!-- .contents -->
		</div>
		<!-- .bgLine -->
	</div>
	<!-- .wrapper -->
	<div class="floatWindow">
		<dl>
			<dt>ねわざワールド品川練習予定<a href="index.html" class="close"><img src="/images/switch.png" alt="閉じる" /></a></dt>
			<dd><iframe title="ねわざワールド品川練習予定" src="https://www.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showTz=0&amp;height=300&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=hasegawahideki1%40gmail.com&amp;color=%232952A3&amp;ctz=Asia%2FTokyo" style=" border-width:0 " width="500" height="305" frameborder="0" scrolling="no"></iframe></dd>
		</dl>
	</div>
<script src="http://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="http://code.jquery.com/jquery-migrate-1.1.1.min.js" type="text/javascript"></script>
<script src="/js/jQueryRotate.2.2.js" type="text/javascript"></script>
<script src="/js/jquery.color-2.1.2.min.js" type="text/javascript"></script>
<script src="/js/jquery.jrumble.1.3.min.js" type="text/javascript"></script>
<script src="/js/newawa.js" type="text/javascript"></script>
<script src="/js/rotate.js" type="text/javascript"></script>
</body>
</html>
