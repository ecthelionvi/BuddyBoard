<img src="https://raw.githubusercontent.com/ecthelionvi/Images/main/BuddyBoard.png" alt="BuddyBoard">

BuddyBoard is a real-time collaborative drawing application where users can create virtual boards, invite others to join using a unique board code, and draw on the canvas together in real-time.

## 🔧 Usage

Users can create a new board, which will generate a unique board code. This code can be shared with others who can join the board using the provided code. All participants can then draw on the canvas and see each other's drawing actions happening in real-time. The color and thickness of the brush can be modified as per user preference.

Board creators can see the list of participants currently on their board, enabling a sense of collaborative work. The app is designed to be responsive and can be used on both mobile and desktop devices.

## 🌎 Functionality

- Create a new collaborative drawing board
- Join an existing board using a unique board code
- Draw on the canvas in real-time with other participants
- Modify brush color and thickness
- View current participants on the board
- Real-time synchronization of all drawings

## 💻 Technologies

- Node.js for the backend server
- Express.js for handling server-side routing
- Socket.IO for enabling real-time, bidirectional, and event-based communication
- Fabric.js for canvas creation and manipulation
- HTML, CSS, JS frontend
- Responsive design with media queries

## ⚡ Real-Time Interactivity

BuddyBoard makes extensive use of WebSockets, a technology that enables full-duplex communication between the client and the server. This technology, used through the Socket.IO library, allows us to sync all drawing actions in real-time, providing a smooth and interactive user experience.

## 🎨 Canvas Drawing

The heart of BuddyBoard is the canvas where users draw. This is handled using Fabric.js, a powerful and simple JavaScript HTML5 canvas library. Fabric.js provides an interactive object model on top of the canvas element that allows for manipulation and creation of complex scenes with a simple and consistent API. Fabric.js is used to handle the drawing functionalities, object serialization for easy network transmission, and enlivening objects on the client's canvas.
