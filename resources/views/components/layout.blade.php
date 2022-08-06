<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->

        <script src="https://cdn.tailwindcss.com"></script>
        <!-- Styles -->   
        <link href="css/app.css" rel="stylesheet">
        <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
        <style>
            :root{
                --bg-color:#181817;
                --word-color:#A9A8A8;
            }
        </style>


    </head>
    <body class="antialiased">
        <div id="app">
            {{$slot}}
        </div>
        <script src="js/app.js" ></script>
    </body>
</html>
