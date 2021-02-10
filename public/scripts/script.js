function loadData() {
  var data = [];

  $.getJSON("../../src/data.json", function (json) {
    data = json;

    const training = data.splice(0, 40);
    console.log(training);

    const test = data;
    console.log(test);

    var config = {
      trainingSet: training,
      categoryAttr: "class",
    };

    var decisionTree = new dt.DecisionTree(config);

    var result = []


    for(let i = 0; i<test.length; i++){
      result.push(decisionTree.predict(test[i]));
    }

    console.log(result);

    result.forEach(function (decisionTreePredict){
      document.getElementById("patientTable").innerHTML +=
      "<td>" +
      decisionTreePredict +
      "</td>";
    });

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
