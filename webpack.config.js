// объявлена константа path, чтобы подключить к проекту новые методы для работы с путём
// утилита path превращает относительный путь в абсолютный
// подключаем path к конфигу вебпак функцией require
const path = require('path');
// подключили плагин. HtmlWebpackPlugin — это класс, с помощью которого можно конструировать объекты
const HtmlWebpackPlugin = require('html-webpack-plugin');
// плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// подключили к проекту mini-css-extract-plugin
// он берёт много CSS-файлов и объединяет их в один
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

// module.exports — это синтаксис экспорта в Node.js 
module.exports = {
  // указали первое место, куда заглянет webpack
  entry: { main: './src/scripts/index.js' },
  // указали, в какой файл будет собираться весь js, и дали ему имя 
  output: {
    // вместо относительного пути, который мы указали в свойстве path, теперь стоит вызов метода path.resolve. 
    // Ему переданы два аргумента: ссылка на текущую папку __dirname и относительный путь к точке выхода.
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }]
      }
    ]
  },
  plugins: [
    // путь к файлу index.html
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // вызываем плагин, который каждый раз при сборке проекта удаляет содержимое папки dist
    new CleanWebpackPlugin(),
    // вызываем плагин для объединения css-файлов
    new MiniCssExtractPlugin()
  ]
}