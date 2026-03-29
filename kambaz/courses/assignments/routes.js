import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findAssignmentsForCourse(courseId));
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    res.json(dao.createAssignment(courseId, req.body));
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    res.json(dao.updateAssignment(assignmentId, req.body));
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(200);
  });
}