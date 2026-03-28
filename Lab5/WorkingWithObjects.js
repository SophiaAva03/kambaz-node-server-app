export default function WorkingWithObjects(app) {
  const module = {
    id: "m1", name: "Introduction to NodeJS",
    description: "Learn the basics of NodeJS and ExpressJS",
    course: "CS4550",
  };

  const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };

  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    assignment.score = parseFloat(req.params.newScore);
    res.json(assignment);
  });
  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    assignment.completed = req.params.newCompleted === "true";
    res.json(assignment);
  });
  app.get("/lab5/module", (req, res) => res.json(module));
  app.get("/lab5/module/name", (req, res) => res.json(module.name));
  app.get("/lab5/module/name/:newName", (req, res) => {
    module.name = req.params.newName;
    res.json(module);
  });
}

