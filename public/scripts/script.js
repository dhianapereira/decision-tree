function loadData() {
  var data = [];

  $.getJSON("../../src/data.json", function (json) {
    data = json;
    var config = {
      trainingSet: data,
      categoryAttr: "class",
    };

    var patient = {
      age: 30,
      menopause: "premeno",
      tumorSize: 33,
      degMalig: 3,
      breast: "left",
      breastQuad: "left_low",
    };

    var decisionTree = new dt.DecisionTree(config);
    
    var decisionTreePrediction = decisionTree.predict(patient);

    document.getElementById("testingItem").innerHTML =
      "<td>" +
      patient.age +
      "</td>" +
      "<td>" +
      patient.menopause +
      "</td>" +
      "<td>" +
      patient.tumorSize +
      "</td>" +
      "<td>" +
      patient.degMalig +
      "</td>" +
      "<td>" +
      patient.breast +
      "</td>" +
      "<td>" +
      patient.breastQuad +
      "</td>";

    document.getElementById(
      "decisionTreePrediction"
    ).innerHTML = decisionTreePrediction;

    document.getElementById("displayTree").innerHTML = treeToHtml(
      decisionTree.root
    );

    function treeToHtml(tree) {
      if (tree.category) {
        return [
          "<ul>",
          "<li>",
          '<a href="#">',
          "<b>",
          tree.category,
          "</b>",
          "</a>",
          "</li>",
          "</ul>",
        ].join("");
      }

      return [
        "<ul>",
        "<li>",
        '<a href="#">',
        "<b>",
        tree.attribute,
        " ",
        tree.predicateName,
        " ",
        tree.pivot,
        "</b>",
        "</a>",
        "<ul>",
        "<li>",
        '<a href="#">yes</a>',
        treeToHtml(tree.match),
        "</li>",
        "<li>",
        '<a href="#">no</a>',
        treeToHtml(tree.notMatch),
        "</li>",
        "</ul>",
        "</li>",
        "</ul>",
      ].join("");
    }
  });
}
