function loadData() {
  var data = [];

  $.getJSON("../../src/breast-cancer.json", function (json) {
    data = json;

    const training = data.splice(0, 400);
    console.log("Dados para o treinamento: ");
    console.log(training);

    const test = data;
    console.log("Dados para o teste: ");
    console.log(test);

    var config = {
      trainingSet: training,
      ignoredAttributes: ["id"],
      categoryAttr: "class",
    };

    var decisionTree = new dt.DecisionTree(config);

    var result = [];

    for (let i = 0; i < test.length; i++) {
      result.push(decisionTree.predict(test[i]));
    }

    let counter = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i] == test[i]["class"]) {
        counter++;
      }
    }

    const percentage = (counter * 100) / result.length;
    console.log("Taxa de acerto:" + percentage + "%");

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
