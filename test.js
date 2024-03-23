const autocannon = require("autocannon");
const ids = [0, 1, 2].sort();
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const requests = ids.map((id) => {
  return {
    body: JSON.stringify({
      id,
    }),
    onResponse(_, body) {
      if (+body != id) {
        throw new Error(`Mismatched request and response, ${+body}:${id}`);
      }
    },
  };
});

autocannon(
  {
    url: "http://localhost:3000",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    requests,
    connections: 10,
    pipelining: 1,
    duration: 10,
  },
  (err, res) => {
    console.log({ err, res });
  }
);
