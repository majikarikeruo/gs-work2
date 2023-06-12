# もくもく会マッチングアプリ

## DEMO

https://gs-work2.vercel.app/register
https://gs-work2.vercel.app/vote
https://gs-work2.vercel.app/result/

## 紹介と使い方

- 同じユーザーが日程登録した場合、既存の日程は全削除した上で、新しく登録した日程を登録し直すようにする。
- 結果表示ページにおいて全件表示しないようにする
- マッチング後のフローを確立する

## 工夫した点

supabase に挑戦してみたこと。

## 苦戦した点

middleware でのページ保護のところがなんかうまくいかず？？でした。
本来やるべきではないと思うのですが、今の時点ではページ配下で未ログイン時は強引にリダイレクトさせています。

## 参考にした web サイトなど
