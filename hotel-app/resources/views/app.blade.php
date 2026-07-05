<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kinga Resorts - Adventure in Comfort, Luxury in Nature. Discover serenity in our exclusive nature retreat in Machakos County.">
    <meta name="keywords" content="Kinga Resorts, Luxury Resort Machakos, Glamping Kenya, Machakos Hotel, Resort in Machakos, Tented Camp">
    <meta property="og:title" content="Kinga Resorts">
    <meta property="og:description" content="Adventure in Comfort, Luxury in Nature. Discover serenity in our exclusive nature retreat in Machakos County.">
    <meta property="og:image" content="/image assets/logos/kinga_script_logo.png">
    <meta property="og:type" content="website">
    <meta name="theme-color" content="#c5a880">
    <title inertia>Kinga Resorts</title>
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/image assets/logos/color1-white_icon_transparent_background.png">
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

    @routes
    @viteReactRefresh
    @vite(['resources/css/app.scss', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
