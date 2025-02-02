# excel-diff-viewer

# Docker起動コマンド
## 開発環境
docker compose --env-file .env.development up -d --build

## 本番環境
### 書き換え
デプロイしたあと、frontend/.envの中を以下に書き換える
-----
VITE_API_URL=http://coffeemerge.com:8000
-----

### dockerビルド
docker compose --env-file .env.production up -d --build
