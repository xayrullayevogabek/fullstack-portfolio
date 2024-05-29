import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import User from "./models/User.model.js";
import express from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as dotenv from "dotenv";
import Resume from "./models/Resume.model.js";
import Skills from "./models/Skills.model.js";
import Project from "./models/Project.model.js";
import Comment from "./models/Comment.model.js";
import Blog from "./models/Blog.model.js";
import pagesRouteMiddleware from "./routes/route.js";
import hbsHelpers from "./utils/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: hbsHelpers,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// Routes
app.use(pagesRouteMiddleware);

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const adminOptions = {
      resources: [
        {
          resource: User,
          options: {
            navigation: { name: "User", icon: "User" },
          },
        },
        {
          resource: Resume,
          options: {
            navigation: { name: "Resume", icon: "FileText" },
          },
        },
        {
          resource: Skills,
          options: {
            navigation: { name: "Skills", icon: "BarChart" },
          },
        },
        {
          resource: Project,
          options: {
            navigation: { name: "Project", icon: "Folder" },
          },
        },
        {
          resource: Blog,
          options: {
            navigation: { name: "Blogs", icon: "FileText" },
          },
        },
        {
          resource: Comment,
          options: {
            navigation: { name: "Comment", icon: "MessageSquare" },
          },
        },
      ],
    };

    const admin = new AdminJS(adminOptions);

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
      {
        authenticate,
        cookieName: "AdminJS",
        cookiePassword: "Secret",
      },
      null,
      {
        resave: false,
        saveUninitialized: true,
        secret: "Secret",
        name: "adminjs",
      }
    );

    app.use(admin.options.rootPath, adminRouter);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT, () => {
      console.log(
        `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
      );
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

start();
