//   const topics = [
//     { id: 1, title: "html", body: "html is ..." },
//     { id: 2, title: "css", body: "css is ..." },
//     { id: 3, title: "javascript", body: "javascript is ..." },
//   ];
//   let nextId = 4;
//   let nextId = topics.length + 1;
let selectedId = null;
function navHandler(e, t) {
  //e는 event / t 는 this(tag가 나온다)
  // console.log(e, t);
  //1.링크가 작동하지 않아야 한다.
  e.preventDefault();
  //2.아이디 값을 알아낸다.
  selectedId = Number(e.target.id);
  read();
}
async function nav() {
  // fetch("http://localhost:3000/topics").then((response) =>
  //   response.json().then((topics) => {
  //     const tag = topics
  //       .map(
  //         (e) =>
  //           `<li>
  //         <a href="/read/${e.id}" id="${e.id}" onclick="navHandler(event, this);">
  //           ${e.title}
  //         </a>
  //       </li>`
  //       )
  //       .join("");
  //     document.querySelector("nav>ol").innerHTML = tag;
  //   })
  // );
  document.querySelector("nav>ol").innerHTML = "Loading...";
  let response = await fetch("http://localhost:3000/topics");
  let topics = await response.json();
  const tag = topics
    .map(
      (e) =>
        `<li>
                <a href="/read/${e.id}" id="${e.id}" onclick="navHandler(event, this);">
                  ${e.title}
                </a>
              </li>`
    )
    .join("");
  document.querySelector("nav>ol").innerHTML = tag;
}
function welcome() {
  document.querySelector("article").innerHTML = `<h2>Welcome</h2>Hello, WEB`;
  selectedId = null;
  control();
}
async function read() {
  // fetch("http://localhost:3000/topics/" + selectedId)
  //   .then((response) => response.json())
  //   .then((topic) => {
  //     //3.아이디와 일치하는 topics의 원소를 찾는다.
  //     // const topic = topics.filter((e) => e.id === selectedId)[0];
  //     //4.본문을 만든다.
  //     const content = `<h2>${topic.title}</h2>${topic.body}`;
  //     //5.본문을 출력한다.
  //     document.querySelector("article").innerHTML = content;
  //     control();
  //   });
  let response = await fetch("http://localhost:3000/topics/" + selectedId);
  let topic = await response.json();
  const content = `<h2>${topic.title}</h2>${topic.body}`;
  document.querySelector("article").innerHTML = content;
  control();
}
async function createHandler(e) {
  e.preventDefault();
  const t = e.target.title.value;
  const b = e.target.body.value;
  // fetch("http://localhost:3000/topics", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ title: t, body: b }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // const newTopic = { id: nextId, title: t, body: b };
  //     // topics.push(newTopic);
  //     nav();
  //     // selectedId = nextId;
  //     // nextId += 1;
  //     selectedId = data.id;
  //     read();
  //   });
  let response = await fetch("http://localhost:3000/topics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: t, body: b }),
  });
  let data = await response.json();
  nav();
  selectedId = data.id;
  read();
}
function create() {
  const content = `
            <form onsubmit="createHandler(event);">
              <p><input type="text" name="title" placeholder="제목"></p>
              <p><textarea name="body" placeholder="본문"></textarea></p>
              <p><input type="submit" value="create"></p>
            </form>
          `;
  document.querySelector("article").innerHTML = content;
}
async function updateHandler(e) {
  e.preventDefault();
  const t = e.target.title.value;
  const b = e.target.body.value;
  // fetch("http://localhost:3000/topics/" + selectedId, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ title: t, body: b }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     nav();
  //     selectedId = data.id;
  //     read();
  //   });
  let response = await fetch("http://localhost:3000/topics/" + selectedId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: t, body: b }),
  });
  let data = await response.json();
  nav();
  selectedId = data.id;
  read();
}
async function update() {
  // fetch("http://localhost:3000/topics/" + selectedId)
  //   .then((response) => response.json())
  //   .then((topic) => {
  //     // Create
  //     const content = `
  //     <form onsubmit="updateHandler(event);">
  //       <p><input type="text" name="title" placeholder="제목" value="${topic.title}"></p>
  //       <p><textarea name="body" placeholder="본문">${topic.body}</textarea></p>
  //       <p><input type="submit" value="update"></p>
  //     </form>
  //   `;
  //     document.querySelector("article").innerHTML = content;
  //     control();
  //   });
  let response = await fetch("http://localhost:3000/topics/" + selectedId);
  let topic = await response.json();
  // Create
  const content = `
            <form onsubmit="updateHandler(event);">
              <p><input type="text" name="title" placeholder="제목" value="${topic.title}"></p>
              <p><textarea name="body" placeholder="본문">${topic.body}</textarea></p>
              <p><input type="submit" value="update"></p>
            </form>
          `;
  document.querySelector("article").innerHTML = content;
  control();
}
async function del() {
  // fetch("http://localhost:3000/topics/" + selectedId, {
  //   method: "DELETE",
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     nav();
  //     welcome();
  //   });
  let response = await fetch("http://localhost:3000/topics/" + selectedId, {
    method: "DELETE",
  });
  let data = await response.json();
  nav();
  welcome();
}
function control() {
  let contextUI = "";
  if (selectedId !== null) {
    contextUI = `
            <li><a href="/update" onclick="event.preventDefault();update();">Update</a></li>
            <li><a href="/delete" onclick="event.preventDefault();del();">Delete</a></li>
          `;
  }
  document.querySelector("#control").innerHTML = `
            <li><a href="/create" onclick="event.preventDefault(); create();">Create</a></li>
            ${contextUI}
        `;
}
nav();
welcome();
control();
