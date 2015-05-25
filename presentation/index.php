<!DOCTYPE HTML>
<html lang="en">
<head>
	<title>Backbone Show &amp; Tell</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=792, user-scalable=no">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<link rel="stylesheet" href="highlight/styles/default.css">
	<link rel="stylesheet" href="shower/themes/dark/styles/screen.css">
	<link rel="stylesheet" href="css/all.css">
</head>
<body class="list">
	
	<section class="slide shout"><div><?php include('slides/intro/intro-credits.html'); ?></div></section>

	<section class="slide"><?php include('slides/intro/intro-showreel.html'); ?></section>

	<section class="slide">
		<div>
			<h2>Shower Key Features</h2>
			<ol>
				<li>Built on HTML, CSS and vanilla JavaScript</li>
				<li>All modern browsers are supported</li>
				<li>Slide themes are separated from engine</li>
				<li>Fully keyboard accessible</li>
				<li>Printable to PDF</li>
			</ol>
			<p class="note">Shower ['ʃəuə] noun. A person or thing that shows.</p>
		</div>
	</section>


	<section class="slide">
		<div>
			<h2>Serious Citations</h2>
			<figure>
				<blockquote>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
				</blockquote>
				<figcaption>Marcus Tullius Cicero</figcaption>
			</figure>
		</div>
	</section>

	<section class="slide cover" id="Picture">
		<div>
			<h2>Pictures</h2>
			<img src="" alt="">
		</div>
	</section>

	<section class="slide shout">
		<div>
			<h2>You can even shout this way</h2>
		</div>
	</section>

	<section class="slide bbpa-intro"><div><?php include('slides/bbpa/bbpa-intro.html'); ?></div></section>
	<section class="slide bbpa-sidebar"><div><?php // include('slides/bbpa/bbpa-sidebar.html'); ?></div></section>
	<section class="slide bbpa-stacked-bars"><div><?php // include('slides/bbpa/bbpa-stacked-bars.html'); ?></div></section>

	<div class="progress"><div></div></div>

	<script src="shower/shower.min.js"></script>
  <script data-main="init" src="lib/requirejs/require.js"></script>

	<!-- // <script src="highlight/highlight.pack.js"></script> -->
	
</body>
</html>