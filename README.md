# Запуск
1. git clone https://github.com/Kabanus/naumen.git
2. cd naumen/content
3. docker-compose build
4. docker-compose up

# Пояснения
1. Docker запускает prometheus, grafana, node
2. В node запускается http сервер (port 8080) который отдает "Hello Kitty"
2.1. http сервер ведет журнал входящих IP адресов 
2.2. метрики две - количество и длительность входящих http запросов
2.3. HEALTHCHECK - стучит в порт 8080, если порт отвечает сервер считается живым
3. При запуске prometheus (port 9090) импортируются настройки (источники метрик)
4. При запуске grafana (port 3000, login: admin, pass: admin) импортируются настройки (datasources, dashboards)
