
import { v4 as uuidv4 } from "uuid";
import CoursesDao from "./dao.js";
import EnrollmentsDao from "../enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  // specific routes before generic /:courseId routes
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = db.modules.filter((m) => m.course === courseId);
    res.json(modules);
  });
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const newModule = { ...req.body, course: courseId, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    res.json(newModule);
  });
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    db.modules = db.modules.filter((m) => m._id !== moduleId);
    res.sendStatus(200);
  });
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const module = db.modules.find((m) => m._id === moduleId);
    Object.assign(module, moduleUpdates);
    res.json(module);
  });
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
}