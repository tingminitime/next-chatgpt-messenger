## ChatGPT Messenger with Next.js 13

練習專案，來源 : [Let’s build ChatGPT Messenger 2.0 with REACT! (Next.js 13, Firebase, Tailwind CSS, TypeScript)](https://www.youtube.com/watch?v=V6Hq_EX2LLM)。

## 功能

- Google 登入
- ChatGPT 對話
- 可選擇 ChatGPT Model

## 安裝

### 安裝套件

```bash
pnpm install
```

### 環境變數說明

請參考 [.env.example](https://github.com/tingminitime/next-chatgpt-messenger/blob/main/.env.example) 檔案。

```env
GOOGLE_ID= # your Firebase OAuth2 client id 
GOOGLE_SECRET= # your Firebase OAuth2 client secret key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET= # your next-auth secret
FIREBASE_APP_ID= # your Firebase api id
FIREBASE_API_KEY= # your Firebase api key
OPENAI_API_KEY= # your OpenAI api key
FIREBASE_SERVICE_ACCOUNT_KEY= # your Firebase service account key for admin
```

### 運行專案

#### Development
```bash
pnpm run dev
```

#### Build
```bash
pnpm run build
```
```bash
pnpm run start
```


## 專案技術

- Next.js 13
- React
- TypeScript
- Tailwind CSS
- Firebase ( Firestore )
- NextAuth - Firebase Auth
- ChatGPT API
- useSWR
- react-firebase-hooks
- react-hot-toast
- react-select
