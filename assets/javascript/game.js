var fightersArr = [
    {
        id: 'kenobi',
        name: 'Obi-Wan Kenobi',
        health: 120,
        attack: 8,
        counter: 8,
        src: 'obi-wan-kenobi.jpg'
    },
    {
        id: 'skywalker',
        name: 'Luke Skywalker',
        health: 100,
        attack: 5,
        counter: 5,
        src: 'luke_skywalker.jpg'
    },
    {
        id: 'sidious',
        name: 'Darth Sidious',
        health: 150,
        attack: 15,
        counter: 15,
        src: 'darth-sidious.jpg'
    },
    {
        id: 'maul',
        name: 'Darth Maul',
        health: 180,
        attack: 20,
        counter: 20,
        src: 'darth-maul.png'
    },
]

$("#fighters").empty();
$("#player").empty();
$("#enemies-available").empty();
$("#defender").empty();
$("#results-txt").empty();
generateFighters();
var playerName = '';
var defenderName = '';
var playerHealth = 0;
var defenderHealth = 0;
var playerBasePwr = 0;
var playerAttack = 0;
var defenderAttack = 0;
var gameOver = false;

$("#fighters").on("click", ".container", function() {
    playerName = $(this).attr("name");
    playerHealth = parseInt($(this).find(".fighter-img").attr("health-pts"));
    playerBasePwr = parseInt($(this).find(".fighter-img").attr("attack-pwr"));
    $(this).detach().appendTo("#player");
    $(".container").not($(this)).detach().appendTo("#enemies-available");
    console.log("playerHealth " + playerHealth);
});

$("#enemies-available").on("click", ".container", function() {
    if ($("#defender").is(':empty')) {
        defenderName = $(this).find(".fighter-img").attr("name");
        defenderHealth = parseInt($(this).find(".fighter-img").attr("health-pts"));
        defenderAttack = parseInt($(this).find(".fighter-img").attr("counter-pwr"));
        $(this).detach().appendTo("#defender");
        $("#results-txt").empty();
    }
});

$(".attack").on("click", function() {
    if (gameOver === false && $("#player").is(':empty') === false) {
        if (playerHealth > 0 && $("#defender").is(':empty') === false) {
            playerAttack += playerBasePwr;
            defenderHealth -= playerAttack;
            playerHealth -= defenderAttack;
            if (defenderHealth > 0) {
                $("#results-txt").html("You attacked " + defenderName + " for " + playerAttack + " damage. <br>" + defenderName + " attacked you back for " + defenderAttack + " damage.")
                $("#player").find("span.fighter-health").text(playerHealth);
                $("#defender").find("span.fighter-health").text(defenderHealth);
            } else if (defenderHealth <= 0) {
                $("#defender").empty();
                if ($("#enemies-available").is(':empty') === false) {
                    $("#results-txt").text("You have defeated " + defenderName + ", you can choose to fight another enemy");
                } else if ($("#enemies-available").is(':empty') === true) {
                    gameOver = true;
                    $("#results-txt").text("You won!!!! GAME OVER!!!");
                    $("#results-txt").append('<br><button class="reset">Restart</button>');
                }
            }
        } else if (playerHealth > 0 && $("#defender").is(':empty') === true) {
            $("#results-txt").text("No enemy here");
        } 
    }

    if (playerHealth <= 0) {
            gameOver = true;
            $("#results-txt").text("You have been defeated...GAME OVER!!!");
            $("#results-txt").append('<br><button class="reset">Restart</button>')
    }
});

$("#results-txt").on("click", ".reset", function() {
    playerName = '';
    defenderName = '';
    playerHealth = 0;
    defenderHealth = 0;
    playerBasePwr = 0;
    playerAttack = 0;
    defenderAttack = 0;
    gameOver = false;
    $("#fighters").empty();
    $("#player").empty();
    $("#enemies-available").empty();
    $("#defender").empty();
    $("#results-txt").empty();
    generateFighters();
});

function generateFighters() {
    for (var i = 0; i < fightersArr.length; i++) {

        var imgContainer = $("<div>"); // create image container
        imgContainer.addClass("container");
        imgContainer.attr("id", fightersArr[i].id);

        var imgName = $("<span>"); // create fighter name span
        imgName.addClass("fighter-name");
        $(imgName).text(fightersArr[i].name);
        $(imgContainer).append(imgName); // append to container
        $(imgContainer).append("<br>");

        var imgFighter = $("<img>"); // create fighter image
        imgFighter.addClass("fighter-img");
        imgFighter.attr("name", fightersArr[i].name);
        imgFighter.attr("src", "./assets/images/" + fightersArr[i].src);
        imgFighter.attr("health-pts", fightersArr[i].health);
        imgFighter.attr("attack-pwr", fightersArr[i].attack);
        imgFighter.attr("counter-pwr", fightersArr[i].counter);
        $(imgContainer).append(imgFighter); // append to container
        $(imgContainer).append("<br>");

        var imgHealth = $("<span>");
        imgHealth.addClass("fighter-health");
        $(imgHealth).text(fightersArr[i].health);
        $(imgContainer).append(imgHealth); // append to container

        $("#fighters").append(imgContainer); // append container to #fighters div
    }
}