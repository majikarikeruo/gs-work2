# もくもく会マッチングアプリ

## DEMO

https://gs-work2.vercel.app/register
https://gs-work2.vercel.app/vote
https://gs-work2.vercel.app/result/

## 紹介と使い方

先週提出したものの発展版のため、
デプロイの URL は先週と変えておりません！

もくもく会をやりたい人に曜日と時間をマッチングしていただき、
管理人がマッチング結果を確認するためのアプリです。

が、時間のマッチングの部分（そもそも未完成ですが）、自分が思ってたよりも遥かに難航したので、
先週提出したものから UI は変えております。
そのため、register ページから触っていただく必要があります。

これは、僕が仕事で関わっている英語コミュニティにおいて
使いたいと思ったところから作成しています。
（コミュニティの媒体として LINE オープンチャットを利用しています）

全然まだ途中ですが、登録と表示とログインはできているので、一旦最低限のところで提出します。
また明日までに以下を追加で実装予定です。

- 時間のマッチングをなんとかする
- 同じユーザーが日程登録した場合、既存の日程は全削除した上で、新しく登録した日程を登録し直すようにする。
- チャット機能
- middleware を活用したページ保護（これなんかハマってよくわかってない）

## 工夫した点

supabase に挑戦してみたこと。

## 苦戦した点

middleware でのページ保護のところがなんかうまくいかず？？でした。
本来やるべきではないと思うのですが、今の時点ではページ配下で未ログイン時は強引にリダイレクトさせています。

## 参考にした web サイトなど
