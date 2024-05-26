import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import User from "./models/User.model.js";
import express from "express";
import mongoose from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as dotenv from "dotenv";
import Resume from "./models/Resume.model.js";
import Skills from "./models/Skills.model.js";
import Project from "./models/Project.model.js";
import Comment from "./models/Comment.model.js";
import Blog from "./models/Blog.model.js";

dotenv.config();
const PORT = 3000;

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
  const app = express();

  const mongooseDB = await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDb connected"))
    .catch((error) => console.log(error));

  const adminOptions = {
    // We pass Category to `resources`
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
          // properties: {
          //   postContent: {
          //     type: "richtext",
          //   },
          // },
        },
      },
      {
        resource: Blog,
        options: {
          navigation: { name: "Blogs", icon: "Folder" },
          // properties: {
          //   postContent: {
          //     type: "richtext",
          //   },
          // },
        },
      },
      {
        resource: Comment,
        options: {
          navigation: { name: "Comment", icon: "Folder" },
          // properties: {
          //   postContent: {
          //     type: "richtext",
          //   },
          // },
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
      store: mongooseDB,
      resave: true,
      saveUninitialized: true,
      secret: "Secret",
      name: "adminjs",
    }
  );
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
