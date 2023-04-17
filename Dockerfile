# Указываем базовый образ
FROM node

# Устанавливаем рабочую директорию
WORKDIR /auth

# Копируем package.json и yarn.lock для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .


# Открываем порт, на котором будет работать приложение
EXPOSE 3100


# Запускаем приложение
ENTRYPOINT ["npm", "run"]
CMD ["listenP"]