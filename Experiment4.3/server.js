const express = require("express");
const { createClient } = require("redis");

const app = express();
app.use(express.json());


const redisClient = createClient();
redisClient.connect();


app.post("/book/:seatId", async (req, res) => {
  const seatId = req.params.seatId;
  const lockKey = `seat_lock_${seatId}`;

  
  const lock = await redisClient.set(lockKey, "locked", {
    NX: true,
    EX: 10 
  });

  if (!lock) {
    return res.status(409).json({ message: "Seat already booked" });
  }

  return res.json({ message: `Seat ${seatId} booked successfully` });
});


app.post("/cancel/:seatId", async (req, res) => {
  const seatId = req.params.seatId;
  const lockKey = `seat_lock_${seatId}`;

  await redisClient.del(lockKey);
  res.json({ message: `Seat ${seatId} booking cancelled` });
});

app.listen(4000, () => {
  console.log("Ticket booking server running on port 4000");
});
