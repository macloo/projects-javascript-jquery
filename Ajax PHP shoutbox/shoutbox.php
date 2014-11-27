<?php include 'database.php'; ?>

<?php
	// validate
	// first look at the POST data and the variables
	if (isset($_POST['name']) && isset($_POST['shout'])) {
		
		// create new PHP variables
		$name = mysqli_real_escape_string($conn, $_POST['name']);
		$shout = mysqli_real_escape_string($conn, $_POST['shout']);
		$date = mysqli_real_escape_string($conn, $_POST['date']);
		// the function prevents injected malicious code
		
		// set time zone
		date_default_timezone_set('America/New_York');
		$date = date('h:i:s a', time());
		
		// the SQL query: column names, then variables to insert
		$query = "INSERT INTO shouts (name, shout, date)
		VALUES ('$name', '$shout', '$date')";
		
		if (!mysqli_query($conn, $query)) {
			echo 'Error: '.mysqli_error($conn);
		} else {
			echo '<li>'.$name.': '.$shout.' ['.$date.'] </li>';
			// concatenate with '.' in PHP
		}
	}
?>
