## Uygulama Test Önerisi

Kullanıcı Adı: `Serhat`  
Parola: `12345678`  

Bu kullanıcı ile giriş yapmanızı öneririm. Çünkü en çok veri bu kullanıcıda bulunmaktadır. (`data.json` dosyasından verileri inceleyebilirsiniz.)  

Ama dilerseniz diğer kullanıcı olan `test`,`12345678` ile veya kendi oluşturduğunuz bir kullanıcı ile de testleri gerçekleştirebilirsiniz ancak ilk başta hiç veri olmayacaktır.
> **Not:** Login olmadan `Home` sayfasına giremezsiniz. Bu işlem, middleware ile cookie kontrol edilerek gerçekleştirilmektedir.

## Teknik Altyapı

- **Middleware:** Login olmamış kullanıcıyı `login` sayfasına yönlendirir. Login bilgisi cookie üzerinden kontrol edilmiştir.
- **API Routes:** Veri kaynağımız olan `data.json` dosyasına yeni kullanıcı eklemek için ve logout işlemi için kullanılmıştır. Vaka çalışması isterlerinde yer almadığı için,`data.json` dosyasına başka işlem yapılamamaktadır.
- **Context API:** Uygulama genelinde durum yönetimi için kullanılmıştır.  
- **Next.js**  
- **Tailwind CSS ve CSS**  
- **Local Storage ve Cookie Yönetimi**  
- **Chart.js**

## İçerik

- Gelir ve Gider Ekleme
- Bütçe Limitleri ve Uyarılar
- Raporlama ve Analiz
- Harcamalarınızı kategorilere ayırabilir ve her kategoriye ait detayları görebilirsiniz.
- Harcama Kategorileri ve Kategorilere Ait Giderler
- Responsive Tasarım
- Dark mode desteği
- Web uygulaması üzerinden finansal raporları PDF formatında indirebilmesi
- Kullanıcıların, harcamalarına göre tasarruf önerileri alabilmesi
- Kullanıcı Kaydı (data.json a kaydedilir)

## Önemli Not

- `Ana Sayfa` üzerinden değişiklikler yaptığınızda eğer **sayfayı yenilerseniz yaptığınız değişiklikleri kaybolacaktır.** Vaka çalışmasında, herhangi bir db ye veya dosyaya veri kaydetmemiz gerektiği yazmadığı için bu işlemleri yapmadım.

Test Linkine Çıkmamı İsterseniz İletişime Geçebilirsiniz.
