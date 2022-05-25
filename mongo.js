// insert new blog post
db.posts.insertOne({
  createdAt: "2022-03-22T10:36:37.176Z",
  title: "dicta",
  text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
  author: "Darren Abbott",
  id: "1",
})

// read the new blog post    
db.posts.find({ id: "1" })

// update the new blog post title
db.posts.updateOne({ id: "1" }, { $set: { title: "new title" } })

// delete new blog post
db.posts.deleteOne({ id: "1" })


//////////////////////////// STRETCH

// insert multiple blog posts
db.posts.insertMany([
  {
    createdAt: "2022-03-22T10:36:37.176Z",
    title: "dicta",
    text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
    author: "Darren Abbott",
    id: "1",
  },
  {
    createdAt: "2022-03-22T15:16:56.285Z",
    title: "ducimus",
    text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
    author: "Luke Rogahn PhD",
    id: "2",
  },
  {
    createdAt: "2022-03-21T20:09:32.298Z",
    title: "quod",
    text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
    author: "Maryann Schneider",
    id: "3",
  },
  {
    createdAt: "2022-03-21T23:07:53.447Z",
    title: "ut",
    text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
    author: "Dr. Lorenzo Anderson",
    id: "4",
  },
  {
    createdAt: "2022-03-22T15:14:39.819Z",
    title: "id",
    text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
    author: "Bobbie Dach",
    id: "5",
  },
])

// read all blog posts
db.posts.find({}).limit(100)

// update multiple posts
db.posts.updateMany({
  id: { $lt: "3" }
}, {
  $set: {
    author: "updated author"
  }
})


// delete multiple posts
db.posts.deleteMany({ author: "updated author" })


//////////////////////////// GETPOSTS

const getPosts = (limit, skip, sortField, sortOrder, filterField, filterValue) => {
  let sort = {}
  sortField && sortOrder ? sort[sortField] = sortOrder : sort

  let filter = {}
  filterField && filterValue ? filter[filterField] = filterValue : filter

  let dbResult = db.posts.find(filter).limit(limit).skip(skip).sort(sort).toArray()

  return dbResult
}

// console.log(getPosts())
// console.log(getPosts(10))
// console.log(getPosts(10, 3))
// console.log(getPosts(10, 3, 'lastModified', -1))
console.log(getPosts(50, 0, 'lastModified', -1, 'id', '10'))


//////////////////////////// May 25 assignment


// Convert ID to Int
assert(parseFloat(db.version()) >= 4.2, "The pipeline parameters of the 'update' method need MongoDB Server 4.2 or plus.");

db.getCollection("posts").update(
  {
    // _id: ObjectId("628d2580aece93b134a25378"), //only update current doc
    "id": { $type: "string" }  //update all of type string
  },
  [{
    $set: {
      "id":
      {
        $convert: {
          input: "$id",
          to: "int", //available convert types: string|bool|int|long|double|decimal|date|timestamp|objectId ...
          //onError:"$id", //remain unchanged
          //onNull: 0, //if the input is null or missing
        }
      },
    }
  }],
  { multi: true }
)


// find single blog post given an ID
const findPost = (blogID) => db.posts.find({ id: blogID }).toArray()

console.log(findPost(45))

// length of blog posts collection
const getPostsCollectionLength = () => db.posts.count()

console.log(getPostsCollectionLength())

// new blog post
const makePost = (title, text, author, category) => {
  const today = new Date().toISOString()
  const blogID = getPostsCollectionLength() + 1

  db.posts.insertOne({
    'createdAt': today,
    'title': title,
    'text': text,
    'author': author,
    'lastModified': today,
    'category': category,
    'id': blogID
  })
}

makePost('test', 'test', 'test', 'test')

// update info
const updatePost = (blogId, title, text, author, category) => {
  const today = new Date().toISOString()
  if (title) db.posts.updateOne({ id: blogId }, { $set: { title: title } })
  if (text) db.posts.updateOne({ id: blogId }, { $set: { text: text } })
  if (author) db.posts.updateOne({ id: blogId }, { $set: { author: author } })
  if (category) db.posts.updateOne({ id: blogId }, { $set: { category: category } })
  db.posts.updateOne({ id: blogId }, { $set: { lastModified: today } })
}

updatePost(51, 'change', 'change', 'change', 'change')

// delete posts with matching ids
const deletePosts = (blogIds) => {
  blogIds.forEach(id => db.posts.deleteOne({ id: id }))
}

deletePosts([50, 51, 52])

// STRETCH: users collection
const getAllAuthors = () => {
  const all = db.posts.find({}).toArray()
  return all.map(post => post.author)
}

const createAuthorCollection = () => {
  const authors = getAllAuthors()
  let length = db.users.count()

  authors.forEach(author => {
    const firstName = author.split(' ').slice(0, 1).join('')
    const lastName = author.split(' ').slice(1).join(' ')
    const userId = length + 1
    const email = (`${firstName}.${lastName}@gmail.com`).split(' ').join('').toLowerCase()
    const posts = db.posts.find({ author: author }, { _id: 1 }).toArray().map(post => post._id)

    db.users.insertOne({
      'firstName': firstName,
      'lastName': lastName,
      'userId': userId,
      'email': email,
      'posts': posts
    })
    length++
  })
}

createAuthorCollection()


// SUPER STRETCH: user + posts
const getUser = (email) => {
  return db.users.aggregate([
      {
          $lookup:
          {
              from: 'posts',
              localField: 'posts', 
              foreignField: '_id', 
              as: 'posts'
          }
      }, 
      {
          $match:
          {email: email}
      }
      ]
  )
}

getUser('traci.binsdvm@gmail.com')