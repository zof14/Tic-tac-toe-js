
document.getElementById("playButton").addEventListener("click", function() {
        settings();
        window.location.href = "play.html";
    });


    function PopUp() {
        document.getElementById("settingPop").style.display = "flex"; // Show the popup
    }
    function ClosePopUp() {
        document.getElementById("settingPop").style.display = "none"; // Hide the popup
    }
    function settings(){
    const onePlayer = document.getElementById("one").checked;
    const twoPlayers = document.getElementById("two").checked;

    // Determine player count
    let playerCount = onePlayer ? 1 : twoPlayers ? 2 : null;
    localStorage.setItem("players", playerCount)

    }