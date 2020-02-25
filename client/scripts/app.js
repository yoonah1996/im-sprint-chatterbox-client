/* eslint-disable no-console */
const app = {
  server: "http://52.78.206.149:3000/messages",
};

app.init = function () {

}

//서버에 GET요청 제출 (방이름)
app.fetch = function () {
  return fetch(app.server, {
    method: 'get',
  })
    .then(response => {
      return response.json();
    }).then(myJson => {
      let arr = [];
      //arr.push(JSON.parse(JSON.stringify(myJson)));
      arr.push(myJson);
      return arr;
    }).then(value => {
      //roomname 목록만 배열로 추출
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
      //렌더링 함수의 인자 값에 중복값 제거된 방 이름을 적용
      result.forEach(el => app.renderMessage(el));
    })
    .catch(err => {
      return err;
    })
}

//서버에서 유저네임, 메세지, 날짜를 가져와 랜더링 해주는 함수
app.addSns = function () {
  return fetch(app.server, {
    method: 'get',
  }).then(response => {
    return response.json();
  }).then(myJson => {
    let arr = [];
    arr.push(myJson);
    //arr.push(JSON.parse(JSON.stringify(myJson)));
    //console.log(JSON.parse(JSON.stringify(myJson)));
    return arr;
  }).then(value => {
    value[0].forEach(el => app.renderSns(el.username, el.text, el.date));
  })
    .catch(err => {
      return err;
    })
}

//호출을 통해 처음 화면에 글 목록이 뜰 수 있게 함
app.addSns();
//호출을 통해 처음 선택창에 방 이름이 뜰 수 있게 함
app.fetch();


//submit 버튼을 누르면 입력한 메세지가 서버에 제출된다 (제출 + 글 목록에 추가)
let submitClick = document.getElementById('submit');
submitClick.addEventListener('click', function () {
  let message = {};
  message['username'] = document.querySelector('#nameInput').value;
  message['text'] = document.querySelector('#messageInput').value;
  message['roomname'] = document.querySelector('#select').value;
  message['date'] = new Date();
  if(message.username === '' || message.text === ''){
    alert('이름과 메시지를 입력하세요!');
    return;
  }
  app.send(message);
  //렌더링할 때 인자값으로 date 속성 입력
  app.renderSns(message.username, message.text, message.date);
  //setTimeout(app.addSns(), 3000);
  document.querySelector('#nameInput').value = '';
  document.querySelector('#messageInput').value = '';
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


//messageData라는 클래스 이름을 가진 앨리먼트 모두 삭제
app.clearMessages = function () {
  //fetch API로 변경해야될듯..?
  let messageData = document.querySelectorAll('.messages')
  messageData.forEach(el => el.remove());
}


//글 보여주기
app.renderSns = function (name, sns, date) {
  //fetch API로 변경해야될듯..?
  //ul태그로 변경: 순서가 필요없는 목록 표시할 때 사용
  let outDiv = document.createElement('ul');
  let newDiv = document.createElement('div');
  let oupSns = document.createElement('div');
  let oupDate = document.createElement('span');
  outDiv.className = 'messages';
  newDiv.className = 'userName';
  //outDiv.setAttribute("style", "border: 2px solid black;");
  newDiv.innerHTML = name;
  oupSns.innerHTML = sns;
  oupDate.innerHTML = date;
  outDiv.appendChild(newDiv);
  outDiv.appendChild(oupSns);
  outDiv.appendChild(oupDate);
  // document.querySelector('.my-box').appendChild(newDiv);
  // document.querySelector('.my-box').appendChild(oupSns);
  // document.querySelector('.my-box').appendChild(oupDate);
  //prepend를 써서 최근 메세지가 상단에 위치하도록 함
  document.querySelector('.my-box').prepend(outDiv);
}

//메소드는 DOM에 방 선택
app.renderMessage = function (roomName) {
  //fetch API로 변경해야될듯..?
  let newDiv = document.createElement('option');
  newDiv.innerHTML = roomName;
  document.querySelector('#select').appendChild(newDiv);
}

app.filtering = function (roomName) {
  return fetch(app.server, {
    method: 'get',
  })
    .then(response => {
      return response.json();
    }).then(myJson => {
      let arr = [];
      arr.push(myJson);
      return arr;
    }).then(value => {
      value[0].forEach(function (ele) {
        if (ele.roomname === roomName) {
          app.renderSns(ele.username, ele.text, ele.date);
        }
      })
    }).catch(err => {
      return err;
    })
}

//방 이름 필터링 이벤트
let filterRoomName = document.getElementById('select');
filterRoomName.addEventListener('change', function () {
  let roomName = document.getElementById('select').value;
  app.clearMessages();
  app.filtering(roomName);
})

//방 만들기 기능 함수
let makeRoomButton = document.getElementById('roomSub');
makeRoomButton.addEventListener('click', function(){
  let roomName = document.getElementById('roomMake').value;
  app.renderMessage(roomName);
})





//선택창 버튼을 누르면 roomname이 나온다
// let choiceClicks = document.getElementById('choice');
// choiceClicks.addEventListener('click', function () {
//   app.fetch();
// })

//방 이름으로 필터링
// app.filterRoomName = function() {
//   let roomName = document.getElementsByTagName('option').value;
//   app.filtering(roomName);
// }

//선택창을 눌렀을때 선택창 랜더링
// app.renderSelectRoom = function (roomName) {
//   //fetch API로 변경해야될듯..?
//   let targetEle = document.querySelector('#choice');
//   let createOptionEle = document.createElement('option');
//   targetEle.appendChild(createOptionEle);
//   createOptionEle.innerHTML = roomName;
// }