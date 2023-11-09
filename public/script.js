const socket = io("/");

const myVideo = document.createElement("video");
const videoGrid = document.getElementById("video-grid");
console.log(videoGrid);

myVideo.muted = true;
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  path: "3030",
});
let myVideoStream;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (UserVideoStram) => {
        addVideoStream(video, UserVideoStram);
      });
    });
  });

socket.on("user-connected", () => {
  connectToNewUser(userId);
});

peer.on("open", (Id) => {
  socket.emit("join-room", ROOM_ID, Id);
});

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (UserVideoStram) => {
    addVideoStream(video, UserVideoStram);
  });
  console.log("new-user");
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

  videoGrid.append(video);
};
