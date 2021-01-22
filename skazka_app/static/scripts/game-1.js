
// Matching Game 1.1
var x = 0;
    x++;

    function gameOver(x) {
        if (x > 5) {
            result.innerText = "All correct!"
        }
    }

    function dragStart001(event) {
        event.dataTransfer.setData("choice001", event.target.id);
    }

    function dragStart002(event) {
        event.dataTransfer.setData("choice002", event.target.id);
    }

    function dragStart003(event) {
        event.dataTransfer.setData("choice003", event.target.id);
    }

    function dragStart004(event) {
        event.dataTransfer.setData("choice004", event.target.id);
    }

    function dragStart005(event) {
        event.dataTransfer.setData("choice005", event.target.id);
    }

    function allowDrop001(event) {
        event.preventDefault();
    }

    function allowDrop002(event) {
        event.preventDefault();
    }

    function allowDrop003(event) {
        event.preventDefault();
    }

    function allowDrop004(event) {
        event.preventDefault();
    }

    function allowDrop005(event) {
        event.preventDefault();
    }

    function drop006(event) {
        let data = event.dataTransfer.getData("choice001");
        event.target.appendChild(document.getElementById(data));
        score001.innerHTML = x++;
        x = x++;
        place001.innerHTML = "ворона";
        gameOver(x);
    }

    function drop007(event) {
        let data = event.dataTransfer.getData("choice002");
        event.target.appendChild(document.getElementById(data));
        score001.innerHTML = x++;
        x = x++;
        place002.innerHTML = "динозавр";
        gameOver(x);
    }

    function drop008(event) {
        let data = event.dataTransfer.getData("choice003");
        event.target.appendChild(document.getElementById(data));
        score001.innerHTML = x++;
        x = x++;
        place003.innerHTML = "крокодил";
        gameOver(x);
    }

    function drop009(event) {
        let data = event.dataTransfer.getData("choice004");
        event.target.appendChild(document.getElementById(data));
        score001.innerHTML = x++;
        x = x++;
        place004.innerHTML = "пенгвин";
        gameOver(x);
    }

    function drop010(event) {
        let data = event.dataTransfer.getData("choice005");
        event.target.appendChild(document.getElementById(data));
        score001.innerHTML = x++;
        x = x++;
        place005.innerHTML = "фламинго";
        gameOver(x);
        console.log(x, "X EQUALS")
    }





