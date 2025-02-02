# excel-diff-viewer

# デプロイ手順
## 開発環境
docker compose --env-file .env.development up -d --build

## 本番環境
### 書き換え
-----
VITE_API_URL=http://<domain_name>:8000
-----
デプロイしたあと、frontend/.envの中を以下に書き換える

### dockerビルド
docker compose --env-file .env.production up -d --build
