const responseWait = document.querySelector("#responseWait");
const makeMove = document.querySelector("#makeMove");
const result = document.querySelector("#result");

responseWait.addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/waitTillMoveMade", {
        method: "get",
        headers: { "Keep-Alive": "timeout=11, max=100" },
    });
    const resJson = await res.json();

    result.innerText = resJson.text;
});

makeMove.addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/makeMove", {
        method: "post"
    })

    const resJson = await res.json()
    console.log(resJson.text)
})
