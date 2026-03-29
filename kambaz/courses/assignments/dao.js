import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    return db.assignments.filter((a) => a.course === courseId);
  }

  function createAssignment(courseId, assignment) {
    const newAssignment = { ...assignment, course: courseId, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function updateAssignment(assignmentId, updates) {
    const assignment = db.assignments.find((a) => a._id === assignmentId);
    Object.assign(assignment, updates);
    return assignment;
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
  }

  return { findAssignmentsForCourse, createAssignment, updateAssignment, deleteAssignment };
}