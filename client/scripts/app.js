/* eslint-disable no-console */
const app = {
  server: "http://52.78.206.149:3000/messages",
};

app.init = function () {

}

// let message = {
//     username: "룰루",
//     text: "나의 채팅 메시지",
//     roomname: "로비" 
// }

//서버에 GET요청 제출
app.fetch = function () {
  return fetch(app.server, {
    method: 'get',
  })
    .then(response => {
      return response.json();
    }).then(myJson => {
      let arr = [];
      arr.push(JSON.parse(JSON.stringify(myJson)));
      //arr.push(JSON.stringify(myJson));
      return arr;
    }).then(value => {
      //roomname을 배열로 추출
      let mapValue = value[0].map(function (ele) {
        return ele.roomname;
      })
      //중복값 제거
      let result = mapValue.sort().reduce((acc, curr) => {
        let length = acc.length;
        if (length === 0 || acc[length - 1] !== curr) {
          acc.push(curr);
        }
        return acc;
      }, []);

      //렌더링 함수
      app.renderMessage(result);
      return value;
    })
    .catch(err => {
      return err;
    })
}

//선택창 버튼을 누르면 roomname이 나온다
let choiceClicks = document.getElementById('choice');
choiceClicks.addEventListener('click', function () {
  app.fetch();
})

//제출창 버튼을 누르면 입력한 메세지가 서버에 제출된다
let submitClick = document.getElementById('submit');
submitClick.addEventListener('click', function () {
  //app.send(message);

  //app.fetch();
  app.renderMessage(app.fetch());
  //writeMessage();
})

//서버에 POST요청 제출
app.send = function (message) {
  fetch(app.server, {
    method: 'post',
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      return err;
    })
}

//메소드는 DOM에서 메시지를 지웁니다
app.clearMessages = function () {
  //fetch API로 변경해야될듯..?
  document.querySelector('#chats').querySelector('div').remove();
}

//메소드는 DOM에 메시지 하나를 추가합니다
app.renderMessage = function (message) {
  //fetch API로 변경해야될듯..?
  let newDiv = document.createElement('div');
  newDiv.innerHTML = message;
  document.querySelector('#chats').appendChild(newDiv);
}

//선택창을 눌렀을때 선택창 랜더링
app.renderSelectRoom = function (roomName) {
  //fetch API로 변경해야될듯..?
  let targetEle = document.querySelector('#choice');
  let createOptionEle = document.createElement('option');
  targetEle.appendChild(createOptionEle);
  createOptionEle.innerHTML = roomName;
}

// let writeMessage = function(){
//   let messageInput = document.getElementById('messageInput');
//   let messageBox = document.getElementsByClassName('my-box');
//   messageBox.innerHTML = messageInput.value;

// }
