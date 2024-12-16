# Weather Forecast

## Turkish 🇹🇷

Bu proje, React ile geliştirilmiş bir hava durumu uygulamasıdır. Kullanıcı bir şehir adı girerek anlık hava durumunu görüntüleyebilir. Ayrıca, uygulama OpenWeatherMap API üzerinden sonraki 4 güne ait tahmin verilerini de gösterir.

### Features

- Belirtilen şehir için anlık sıcaklık, nem, durum bilgisi ve hava durumu ikonu gösterilir.
- Sonraki 4 güne ait tahminler (gün adı, ikon, tahmini sıcaklık) yatay bir sıra halinde görüntülenir.
- Arama kutusuna girilen şehir ismi Enter tuşuna basılarak veya Ara butonuna tıklanarak sorgulanabilir.
- Boş arama yapılması durumunda uyarı mesajı gösterilir.
- Veri çekilirken "Loading..." durumu gösterilir ve veri geldikten sonra kaldırılır.

### Kullanılan Teknolojiler

- **React:** Uygulama arayüzü için.
- **OpenWeatherMap API:** Hava durumu verilerini elde etmek için.
- **CSS:** Basit stillendirme ve düzenlemeler için.

<hr>

## English 🇬🇧

This project is a weather application built with React. Users can enter a city name to view the current weather conditions. Additionally, the application retrieves forecast data for the next 4 days from the OpenWeatherMap API.

### Features

- Displays current temperature, humidity, weather condition, and an icon for the specified city.
- Shows a 4-day forecast (day name, icon, temperature) in a horizontal layout.
- Users can search by pressing the Enter key or clicking the search button.
- If the search input is empty, an error message is displayed.
- A "Loading..." state is shown while fetching data, and removed once data arrives.

### Technologies Used

- **React:** For building the user interface.
- **OpenWeatherMap API:** To fetch current weather and forecast data.
- **CSS:** For simple styling and layout adjustments.

### Installation and Running

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bthnkuloglu/weatherforecast.git
   cd project_name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```
   
   Open `http://localhost:3000` in your browser to view the app.
