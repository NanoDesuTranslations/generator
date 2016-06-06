<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>Nanodesu</title>

  <!-- Bootstrap -->
  <link href="{{rootPath}}static/bootstrap.min.css" rel="stylesheet">
  <link href="{{rootPath}}static/bootstrap-submenu-2.0.1-dist/css/bootstrap-submenu.min.css" rel="stylesheet">
  <link href="{{rootPath}}static/site.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
    <body>
     <nav class="navbar navbar-default box">
       <div class="container header-image">
         <a href="http://www.nanodesutranslations.wordpress.com">
           <img class="img-responsive" border="0" alt="" src="https://sasamisanthetranslation.files.wordpress.com/2013/08/sasami4.png" />
         </a>
       </div>
       <div class="container">
         <!-- Brand and toggle get grouped for better mobile display -->
         <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
           <span class="sr-only">Toggle navigation</span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
         </button>
       </div>

       <!-- Collect the nav links, forms, and other content for toggling -->
       <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav centered">
         <li><a href="#">About this translation</a></li>
         <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Volume 1<span class="caret"></span></a>
          <ul class="dropdown-menu" data-submenu>
           <li><a href="#">Color Illustrations</a></li>
           <li class="dropdown-submenu">
            <a href="#">Part 1: Amaterasu</a>
            <ul class="dropdown-menu">
             <li><a href="#">Chapter 1</a></li>
             <li><a href="#">Chapter 2</a></li>
             <li><a href="#">Chapter 3</a></li>
             <li><a href="#">Chapter 4</a></li>
             <li><a href="#">Chapter 5</a></li>
             <li><a href="#">Chapter 6</a></li>
             <li><a href="#">Chapter 7</a></li>
           </ul>
         </li>
         <li class="dropdown-submenu">
          <a href="#">Part 2: Yamata no Orochi</a>
          <ul class="dropdown-menu">
           <li><a href="#">Chapter 8</a></li>
           <li><a href="#">Chapter 9</a></li>
           <li><a href="#">Chapter 10</a></li>
           <li><a href="#">Chapter 11</a></li>
           <li><a href="#">Chapter 12</a></li>
           <li><a href="#">Chapter 13</a></li>
           <li><a href="#">Chapter 14</a></li>
         </ul>
       </li>
       <li class="dropdown-submenu">
        <a href="#">Part 3: Ninigi no Mikoto</a>
        <ul class="dropdown-menu">
         <li><a href="#">Chapter 15</a></li>
         <li><a href="#">Chapter 16</a></li>
         <li><a href="#">Chapter 17</a></li>
       </ul>
     </li>
     <li><a href="#">Afterword</a></li>
     <li><a href="#">PDF and ePub Version</a></li>
   </ul>
 </li>
 <li class="dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Volume 2<span class="caret"></span></a>
</li>
<li class="dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Volume 3<span class="caret"></span></a>
</li>
<li><a href="#">Update History</a></li>
<li><a href="#">Contact Us</a></li>
</ul>
</div><!-- /.navbar-collapse -->
</div><!-- /.container-fluid -->
</nav>

<div class="container content-container">
  <div class="row">
   <div class="col-md-9 col-xs-12 colpad-right">
    <div class="panel panel-default box">
     <div class="panel-heading">
      <h4>{{series.name}} <a href="{{rootPath}}{{parent_path}}">↸</a></h4>
    </div>
    <div class="panel-body">

      <!-- content start -->
      {{{contents}}}
     <!-- content end -->
   </div>
 </div>
</div>
<div class="col-md-3 hidden-xs hidden-sm colpad-left">
  <div class="panel panel-default box">
   <div class="panel-body">
    <h6>NanoDesu Translations Home</h6>
    <hr>
    <p>
     <a href="http://www.nanodesutranslations.wordpress.com"><img class="img-responsive" border="0" alt="" src="http://nanodesutranslations.files.wordpress.com/2014/05/h6wvikg.png" /></a>
   </p>
 </div>
</div>
</div>
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script type="text/javaScript" src="{{rootPath}}static/bootstrap-submenu-2.0.1-dist/js/bootstrap-submenu.min.js"></script>
<script type="text/javascript">
 $('[data-submenu]').submenupicker();
</script>
</body>
</html>
