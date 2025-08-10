<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activities</title>
    <link rel="stylesheet" href="../SmeePhaGi.css">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine">
</head>
<?php 

    function phaScore($s1, $s2, $s3, $s4, $s5){
        $pha = 0;

        if ($s1 > 3){
            $pha += 1;
        }

        if ($s2 < 3){
            $pha += 1;
        }

        if ($s3 < 3){
            $pha += 1;
        }

        if ($s4 > 3){
            $pha += 1;
        }

        if ($s5 < 3){
            $pha += 1;
        }

        return $pha;
    }

    function smeeScore($s1, $s2, $s3, $s4, $s5){
        $smee = 0;

        if ($s1 < 3){
            $smee += 1;
        }

        if ($s2 > 3){
            $smee += 1;
        }

        if ($s3 > 3){
            $smee += 1;
        }

        if ($s4 < 3){
            $smee += 1;
        }

        if ($s5 > 3){
            $smee += 1;
        } 

        return $smee;
    }

    function giScore($s1, $s2, $s3, $s4, $s5){
        $gi = 0;

        if ($s1 < 3){
            $gi += 1;
        }

        if ($s2 < 3){
            $gi += 1;
        }

        if ($s3 > 3){
            $gi += 1;
        }

        if ($s4 < 3){
            $gi += 1;
        }

        if ($s5 < 3){
            $gi += 1;
        }

        return $gi;
    }

    function getMaxScore($smee, $pha, $gi){
        if ($smee > $pha & $smee > $gi){
            return 'Smee';
        } else if ($pha > $smee & $pha > $gi){
            return 'Pha';
        } else if ($gi > $pha & $gi > $smee){
            return 'Gi';
        } else {
            return 'Tiebreaker';
        }

    }

    function character ($s1, $s2, $s3, $s4, $s5) {
            //print_r("$s1 $s2 $s3 $s4 $s5");
            $smee = smeeScore($s1, $s2, $s3, $s4, $s5);
            $pha = phaScore($s1, $s2, $s3, $s4, $s5);
            $gi = giScore($s1, $s2, $s3, $s4, $s5);

            $result = getMaxScore($smee, $pha, $gi);
            return $result;
        }
    $result = character($_POST["q1"], $_POST["q2"], $_POST["q3"],
    $_POST["q4"], $_POST["q5"]);
    if ($result != 'Tiebreaker'){
        echo "<h2 class='center'>Your spirit animal is " . $result . "!</h2>";
        echo "<img src='../img/$result Headshot Hover.png' alt=$result class='center'>";
    } else {
        echo "<h2 class='center'>Your spirit animal is... all of them! You are a perfect combo of Smee-Pha-Gi!</h2>";
        echo "<div class='center'>
        <ul>
            <li class='character-list'>
                 <img id='smee-img'>
            </li>
            <li class='character-list'>
                 <img id='pha-img'>
            </li>
            <li class='character-list'>
                <img id='gi-img'>
        </li>
        </ul> 
    </div>";
    }

    ?>
    <br>
    <a href="Activities.html" class='center'>Return</a>
</html>