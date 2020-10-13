// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages",
  // init : function() {
  //   app.fetch();  
  // }
};
// 초기 화면 실행 함수
app.init = function () {
  app.fetch();
}

//자료를 받는 함수.
app.fetch = function (inputroomsel) {
  //url에 접근하기 위한 메소드
  if (inputroomsel) { 
    app.server = app.server + "/?roomname=" + inputroomsel;
  }
  fetch(app.server, {
    method: 'GET'
  })
    .then(res => {
      // console.log(res.body);
      return res.json();
    }).then(json => {
      // console.log(json);
      json.forEach((ele) => {
        app.renderMessage(ele.username, ele.text, ele.roomname);
      })
      let roomObj = { "전체보여주기" : "전체보여주기"};
      json.forEach((ele) => {
        if (!roomObj[ele.roomname]) {
          roomObj[ele.roomname] = ele.roomname;
        }
      })
      if (!inputroomsel) {
        app.renderList(roomObj);
      }
    })
  app.server = "http://52.78.206.149:3000/messages";
}

//자료를 보내는 함수
app.send = function (message) {
  
  // console.log(message);

  fetch(app.server, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(res => {
      return res.json();
    })
    .then(()=>{
      // console.log(a);
      app.clearMessages();
      app.fetch(message.roomname);
    })
  
  //메세지창에 글 입력하고 submit 버튼을 누르면
  //message가 chats에 추가되어야 된다

  //class이름이 text인 엘리먼트의 value를 message 객체의 text의 값으로 받고?
  //class이름이 username인 엘리먼트의 value를 message 객체의 username의 값으로 받고?
  //class이름이 roomname인 엘리먼트의 value를 message 객체의 roomname의 값으로 받고?
}


app.clearMessages = function () {
  //지우고
  let target = document.querySelector('#chats');
  target.innerHTML = '';
}

app.renderMessage = function (username, text, roomname) { 
  //불러오기
  //데이터를 각 엘리먼트에 넣어줘야됨
  let newUl = document.createElement('ul');
  let newDivForName = document.createElement('div');
  let newDivForText = document.createElement('div');
  let newDivForDate = document.createElement('div');
  newDivForName.innerHTML = username;
  newDivForText.innerHTML = text;
  newDivForDate.innerHTML = roomname;
  newUl.appendChild(newDivForName);
  newUl.appendChild(newDivForText);
  newUl.appendChild(newDivForDate);
  newDivForName.className = 'username';
  newDivForText.className = 'text';
  newDivForDate.className = 'roomname';
  document.querySelector('#chats').prepend(newUl);  //prepend는 앞쪽에 붙인다   append는 뒷쪽에 붙인다
}


//필터링 함수 만들어서
app.renderList = function (roomObj) {
  // 객체를 써서 객체.룸네임
  let newArr = Object.keys(roomObj);
  let roomcreat = document.querySelector('#roomList');
  newArr.forEach(el => {
    let newOption = document.createElement('option');
    newOption.value = el;
    newOption.text = el;
    roomcreat.appendChild(newOption);
  })
  // console.log(newArr);
}

let subButton = document.querySelector('#inputBtn');
subButton.addEventListener("click", () => {
  if(document.querySelector('#roomList').value === "전체보여주기" && !document.querySelector('#roomInput').value){
    alert("룸네임이 선택되지 않았습니다. 선택하여 주세요")
  }else{
    let message = {
      username: document.querySelector('#inputName').value,
      text: document.querySelector('#inputText').value,
      roomname:  document.querySelector('#roomInput').value
    };
    app.send(message);
  }
  // document.querySelector('#inputName').value = '';
  // document.querySelector('#inputText').value ='';
})

window.addEventListener("DOMContentLoaded", () => {
  app.init();

  let roomsel = document.querySelector('#roomList');
  roomsel.addEventListener("change", () => {
    app.clearMessages();
    if(document.querySelector('#roomList').value === "전체보여주기"){
      document.querySelector('#roomInput').value = '';
      app.fetch();
    }else{
      document.querySelector('#roomInput').value = document.querySelector('#roomList').value;
      app.fetch(document.querySelector('#roomList').value);
      
    }
  })
  
})

