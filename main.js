import io from "socket.io-client";

document.addEventListener("DOMContentLoaded", () => {
  let socket = io("http://localhost:3000");
  let boardCode = "";

  var slider = document.getElementById("drawing-line-width");
  var output = document.getElementById("demo");
  var clear = document.getElementById("clear");
  clear.onclick = function () {
    canvas.clear();
  };
  output.innerHTML = slider.value;
  slider.oninput = function () {
    output.innerHTML = this.value;
  };
  // Create a new fabric.js canvas
  let canvas = new fabric.Canvas("c", { isDrawingMode: true });

  // Enable drawing mode
  canvas.isDrawingMode = true;

  // Set up the drawing mode settings
  canvas.freeDrawingBrush.color = "#000000"; // Default color
  canvas.freeDrawingBrush.width = 1; // Default line width

  canvas.on("object:modified", (options) => {
    if (options.target) {
      let obj = options.target.toObject([
        "left",
        "top",
        "width",
        "height",
        "angle",
        "fill",
        "stroke",
        "strokeWidth",
      ]);
      socket.emit("object modified", { obj, boardCode });
    }
  });

  canvas.on("object:added", (options) => {
    if (options.target) {
      let obj = options.target.toObject([
        "left",
        "top",
        "width",
        "height",
        "angle",
        "fill",
        "stroke",
        "strokeWidth",
      ]);
      socket.emit("object added", { obj, boardCode });
    }
  });

  // Handle changes in color selection
  document
    .getElementById("drawing-color")
    .addEventListener("change", function () {
      canvas.freeDrawingBrush.color = this.value;
    });

  // Handle changes in drawing line width
  document
    .getElementById("drawing-line-width")
    .addEventListener("change", function () {
      canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    });

  // Handle board creation
  document.getElementById("createBoard").addEventListener("click", () => {
    let participant = prompt("Please enter your name:");
    if (participant) {
      socket.emit("create board", { name: participant }); // send object with name
    } else {
      console.log("Name is required to create a board.");
    }
  });

  // Handle board join
  document.getElementById("joinBoard").addEventListener("click", () => {
    let participant = prompt("Please enter your name:");
    if (participant) {
      let joinBoardCode = prompt("Please enter the board code to join:");
      if (joinBoardCode) {
        socket.emit("join board", {
          name: participant,
          boardCode: joinBoardCode,
        });
      } else {
        console.log("A board code is required to join a board.");
      }
    } else {
      console.log("Name is required to join a board.");
    }
  });

  socket.on("board created", ({ boardCode: newBoardCode, participants }) => {
    boardCode = newBoardCode;
    document.getElementById("boardCode").innerText = `Board code: ${boardCode}`;
    document.getElementById(
      "participants"
    ).innerText = `Participants: ${participants.join(", ")}`;
  });

  socket.on(
    "participant joined",
    ({ participants, boardCode: newBoardCode }) => {
      document.getElementById(
        "participants"
      ).innerText = `Participants: ${participants.join(", ")}`;
      boardCode = newBoardCode;
    }
  );

  socket.on("object modified", ({ obj }) => {
    let objectOnCanvas = canvas.getObjects().find((o) => o.id === obj.id);
    if (objectOnCanvas) {
      objectOnCanvas.set(obj);
      canvas.renderAll();
    }
  });

  socket.on("object added", ({ obj }) => {
    fabric.util.enlivenObjects([obj], function (objects) {
      objects.forEach(function (o) {
        canvas.add(o);
      });
    });
  });

  socket.on("join failed", (message) => {
    console.log(message);
  });
});
