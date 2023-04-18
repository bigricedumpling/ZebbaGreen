function prevPage() {
    var pageIndex = document.getElementById("pageIndex");
    var index = parseInt(pageIndex.value);
    pageIndex.value = index - 1;
    window.location.href = "index1.html";
  }
  function nextPage() {
    var pageIndex = document.getElementById("pageIndex");
    var index = parseInt(pageIndex.value);
    pageIndex.value = index + 1;
    window.location.href = "index2.html";
  }
  