$(document).ready(function () {
  var goEasy = new GoEasy({
    appkey: 'BS-d8ce157d507c42f58dd9e98118e22c67'
  });
  goEasy.subscribe({
    channel: 'message',
    onMessage: function (message) {
      alert('收到：' + message.content);
    }
  });
});
