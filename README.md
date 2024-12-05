## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- MongoDB
- NextAuth
- TailwindCSS

## <a name="features">🔋 Özellikler</a>

👉 **Cammorfizm Trend Stili ile Modern Tasarım**: Şık ve çağdaş bir görünüm için cammorfizm trend stilini birleştiren modern ve görsel olarak çekici bir tasarım.

👉 **Todo listesi Oluşturma**: Kullanıcıların takip etmek için kendi yapılacaklar listelerini oluşturmalarına ve bunları düzenlemelerine olanak tanır.

👉 **Todoları Belirli Etikete Göre Arama**: Kullanıcıların belirli etiketlere göre Todo aramasına izin vererek belirli konularla ilgili todoları bulmayı kolaylaştırır.

## <a name="quick-start">🤸 Quick Start</a>

Projeyi makinenizde yerel olarak ayarlamak için aşağıdaki adımları izleyin.

**Ön Gereksinimler**

Makinenizde aşağıdakilerin yüklü olduğundan emin olun:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Düğüm Paketi Yöneticisi)

**Cloning the Repository**
git clone https://github.com/Hnfgozel/playable-todoapp.git

cd playable-todoapp

**Kurulum**

Npm kullanarak proje bağımlılıklarını yükleyin:

```bash
npm install
```

**Ortam Değişkenlerini Ayarlama**

Projenizin kökünde `.env` adında yeni bir dosya oluşturun ve aşağıdaki içeriği ekleyin:


```env
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=OTRFG2zNEXaV4hZv2ysP1Uzs+8PoN13CNCS1A+3bMk8=


NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID=
NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY=
NEXT_PUBLIC_AWS_S3_REGION=
NEXT_PUBLIC_AWS_S3_BUCKET_NAME=
''''
Yer tutucu değerlerini gerçek kimlik bilgilerinizle değiştirin. Bu kimlik bilgilerini şu adresten ilgili web sitelerine kaydolarak alabilirsiniz: [Google Cloud Console (https://console.cloud.google.com/welcome rapt=AEjHL4MBaLLneW6OfAHf_zgms1eWZFw1wdy0_KIC4uh1nEq 2m4ojOvrXNlzJ4h7CZTkpiWgcsoHbUvS FMdCP7WIkaVlPAeU7cn) VR6Y0wJHeLMOTU6KAzA&project=promp opia-385410), [Şifre Havuzu](https:/ /www.cryptool.org/en/cto/openssl) (rastgele Kimlik Doğrulama Sırrı için) ve [MongoDB (https://www.mongodb.com/).

**Projeyi Çalıştırma**

```bash
npm run dev
```

sonrasında tarayıcıda  [http://localhost:3000](http://localhost:3000) adresine giderek  uygulamayı kullanmaya başlayabilirsiniz.

Girş yaptıktan sonra kullanıcı da oluşmakta Kullanıcı ilk defa Giriş yapmışsa aynı anda kullanıcı kaydı anlamına da geliyor. 
   async signIn({ profile }) {
            try {
                await connectToDB();

                if (profile && profile.email) {
                    const userExists = await User.findOne({ email: profile.email });

                    if (!userExists && profile.name) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                        });
                    }
                }

                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error instanceof Error ? error.message : error);
                return false;
            }
        },

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
