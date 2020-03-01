// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages"
};

//초기화...?? 초기화?? 
app.init = function () {

}

//자료를 받는 함수.
app.fetch = function () {
  //url에 접근하기 위한 메소드
  fetch(app.server, {
    method: 'GET'
  })
    .then(res => {
      return res.json();
    }).then(json => {
      json.forEach((ele) => {
        app.renderMessage(ele.username, ele.text, ele.date);
      })
    })
}

//자료를 보내는 함수
app.send = function () {
  let message = {
    username: '',
    text: '',
    roomname: ''
  };

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
    .then(json => {
      console.log(json);
    })
    //메세지창에 글 입력하고 submit 버튼을 누르면
    //message가 chats에 추가되어야 된다

    //class이름이 text인 엘리먼트의 value를 message 객체의 text의 값으로 받고?
    //class이름이 username인 엘리먼트의 value를 message 객체의 username의 값으로 받고?
    //class이름이 roomname인 엘리먼트의 value를 message 객체의 roomname의 값으로 받고?


}
app.fetch();

app.clearMessages = function () {
  //지우고
  let target = document.querySelector('#chats');
  target.remove();
}

app.renderMessage = function (username, text, date) {
  //불러오기
  //데이터를 각 엘리먼트에 넣어줘야됨
  let newUl = document.createElement('ul');
  let newDivForName = document.createElement('div');
  let newDivForText = document.createElement('div');
  let newDivForDate = document.createElement('div');
  newDivForName.innerHTML = username;
  newDivForText.innerHTML = text;
  newDivForDate.innerHTML = date;
  newUl.appendChild(newDivForName);
  newUl.appendChild(newDivForText);
  newUl.appendChild(newDivForDate);
  newDivForName.className = 'username';
  newDivForText.className = 'text';
  newDivForDate.className = 'date';
  document.querySelector('#chats').prepend(newUl);
}


//필터링 함수 만들어서
app.filtering = function(){
  json.roomname
}
