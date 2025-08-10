<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comics</title>
    <link rel="stylesheet" href="../../Home/SmeePhaGi.css">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine">
</head>
<html>
<body>
    <a href="../../Home/html/SmeePhaGi.html"><img src="../../Home/img/SmeePhaGi-Logo-TP.png" alt="Logo" class="logo"></a>
    <h1 class="center">SmeePhaGi Comics</h2>
    <img src="../img/1.PNG" alt="comic1" class="center" id="comicstrip">
    <div class="center">
        <ul>
            <li class="character-list"><button class="page-turn" style="position: relative; left: -400px" id="page-turn-prev">Previous</button></li>
            <li class="character-list"><button class="page-turn" style="position: relative; right: -350px" id="page-turn-next">Next</button></li>
        </ul>
    </div>
    <form method="POST" action="Comics-Comments.php" id="comment" class="center">
        <label for="fname">Comment:</label>
        <input type="text" id="comment-text" name="comment_text"><br><br>
        <input type="submit" value="submit">
      </form>
    <script src="../../Home/script.js"></script>
    <?php
    $host = 'localhost';
        $dbname = 'sakila';
        $username = 'root';
        $password = 'dkw2dw+oy';

        $conn = mysqli_connect($host, $username, $password, $dbname);

        if (mysqli_connect_errno()){
            die("Connection error: " .  mysql_connect_error());
        }

        //echo "Connection Successful.";

        $sql = "INSERT INTO comments(comment)
                VALUES(?)";
        
        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt, $sql)){
            die(mysqli_error($conn));
        }

        mysqli_stmt_bind_param($stmt, "s", $_POST['comment_text']);

        mysqli_stmt_execute($stmt);

        //echo "Record saved";

        $sql_read = "SELECT * from comments";
        $result = $conn->query($sql_read);

        $data = [];

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        $data_reversed = array_reverse($data, true);
        ?>
        <br>
        <div class='table-container'>
            <table>
                <?php foreach($data_reversed as $row): ?> 
                <tr>
                    <td><?= htmlspecialchars($row['username']) . " " . htmlspecialchars($row['created_at'])?></td>
                </tr>
                <tr>
                    <td><?= htmlspecialchars($row['comment'])?>
                </tr>
                <tr>
                    <td><hr></td>
                </tr>
                <?php endforeach ?>
            </table>
        </div>
        <br>
        <!-- {
            echo "<table class='center'><tr>" . $item["username"]. 
            " " . $item["created_at"]. "<br>" . $item["comment"] . "<br></tr></table>";
        } -->

        <?php $conn->close(); ?>

</body>
</html>