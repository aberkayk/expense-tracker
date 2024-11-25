Aşağıdaki adımları takip edin:

```bash
# 1. Projeyi Klonlayın
git clone <repository-url>

# 2. Gerekli Bağımlılıkları Yükleyin
# Eğer yarn kullanıyorsanız
yarn

# Eğer npm kullanıyorsanız
npm install

# 3. Json-Server'ı Başlatın
# İlk terminalde JSON veritabanını simüle edin
npx json-server --watch db.json --port 5001

# 4. Next.js Uygulamasını Başlatın
# İkinci terminalde uygulamayı geliştirme modunda başlatın
# Eğer yarn kullanıyorsanız
yarn dev

# Eğer npm kullanıyorsanız
npm run dev
```
