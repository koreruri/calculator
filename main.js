$(document).ready(function(){

  let result = "";
  let dotCount = 0;
  let isRunning = false;

  // resultエリアをキー入力無効にする
  $("#result").prop("disabled", true);

  // [AC][=]以外のボタンを押した時の操作
  $(".btn").click(function(){
    // inactiveクラスがついていた場合は終了
    if($(this).hasClass("inactive")) {
      return;
    }
    // resultが0で[.][+][-][*][/]のいずれかを押した場合、頭に0を付ける
    let result_text = $("#result").val();
    if (result_text === "0" && $(this).hasClass("method")) {
      result = "0" + $(this).text();
    } else {
      // .を押した時、最後の文字が数字じゃなかった場合、頭に0を付ける
      let lastChar = Number(result_text.slice(-1));
      if ($(this).text() === "." && Number.isInteger(lastChar) === false) {
          result = result + "0" + $(this).text();
      } else {
        // 上記以外はそのままボタンの文字を足していく
        result += $(this).text();
      }
    } 
    // resultエリアに代入する   
    $("#result").val(result);
  });

  // 数字を押した時の操作
  $(".number").click(function(){
    // inactiveクラスがついていた場合は終了(0を増やさない)
    if($(this).hasClass("inactive")) {
      return;
    }
    // inactiveクラスがついている要素は全てはずす
    $(".inactive").removeClass("inactive");
    // dotCountが0より大きい場合は[.]にinactiveクラスを付ける(.は１個まで)
    if (dotCount > 0) {
      $("#dot").addClass("inactive");
    } 
    // isRunningがtrueでresultエリアが初期値でない場合は一度リセット
    // =>計算結果が表示された状態で数字を押した時はリセットしていちから始める
    if (isRunning === true && $("#result").text() !== "0") {
      allReset();
      result = $(this).text();
      $("#result").val(result);
    }
  });

  // [.][+][-][*][/]を押した時の操作
  $(".method").click(function() {
    // inactiveクラスがついていた場合は終了
    if($(this).hasClass("inactive")) {
      return;
    }
    // dotCount、isRunningの初期化、必要な場所にinactiveクラスを付与
    dotCount = 0;
    isRunning = false;
    $(".method").addClass("inactive");
    $("#zerozero").addClass("inactive");
    $("#dot").removeClass("inactive");
  });

  // [.]を押した時の操作
  $("#dot").click(function() {
    // inactiveクラスがついていた場合は終了
    if($(this).hasClass("inactive")) {
      return;
    }
    // inactiveクラスを付与してdotCountを増やす
    $(this).addClass("inactive");
    dotCount++;
  });

  // [=]を押した時の操作
  $("#equal").click(function() {
    // inactiveクラスがついていた場合は終了
    if ($(this).hasClass("inactive")) {
      return;
    }
    // resultエリアを計算して代入
    result = Function('return('+result+');')();
    $("#result").val(result);
    // 必要な場所にinactiveクラスを付与
    $(this).addClass("inactive");
    $("#zerozero").addClass("inactive");
    // isRunningをtrueに変更
    isRunning = true;
  });

  // [AC]を押した時の操作
  $("#all-clear").click(function() {
    allReset();
    $("#result").val(0);
  });

  // ゼロにinactiveクラスを付与する関数
  function zeroInactive() {
    $("#zero").addClass("inactive");
    $("#zerozero").addClass("inactive");
  }

  // 一度にリセットする関数 
  function allReset() {
    result = "";
    dotCount = 0;
    isRunning = false;
    $("#method").removeClass("inactive");
    $("#equal").addClass("inactive");
    $("#dot").removeClass("inactive");
    zeroInactive();
  }  
});




  