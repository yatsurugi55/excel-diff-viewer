# excel-diff-viewer

![image](https://github.com/user-attachments/assets/360777d5-7f84-4353-af78-7ef1f9440209)


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
