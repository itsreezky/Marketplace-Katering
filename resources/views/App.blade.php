<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="Reezky">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords"
        content="Reezky, React.js, PHP, Bootstrap, Tailwind CSS, Web Development, Frontend Development, Backend Development, JavaScript, HTML, CSS, Portfolio, Projects, Blog, Online Tools, Technology, Responsive Design, Reezky - Startup Server">
    <meta name="description"
        content="Explore Reezky's CloudServer a refined personal server environment crafted for developers. Experience seamless coding, secure data storage, and efficient project management in your dedicated digital oasis.">

    <!-- Page Title -->
    <title>Marketplace Katering</title>

    <!-- Favicon/x-icon -->
    <link rel="shortcut icon" href="https://resource.reezky.cloud/reezky/itsreezky-icon.ico" />

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet">

    <!-- React Controller -->
    @viteReactRefresh
    @vite('resources/js/Controllers/AppController')
</head>

<body>

    <!-- Page Loader -->
    <div id="preloder">
        <div className="loader"></div>
    </div>
    <!-- React Render -->
    <div id="root"></div>

    <!-- Js Plugins -->
    <script src="{{ asset('assets/js/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.magnific-popup.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('assets/js/mixitup.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.countdown.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.slicknav.js') }}"></script>
    <script src="{{ asset('assets/js/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.nicescroll.min.js') }}"></script>
    <script src="{{ asset('assets/js/main.js') }}"></script>

</body>


</html>