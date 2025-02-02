# excel-diff-viewer

![image](https://github.com/user-attachments/assets/360777d5-7f84-4353-af78-7ef1f9440209)

Excel Diff ViewerはExcelファイルを比較し、その差分を視覚的に表示するWebアプリケーションです。Microsoft社のmarkitdownライブラリを使用して、Excelファイルを構造化データに変換し、効率的な比較を実現します。

http://coffeemerge.com/

# セットアップ方法
## 開発環境
```bash
docker compose --env-file .env.development up -d --build
```

## 本番環境
### frontend/.env 修正
```frontend/.env
VITE_API_URL=http://<domain_name>:8000
```

### dockerビルド
```bash
docker compose --env-file .env.production up -d --build
```
