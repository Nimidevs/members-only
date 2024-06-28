const userArgs = process.argv.slice(2);

const User = require("./models/user");
const Message = require("./models/message");
const moment = require("moment");


const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_name,
  last_name,
  username,
  password,
  member,
  admin
) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: password,
    member: member,
    admin: admin,
  });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${first_name}`);
}

async function messageCreate(index, title, timestamp, msg_text, author) {
  const message = new Message({
    title: title,
    timestamp: timestamp,
    msg_text: msg_text,
    author: author,
  });
  await message.save();
  messages[index] = message;
  console.log(`Added messgae: ${title}`);
}

async function createUsers() {
  console.log("Adding Users");
  await Promise.all([
    userCreate(0, "Joses", "Obofe", "J_protocol", "Kingjaja", false, false),
    userCreate(1, "Kamiye", "Eghosa", "baby_dunno", "Kami4you", true, false),
    userCreate(2, "Ogunyomi", "Toluwanimi", "Nimi_Devs", "Captain", true, true),
  ]);
}

async function createMessages() {
  console.log("Adding Messages");
  const formattedDate = moment().format();
  console.log("current Date:", formattedDate);
  await Promise.all([
    messageCreate(
      0,
      "Logarithmic Time O(Log n)",
      formattedDate,
      "Logarithmic time complexity, denoted as O(log n), commonly appears in operations on tree structures such as balanced binary trees. This efficiency arises because each operation reduces the problem size logarithmically. Unlike divide and conquer, where problems are split into smaller subproblems that may not necessarily halve in size at each step, logarithmic complexity in tree operations like search or insertion benefits from efficiently narrowing down the search space with each step. This property makes algorithms like binary search on sorted arrays or operations on balanced binary trees (such as AVL trees or red-black trees) capable of handling large datasets efficiently.",
      users[2]
    ),
    messageCreate(
      1,
      "Why Yoruba people are the best",
      formattedDate,
      "As an Edo man, I must say that the Yoruba people possess an exceptional blend of qualities that make them truly remarkable. Their rich cultural heritage, reflected in vibrant festivals like Eyo and Osun-Osogbo, showcases a deep-rooted respect for tradition and history. The Yoruba language, with its melodious tones and proverbs, embodies wisdom passed down through generations. Their cuisine, featuring delicacies like pounded yam and egusi soup, is a testament to their culinary creativity and hospitality. Yoruba communities are known for their unity and support for one another, fostering a strong sense of belonging. Additionally, their contributions to arts, literature, and music are unparalleled, with legends like Fela Kuti revolutionizing Afrobeat. Yoruba cities, such as Lagos and Ibadan, are bustling hubs of innovation and commerce. Truly, the Yoruba people exemplify a harmonious blend of tradition, progress, and community spirit that is admirable from any perspective",
      users[0]
    ),
    messageCreate(
      2,
      "Why Edo people are the worst",
      formattedDate,
      "As an Edo man, it's challenging to critique my own people, but if I were to highlight some areas of concern, I might say that Edo people, despite our rich cultural heritage and historical significance, sometimes struggle with internal unity and cooperation. Our vibrant traditions, while beautiful, can sometimes be overshadowed by internal disputes and rivalries that hinder collective progress. There's a tendency to cling to old grudges and divisions, which can impede the development of a cohesive community spirit. Additionally, the political landscape in Edo can be marked by corruption and inefficiency, which affects public trust and the effective implementation of policies for the betterment of all. Our potential is immense, yet we often fall short due to a lack of collaborative effort and a unified vision for the future. This self-critical perspective aims to encourage reflection and positive change within our community.",
      users[1]
    ),
  ]);
}
