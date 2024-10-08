const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const methodOverride = require('method-override');

const Category = require('./model/category');

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const likeRouter = require('./routes/likeRouter');
const commonRouter = require('./routes/commonRouter');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const defineAssociations = require('./model/association');
const swaggerSpec = YAML.load(path.join(__dirname, '/build/swagger.yaml'));

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// css
app.use(express.static(path.join(path.dirname(require.main.filename), 'public')));

// sequelize define associations
defineAssociations();

app.use(methodOverride('_method'));

app.use(async (req, res, next) => {
  res.locals.token = req.cookies.token;
  res.locals.categoryList = await Category.findAll();
  next();
});

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(commonRouter);

app.listen(port, () => {
  console.log(`Blog project listening on port ${port}`);
});
