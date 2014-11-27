<?php include 'database.php'; ?>
<?php
	$query = "SELECT * FROM shouts ORDER BY id DESC";
	$shouts = mysqli_query($conn, $query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Project 5 JS Shoutbox</title>
<link rel="stylesheet" href="css/lecture22.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"> </script>
<script src="scripts/lecture22.js"></script>
</head>

<body>
<div id="container">

<header>
<h1>JS Shoutbox</h1>
</header>

<div id="shouts">

<ul>
<!-- notice how the PHP calls nest among the normal HTML and characters. 
	 We are feeding the database row by row. -->

<?php while($row = mysqli_fetch_assoc($shouts)) :  ?>

	<li>
		<?php echo $row['name']; ?>: 
		<?php echo $row['shout']; ?> 
		[<?php echo $row['date']; ?>]
	</li>

<?php endwhile;  ?>

</ul>

</div>


<div id="inputs">
<form>
	<label>Name: </label>
	<input type="text" id="name">
	
	<label>Shout text: </label>
	<input type="text" id="shout">
	
	<input type="submit" id="submit" value="SHOUT">
</form>
</div>


</div>
</body>
</html>
