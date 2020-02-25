// eslint-disable-next-line
const app = {
  server: "http://52.78.206.149:3000/messages",
};

app.init = function(){

}

//서버에 GET요청 제출
app.fetch = function(){
  var result = [];
  fetch(app.server, {
    method: 'get',
  })
  .then(response => {
    return response.json();
  }).then(myJson  => {
    result.push(JSON.parse(JSON.stringify(myJson)));
    // console.log(result);
    return result;
  }).catch(err  => {
    // console.log(err);
    return err;
  })
  return result;
}

// function submitClick(){
//   let newArr = app.fetch();
//   // let room = newArr.map(el => el.roomname);
//   console.log(newArr);
// }

var clicks = document.getElementById('submit');
clicks.addEventListener('click', function(){
  // app.fetch();
  // let room = newArr.map(el => el.roomname);
  // newArr.forEach(function(el){
  //   console.log(el.roomname);
  // })
  // console.log(newArr);
})


let message = {
}

//서버에 POST요청 제출
app.send = function(message){
  fetch(app.server, {
    method: 'post',
    body: JSON.stringify(message),
    headers:{
      "Content-Type": "application/json",
    }
  })
  .then(response => {
    return response.json();
  //}).then(myPostJson => {
  //  console.log(JSON.stringify(myPostJson));
  }).catch(err => {
    //console.log(err);
    return err;
  })
}
app.send(message);

//메소드는 DOM에서 메시지를 지웁니다
app.clearMessages = function(){
  //fetch API로 변경해야될듯..?
  document.querySelector('#chats').querySelector('div').remove();
}

//메소드는 DOM에 메시지 하나를 추가합니다
app.renderMessage = function(message){
  //fetch API로 변경해야될듯..?
  let newDiv = document.createElement('div');
  newDiv.innerHTML = message;
  document.querySelector('#chats').appendChild(newDiv);
}