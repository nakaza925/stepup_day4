$(function(){ //jQuery Start
  
    //入力フォームからユーザーが入力した郵便番号を受け取る
    $("#submit").on("click",function(e){ //入力
        e.preventDefault(); //リロードが起こるのを阻止
        let post_code =$("#post_code").val(); //入力された郵便番号を取得
        console.log(post_code);
        zipCloud(post_code);
    })

    // APIをたたく //データを取って参るって意味。（非同期）。フェッチは初心者用でシンプルなやつ。中にurlが書けるのがフェッチ
    function zipCloud(post_code){
        let url ="https://zipcloud.ibsnet.co.jp/api/search?zipcode="+post_code;
        fetch(url)
        .then(response => response.json())//fechの結果を受け取ってJSONで解析する 「=>」はアロー関数＝弓
        .then((data)=>{
            if(!data.results){  //郵便番号が正しくなかった等の場合
                console.log(data.message);  //エラーメッセージを表示
                render_html(data.message);
            }else{  //郵便番号が正しかった場合
                console.log(data);  //結果を表示
                let results = data.results["0"]; //dataの["results"]["0"]を取得したい。[]を省くため「．」省略
                console.log(results); //consoleは確認したいから入れてるだけ

                //パターン1
                // let format_address =
                // results.address1+results.address2+results.address3;
                // console.log(format_address);
                // render_html(format_address);

                //パターン2
                render_html(results);
            }
        })
        .catch((response)=>{   //安全網。何かあったらこれやって終了してがキャッチの役割。外部に頼むfethを使うとcatchを使うことが多い
            console.info(response);
        });
        
    }
    //htmlに表示する
    function render_html(results){
        // $("#address p").text(message);

        $("#prefcture").val(results.address1);
        $("#city").val(results.address2);
        $("#street").val(results.address3);

    }

    zipCloud();
})//jQery end

